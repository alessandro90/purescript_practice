module Ch16 where

import Prelude

import Control.Alt ((<|>))
import Control.Monad.State (State, modify_, runState)
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.List (List(..), fromFoldable, (:))
import Data.Maybe (Maybe(..))
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Console (log)

data Threeple a b c = Threeple a b c

derive instance Generic (Threeple a b c) _
instance (Show a, Show b, Show c) => Show (Threeple a b c) where
  show = genericShow

instance Functor (Threeple a b) where
  map f (Threeple x y z) = Threeple x y (f z)

instance (Semigroup a, Semigroup b) => Apply (Threeple a b) where
  apply (Threeple x y f) ((Threeple x' y' z)) = Threeple (x <> x') (y <> y') (f z)

instance (Monoid a, Monoid b) => Applicative (Threeple a b) where
  pure = Threeple mempty mempty

fullName :: Maybe String -> Maybe String -> Maybe String -> Maybe String
fullName first middle last = first <> (pure " ") <> middle <> (pure " ") <> last

fullNameComplete :: String -> String -> String -> String
fullNameComplete f m l = f <> " " <> m <> " " <> l

orError :: Maybe String -> String -> Either String String
orError (Just s) _ = Right s
orError Nothing err = Left err

orError' :: Maybe String -> String -> State (Array String) String
orError' Nothing err = do
  modify_ (_ <> [ err ])
  pure mempty
orError' (Just s) _ = pure s

fullName' :: Maybe String -> Maybe String -> Maybe String -> Either String String
fullName' first middle last = do
  f <- first `orError` "missing first name"
  m <- middle `orError` "missing middle name"
  l <- last `orError` "missing last name"
  pure $ fullNameComplete f m l

fullNameValid :: Maybe String -> Maybe String -> Maybe String -> State (Array String) String
fullNameValid first middle last = do
  fullNameComplete
    <$> (first `orError'` "missing first name")
    <*> (middle `orError'` "missing middle name")
    <*> (last `orError'` "missing last name")

combineList :: ∀ a f. Applicative f => List (f a) -> f (List a)
combineList Nil = pure Nil
combineList (x : xs) = (:) <$> x <*> combineList xs

test :: Effect Unit
test = do
  log $ show $ (Threeple "a" (10 : Nil) (_ * 2)) <*> (Threeple "bc" (11 : Nil) 10)
  log $ show $ fullName (Just "John") (Just "J.") (Just "Doe")
  log $ show $ fullName (Just "John") Nothing (Just "Doe")
  log $ show $ fullName' (Just "John") (Just "J.") (Just "Doe")
  log $ show $ fullName' (Just "John") Nothing (Just "Doe")
  log "*************"
  log "State example"
  log "-------------"
  log $ show $ runState (fullNameValid (Just "John") (Just "J.") (Just "Doe")) []
  log $ show $ runState (fullNameValid (Just "John") Nothing (Just "Doe")) []
  log $ show $ runState (fullNameValid (Just "John") Nothing Nothing) []
  log "-------------"
  log $ show $ combineList $ fromFoldable [ Just 1, Just 2, Just 3 ]
  log $ show $ combineList $ fromFoldable [ Just 1, Nothing, Just 3 ]
  log $ show $ combineList $ fromFoldable ([ Right 1, Right 2, Right 3 ] :: Array (Either String _))
  log $ show $ combineList $ fromFoldable [ Right 1, Left "error in pos 2", Right 3 ]
  log $ show $ ("a" : "1" : Nil) <|> ("a" : "b" : "c" : Nil)
  log $ show $ Just 10 <|> Just 20
  log $ show $ Just 10 <|> Nothing
  log $ show $ Nothing <|> Just 10
  log $ show $ ((Right 10 <|> Right 20) :: Either Unit _)
  log $ show $ Right 10 <|> Left "A"
  log $ show $ Left "A" <|> Right 10
