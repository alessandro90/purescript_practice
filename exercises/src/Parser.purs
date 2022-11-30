module Parser where

import Prelude

import Control.Alt (class Alt, (<|>))
import Control.Lazy (class Lazy, defer)
import Data.Array ((:))
import Data.CodePoint.Unicode (isAlpha, isDecDigit)
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.Int (fromString)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (class Newtype)
import Data.NonEmpty (NonEmpty, fromNonEmpty, (:|))
import Data.Show.Generic (genericShow)
import Data.String (codePointFromChar)
import Data.String.CodeUnits (fromCharArray, singleton, uncons)
import Data.Traversable (class Traversable, sequence)
import Data.Tuple (Tuple(..))
import Data.Unfoldable (class Unfoldable, none, replicate)
import Effect (Effect)
import Effect.Console (log)

type ParserState a = Tuple String a

class ParseError (e :: Type) where
  eof :: e
  invalidChar :: String -> e

-- a is parsed result, e is error type
type ParseFunction e a = ParseError e => String -> Either e (ParserState a)

newtype Parser e a = Parser (ParseFunction e a)

parse :: ∀ e a. Parser e a -> ParseFunction e a
parse (Parser f) = f

instance Functor (Parser e) where
  map :: ∀ a b err. (a -> b) -> Parser err a -> Parser err b
  map f p = Parser $ \str -> map f <$> parse p str

-- Equivalent to
-- instance Functor (Parser e) where
--   map :: ∀ a b err. (a -> b) -> Parser err a -> Parser err b
--   map f (Parser g) = Parser $ \str -> case g str of
--     (Right pState) -> Right $ f <$> pState
--     (Left err) -> Left err

