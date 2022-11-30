module Ch5 where

import Data.List (List(..), (:))
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..), snd)
import Effect (Effect)
import Effect.Console (log)
import Prelude (type (~>), Unit, discard, max, negate, otherwise, show, (+), (-), (/=), (<), (<<<), (>>>), (==), (>), (>=))

const :: ∀ a b. a -> b -> a
const x _ = x

flip :: ∀ a b c. (a -> b -> c) -> (b -> a -> c)
flip f y x = f x y

apply :: ∀ a b. (a -> b) -> a -> b
apply f = f

infixr 0 apply as $

applyFlipped :: ∀ a b. a -> (a -> b) -> b
applyFlipped x f = f x -- or just = flip apply

infixl 1 applyFlipped as #

-- List functions
singleton :: ∀ a. a -> List a
singleton x = x : Nil

null :: ∀ a. List a -> Boolean
null Nil = true
null _ = false

snoc :: ∀ a. List a -> a -> List a
snoc Nil x = singleton x
snoc (y : ys) x = y : snoc ys x

length' :: ∀ a. List a -> Int
length' Nil = 0
length' (_ : xs) = 1 + length' xs

-- A tail recursive version
length :: ∀ a. List a -> Int
length = tailRecLength 0
  where
  tailRecLength :: Int -> List a -> Int
  tailRecLength acc Nil = acc
  tailRecLength acc (_ : xs) = tailRecLength (acc + 1) xs

head :: ∀ a. List a -> Maybe a
head Nil = Nothing
head (x : _) = Just x

tail :: ∀ a. List a -> Maybe (List a)
tail Nil = Nothing
tail (_ : xs) = Just xs

last :: ∀ a. List a -> Maybe a
last Nil = Nothing
last (x : Nil) = Just x
last (_ : xs) = last xs

init' :: ∀ a. List a -> Maybe (List a)
init' Nil = Nothing
init' xs = Just $ go xs
  where
  go :: List a -> List a
  go Nil = Nil
  go (_ : Nil) = Nil
  go (y : ys) = y : go ys

-- A tail recursive version
init :: ∀ a. List a -> Maybe (List a)
init Nil = Nothing
init xs = Just $ go Nil xs
  where
  go :: List a -> List a -> List a
  go acc Nil = acc
  go acc (_ : Nil) = acc
  go acc (y : ys) = go (y : acc) ys

uncons :: ∀ a. List a -> Maybe { head :: a, tail :: List a }
uncons Nil = Nothing
uncons (x : xs) = Just { head: x, tail: xs }

index :: ∀ a. List a -> Int -> Maybe a
index Nil _ = Nothing
index xs i = go 0 xs
  where
  go :: Int -> List a -> Maybe a
  go _ Nil = Nothing
  go cur (y : ys)
    | i < 0 = Nothing
    | cur == i = Just y
    | otherwise = go (cur + 1) ys

infixl 8 index as !!

findIndex :: ∀ a. (a -> Boolean) -> List a -> Maybe Int
findIndex p xs = go 0 xs
  where
  go :: Int -> List a -> Maybe Int
  go _ Nil = Nothing
  go cur (y : ys)
    | p y = Just cur
    | otherwise = go (cur + 1) ys

findLastIndex :: ∀ a. (a -> Boolean) -> List a -> Maybe Int
findLastIndex p = go 0 Nothing
  where
  go :: Int -> Maybe Int -> List a -> Maybe Int
  go _ lastIndex Nil = lastIndex
  go i lastIndex (y : ys)
    | p y = go (i + 1) (Just i) ys
    | otherwise = go (i + 1) lastIndex ys

-- Elegant but inefficient because of snoc usage
reverse' :: List ~> List
reverse' Nil = Nil
reverse' (x : xs) = snoc (reverse xs) x

reverse :: List ~> List
reverse = go Nil
  where
  go :: ∀ a. List a -> List a -> List a
  go rev Nil = rev
  go rev (x : xs) = go (x : rev) xs

concat' :: ∀ a. List (List a) -> List a
concat' = go Nil
  where
  go :: List a -> List (List a) -> List a
  go xs Nil = reverse xs
  go xs (Nil : zs) = go xs zs
  go xs ((y : ys) : zs) = go (y : xs) (ys : zs)

concat :: ∀ a. List (List a) -> List a
concat Nil = Nil
concat (Nil : xs) = concat xs
concat ((x : xs) : ys) = x : concat (xs : ys)

filter :: ∀ a. (a -> Boolean) -> List a -> List a
filter _ Nil = Nil
filter p (x : xs)
  | p x = x : filter p xs
  | otherwise = filter p xs

-- a tail recursive version of filter
filter' :: ∀ a. (a -> Boolean) -> List a -> List a
filter' p = reverse <<< go Nil
  where
  go :: List a -> List a -> List a
  go fl Nil = fl
  go fl (x : xs)
    | p x = go (x : fl) xs
    | otherwise = go fl xs

catMaybes :: ∀ a. List (Maybe a) -> List a
catMaybes Nil = Nil
catMaybes (x : xs) = case x of
  Just v -> v : catMaybes xs
  Nothing -> catMaybes xs

range :: Int -> Int -> List Int
range start stop
  | start == stop = stop : Nil
  | otherwise = start : range (if stop < start then start - 1 else start + 1) stop

-- Optimized version (tail recursive, step computed once)
range' :: Int -> Int -> List Int
range' start stop = go stop Nil
  where
  go stop' rng
    | start == stop' = start : rng
    | otherwise = go (stop' + step) $ stop' : rng
  step = if stop < start then 1 else -1

take :: ∀ a. Int -> List a -> List a
take _ Nil = Nil
take 0 _ = Nil
take n (x : xs)
  | n < 0 = Nil
  | otherwise = x : take (n - 1) xs

-- tail recursive version
take' :: ∀ a. Int -> List a -> List a
take' _ Nil = Nil
take' 0 _ = Nil
take' n xs = go Nil (max 0 n) xs
  where
  go acc _ Nil = reverse acc
  go acc n' (y : ys) = go (y : acc) (n' - 1) ys

drop :: ∀ a. Int -> List a -> List a
drop _ Nil = Nil
drop 0 xs = xs
drop n (_ : xs) = drop (n - 1) xs

-- tail-recursive
takeWhile :: ∀ a. (a -> Boolean) -> List a -> List a
takeWhile pred = reverse <<< go Nil pred
  where
  go :: List a -> (a -> Boolean) -> List a -> List a
  go acc _ Nil = acc
  go acc p (x : xs)
    | p x = go (x : acc) p xs
    | otherwise = acc

-- Unoptimized, slightly more elegant
takeWhile' :: ∀ a. (a -> Boolean) -> List a -> List a
takeWhile' _ Nil = Nil
takeWhile' pred (x : xs)
  | pred x = x : takeWhile' pred xs
  | otherwise = Nil

dropWhile :: ∀ a. (a -> Boolean) -> List a -> List a
dropWhile _ Nil = Nil
dropWhile p ls@(x : xs)
  | p x = dropWhile p xs
  | otherwise = ls

-- Elegant, but largely inefficient
takeEnd' :: ∀ a. Int -> List a -> List a
takeEnd' n = reverse <<< take n <<< reverse

-- Still quite inefficient due to length function
takeEnd'' :: ∀ a. Int -> List a -> List a
takeEnd'' n xs = drop (max 0 (length xs) - n) xs

takeEnd :: ∀ a. Int -> List a -> List a
takeEnd n = go >>> snd
  where
  go :: List a -> Tuple Int (List a)
  go Nil = Tuple 0 Nil
  go (x : xs) = go xs # \(Tuple c ls) -> Tuple (c + 1) $
    if c < n then
      x : ls
    else ls

dropEnd :: ∀ a. Int -> List a -> List a
dropEnd n = go >>> snd
  where
  go :: List a -> Tuple Int (List a)
  go Nil = Tuple 0 Nil
  go (x : xs) = go xs # \(Tuple c ls) -> Tuple (c + 1) $
    if c < n then
      ls
    else x : ls

zip :: ∀ a b. List a -> List b -> List (Tuple a b)
zip _ Nil = Nil
zip Nil _ = Nil
zip (x : xs) (y : ys) = Tuple x y : zip xs ys

-- tail recursive, but uses reverse
unzip' :: ∀ a b. List (Tuple a b) -> Tuple (List a) (List b)
unzip' = go (Tuple Nil Nil) <<< reverse
  where
  go :: Tuple (List a) (List b) -> List (Tuple a b) -> Tuple (List a) (List b)
  go (Tuple xs ys) Nil = Tuple xs ys
  go (Tuple xs ys) ((Tuple k s) : zs) = go (Tuple (k : xs) (s : ys)) zs