-- instance Apply (Parser e) where
--   apply :: ∀ a b err. Parser err (a -> b) -> Parser err a -> Parser err b
--   apply p1 p2 = Parser $ \str -> case parse p1 str of
--     Left err -> Left err
--     Right (Tuple s h) -> case parse p2 s of
--       Left err' -> Left err'
--       Right (Tuple s' x) -> Right $ Tuple s' $ h x

instance Apply (Parser e) where
  apply :: ∀ a b err. Parser err (a -> b) -> Parser err a -> Parser err b
  apply p1 p2 = Parser $ \str -> do
    Tuple s h <- parse p1 str
    Tuple s' x <- parse p2 s
    pure $ Tuple s' $ h x

instance Applicative (Parser e) where
  pure x = Parser \s -> pure $ Tuple s x

-- Implementation without 'do' notation
-- instance Bind (Parser e) where
--   bind :: ∀ a b. Parser e a -> (a -> Parser e b) -> Parser e b
--   bind p f = Parser \s -> case parse p s of
--     Left err -> Left err
--     Right (Tuple s' x) -> parse (f x) s'

-- Implementation with 'do' notation
instance Bind (Parser e) where
  bind :: ∀ a b. Parser e a -> (a -> Parser e b) -> Parser e b
  bind p f = Parser \s -> do
    Tuple s' x <- parse p s
    parse (f x) s'

instance Alt (Parser e) where
  alt p0 p1 = Parser \s -> case parse p0 s of
    Left _ -> parse p1 s
    Right x -> Right x

instance Lazy (Parser e a) where
  defer :: (Unit -> Parser e a) -> Parser e a
  defer f = Parser $ parse $ f unit

-- Parser implementations

char :: ∀ e. Parser e Char
char = Parser \s -> case uncons s of
  Nothing -> Left eof
  Just { head, tail } -> Right $ Tuple tail head

twoCharsA :: ∀ e. Parser e (Tuple Char Char)
twoCharsA = Tuple <$> char <*> char

twoCharsB :: ∀ e. Parser e (Tuple Char Char)
twoCharsB = do
  c0 <- char
  c1 <- char
  pure $ Tuple c0 c1

twoCharsB' :: ∀ e. Parser e (Tuple Char Char)
twoCharsB' = char >>= \c -> char >>= \c' -> pure $ Tuple c c'

twoChars' :: ∀ e. Parser e (Tuple Char Char)
twoChars' = Parser \s -> case parse char s of
  Left err -> Left err
  Right (Tuple t h) -> case parse char t of
    Left err' -> Left err'
    Right (Tuple t' h') -> Right $ Tuple t' $ Tuple h h'

threeCharsA :: ∀ e. Parser e String
threeCharsA = (\x y z -> fromCharArray [ x, y, z ]) <$> char <*> char <*> char

threeChars :: ∀ e. Parser e String
threeChars = do
  c0 <- char
  c1 <- char
  c2 <- char
  pure $ fromCharArray [ c0, c1, c2 ]

threeChars' :: ∀ e. Parser e String
threeChars' = char >>= \c0 -> char >>= \c1 -> char >>= \c2 -> pure $ fromCharArray [ c0, c1, c2 ]

count :: ∀ e a t. Traversable t => Unfoldable t => Int -> Parser e a -> Parser e (t a)
count n p
  | n <= 0 = pure none
  | otherwise = sequence $ replicate n p

-- Bad verbose implementation
-- count' :: ∀ e. Int -> Parser e Char -> Parser e String
-- count' n p = Parser \s -> map fromCharArray <$> (parse (count n p) s)

count' :: ∀ e. Int -> Parser e Char -> Parser e String
count' n p = fromCharArray <$> count n p

fail :: ∀ e a. ParseError e => e -> Parser e a
fail err = Parser $ const $ Left err

satisfy :: ∀ e. ParseError e => String -> (Char -> Boolean) -> Parser e Char
satisfy expected pred = char >>= \c -> if pred c then pure c else fail $ invalidChar expected

digit :: ∀ e. ParseError e => Parser e Char
digit = satisfy "digit" $ isDecDigit <<< codePointFromChar

letter :: ∀ e. ParseError e => Parser e Char
letter = satisfy "letter" $ isAlpha <<< codePointFromChar

alphaNum :: ∀ e. ParseError e => Parser e Char
alphaNum = digit <|> letter <|> fail (invalidChar "alphaNum")

optional :: ∀ e a. a -> Parser e a -> Parser e a
optional x p = p <|> pure x

atMost :: ∀ f e a. Unfoldable f => (a -> f a -> f a) -> Int -> Parser e a -> Parser e (f a)
atMost cons n p
  | n <= 0 = pure none
  | otherwise = optional none $ p >>= \c -> cons c <$> atMost cons (n - 1) p

atMost' :: ∀ e. Int -> Parser e Char -> Parser e String
atMost' n p = fromCharArray <$> atMost (:) n p

range
  :: ∀ f e a
   . Semigroup (f a)
  => Traversable f
  => Unfoldable f
  => (a -> f a -> f a)
  -> Int
  -> Int
  -> Parser e a
  -> Parser e (f a)
range cons min max p
  | min < 0 || max <= 0 || max < min = pure none
  | otherwise = count min p >>= \s -> (s <> _) <$> atMost cons (max - min) p

range' :: ∀ e. Int -> Int -> Parser e Char -> Parser e String
range' min max p = fromCharArray <$> range (:) min max p

some
  :: ∀ f m a
   . Unfoldable f
  => Alt m
  => Lazy (m (f a))
  => Applicative m
  => (a -> f a -> f a)
  -> m a
  -> m (NonEmpty f a)
some cons p = (:|) <$> p <*> defer \_ -> many cons p

many
  :: ∀ f m a
   . Unfoldable f
  => Alt m
  => Lazy (m (f a))
  => Applicative m
  => (a -> f a -> f a)
  -> m a
  -> m (f a)
many cons p = fromNonEmpty cons <$> some cons p <|> pure none

some' :: ∀ e. Parser e Char -> Parser e String
some' p = fromCharArray <$> fromNonEmpty (:) <$> some (:) p

many' :: ∀ e. Parser e Char -> Parser e String
many' p = fromCharArray <$> many (:) p

digits :: ∀ e. ParseError e => Parser e String
digits = some' digit

ugly :: ∀ e. ParseError e => Parser e (Array String)
ugly = do
  firstGroup <- range' 1 4 digit
  _ <- comma
  _ <- space
  secondGroup <- some' $ letter <|> space
  thirdGroup <- many' digit
  pure [ firstGroup, secondGroup, thirdGroup ]
  where
  space = constChar ' '
  comma = constChar ','

newtype Day = Day Int

derive instance Newtype Day _
derive newtype instance Show Day

newtype Month = Month Int

derive instance Newtype Month _
derive newtype instance Show Month

newtype Year = Year Int

derive instance Newtype Year _
derive newtype instance Show Year

data DateFormat = YearFirst | MonthFirst

derive instance Generic DateFormat _
instance Show DateFormat where
  show = genericShow

type DateParts =
  { year :: Year
  , month :: Month
  , day :: Day
  , format :: DateFormat
  }

showDate :: { year :: Year, month :: Month, day :: Day, format :: DateFormat } -> String
showDate { year, month, day, format } = show year <> "/" <> show month <> "/" <> show day <> " | " <> show format

constChar :: ∀ e. ParseError e => Char -> Parser e Char
constChar c = satisfy (singleton c) (_ == c)

digitsToNum :: String -> Int
digitsToNum = fromMaybe 0 <<< fromString

yearFirst :: ∀ e. ParseError e => Parser e DateParts
yearFirst = do
  year <- Year <<< digitsToNum <$> count' 4 digit
  _ <- constChar '-'
  month <- Month <<< digitsToNum <$> range' 1 2 digit
  _ <- constChar '-'
  day <- Day <<< digitsToNum <$> range' 1 2 digit
  pure { year, month, day, format: YearFirst }

monthFirst :: ∀ e. ParseError e => Parser e DateParts
monthFirst = do
  month <- Month <<< digitsToNum <$> range' 1 2 digit
  _ <- constChar '/'
  day <- Day <<< digitsToNum <$> range' 1 2 digit
  _ <- constChar '/'
  year <- Year <<< digitsToNum <$> count' 4 digit
  pure { year, month, day, format: MonthFirst }

date :: ∀ e. ParseError e => Parser e DateParts
date = yearFirst <|> monthFirst

-- Application-specific

data PError = EOF | InvalidChar String

derive instance Generic PError _
instance Show PError where
  show = genericShow

instance ParseError PError where
  eof = EOF
  invalidChar = InvalidChar

parse' :: ∀ a. Parser PError a -> ParseFunction PError a
parse' = parse

test :: Effect Unit
test = do
  log $ show $ parse' char "ABC"
  log $ show $ parse' twoCharsA "ABC"
  log $ show $ parse' threeChars "ABC"
  log $ show $ parse' threeChars "ABCX"
  log $ show $ parse' threeChars "A"
  log $ show $ parse' (fromCharArray <$> count 3 char) "ABCX"
  log $ show $ parse' (count' 3 digit) "123456"
  log $ show $ parse' (count' 3 digit) "abc456"
  log $ show $ parse' (count' 4 letter) "Freddy"
  log $ show $ parse' (count' 10 alphaNum) "a1b2c3d4e5"
  log $ show $ parse' (count' 10 alphaNum) "######"
  log "atMost tests"
  log $ show $ parse' (atMost' (-2) alphaNum) "a1b2c3"
  log $ show $ parse' (atMost' (2) alphaNum) "$_$"
  log $ show $ parse' (atMost' (2) alphaNum) "a1b2c3"
  log "Date parser test"
  log $ show $ parse' (showDate <$> yearFirst) "1999-12-31"
  log $ show $ parse' (showDate <$> monthFirst) "12/31/1999"
  log "Test some and many"
  log $ show $ parse' (some' digit) "2343423423abc"
  log $ show $ parse' (many' digit) "_2343423423abc"
  log $ show $ parse' (some' digit) "_2343423423abc"
  log $ show $ parse' ugly "17, some words"
  log $ show $ parse' ugly "5342, some more words1234567890"