unzip :: ∀ a b. List (Tuple a b) -> Tuple (List a) (List b)
unzip Nil = Tuple Nil Nil
unzip (Tuple x y : xs) = unzip xs # \(Tuple i j) -> Tuple (x : i) (y : j)

-- --------------
test :: Effect Unit
test = do
  log $ show $ flip const 1 2
  flip const 1 2 # show # log
  log $ show $ singleton "abc"
  log $ show $ null Nil
  log $ show $ null (1 : 2 : Nil)
  log $ show $ snoc (1 : 2 : Nil) 3
  log $ show $ length $ 1 : 2 : 3 : Nil
  log $ show (head Nil :: Maybe Unit) -- specify return type of head
  log $ show $ head (Nil :: List Unit) -- specify List type
  log $ show $ head ("abc" : "123" : Nil)
  log $ show $ tail (Nil :: List Unit)
  log $ show $ tail ("abc" : "123" : Nil)
  log $ show $ tail ("abc" : Nil)
  log $ show $ last (Nil :: List Unit)
  log $ show $ last ("A" : "B" : "C" : Nil)
  log $ show $ init (Nil :: List Unit)
  log $ show $ init ("A" : "B" : "C" : Nil)
  log $ show $ init ("A" : Nil)
  log $ show $ uncons (1 : 2 : 3 : Nil)
  log $ show $ index (1 : Nil) 4
  log $ show $ index (1 : 2 : 3 : Nil) 1
  log $ show $ index (1 : 2 : 3 : Nil) (-1)
  log $ show $ index (Nil :: List Unit) 0
  log $ show $ (1 : 2 : 3 : Nil) !! 2
  log $ show $ findIndex (_ >= 2) (1 : 2 : 3 : Nil)
  log $ show $ findIndex (_ >= 99) (1 : 2 : 3 : Nil)
  log $ show $ findIndex (10 /= _) (Nil :: List Int)
  log $ show $ findLastIndex (_ == 10) (Nil :: List Int)
  log $ show $ findLastIndex (_ == 10) (10 : 5 : 10 : -1 : 2 : 10 : Nil)
  log $ show $ findLastIndex (_ == 10) (11 : 12 : Nil)
  log $ show $ reverse (10 : 20 : 30 : Nil)
  log $ show $ concat ((1 : 2 : Nil) : (3 : 4 : 5 : Nil) : (Nil) : Nil)
  log $ show $ concat (Nil :: List (List Unit))
  log $ show $ filter' (4 > _) (1 : 2 : 3 : 4 : 5 : 0 : 8 : Nil)
  log $ show $ catMaybes (Just 1 : Nothing : Just 2 : Just 4 : Nothing : Nil)
  log $ show $ catMaybes (Nil :: List (Maybe Unit))
  log $ show $ range' 1 10
  log $ show $ range' 3 (-3)
  log $ show $ take' 5 (12 : 13 : 14 : Nil)
  log $ show $ take' (-2) (12 : 13 : 14 : Nil)
  log $ show $ take' 5 (-7 : 9 : 0 : 12 : (-13) : 45 : 976 : (-19) : Nil)
  log $ show $ drop 2 (1 : 2 : 3 : 4 : 4 : Nil)
  log $ show $ drop 10 (Nil :: List Unit)
  log $ show $ takeWhile' (_ > 3) (5 : 4 : 3 : 99 : Nil)
  log $ show $ takeWhile' (_ == -17) (5 : 4 : 3 : 99 : Nil)
  log $ show $ dropWhile (_ > 3) (5 : 4 : 3 : 99 : 101 : Nil)
  log $ show $ dropWhile (_ == 17) (1 : 2 : 3 : Nil)
  log $ show $ takeEnd 3 (1 : 2 : 3 : 4 : 5 : 6 : Nil)
  log $ show $ takeEnd 10 (1 : Nil)
  log $ show $ dropEnd 3 (1 : 2 : 3 : 4 : 5 : 6 : Nil)
  log $ show $ dropEnd 10 (1 : Nil)
  log $ show $ zip (1 : 2 : 3 : 4 : Nil) ("A" : "B" : Nil)
  log $ show $ unzip' (Tuple 1 'a' : Tuple 2 'b' : Tuple 3 'c' : Nil)
  log $ show $ unzip' (Tuple 'a' 1 : Tuple 'b' 2 : Tuple 'c' 3 : Nil)
  log $ show $ unzip' (Nil :: List (Tuple Unit Unit))
