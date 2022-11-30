module Ch7a where

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Console (log)
import Prelude (class Eq, class Ord, class Show, Ordering(..), Unit, compare, discard, show, ($), (<), (<=), (<>), (==), (>), (||))

data Maybe' a = Nothing' | Just' a

-- Could be derived as well
instance Eq a => Eq (Maybe' a) where
  eq Nothing' Nothing' = true
  eq (Just' x) (Just' y) = x == y
  eq _ _ = false

instance Ord a => Ord (Maybe' a) where
  compare Nothing' Nothing' = EQ
  compare Nothing' (Just' _) = LT
  compare (Just' x) (Just' y) = compare x y
  compare (Just' _) Nothing' = GT

instance Show a => Show (Maybe' a) where
  show Nothing' = "Nothing'"
  show (Just' x) = "(Just' " <> show x <> ")"

-- Aversion of Maybe where everything is derived

data Maybe a = Nothing | Just a

derive instance Eq a => Eq (Maybe a)
derive instance Ord a => Ord (Maybe a)
derive instance Generic (Maybe a) _
instance Show a => Show (Maybe a) where
  show = genericShow

greaterThanOrEq :: ∀ a. Ord a => a -> a -> Boolean
greaterThanOrEq x y = x > y || x == y

infixl 4 greaterThanOrEq as >=

data Either a b = Left a | Right b

derive instance (Eq a, Eq b) => Eq (Either a b)
derive instance (Ord a, Ord b) => Ord (Either a b)
derive instance Generic (Either a b) _
instance (Show a, Show b) => Show (Either a b) where
  show = genericShow

test :: Effect Unit
test = do
  log "Equalities for Maybe:"
  log $ show $ Just 5 == Just 5
  log $ show $ Just 5 == Just 2
  log $ show $ Just 5 == Nothing
  log $ show $ Nothing == Just 5
  log $ show $ Nothing == (Nothing :: Maybe Unit)
  log "\nInequalities for Maybe:"
  log $ "Just 1 < Just 5 -> " <> (show $ Just 1 < Just 5)
  log $ "Just 5 <= Just 5 -> " <> (show $ Just 5 <= Just 5)
  log $ "Just 5 > Just 10 -> " <> (show $ Just 5 > Just 10)
  log $ "Just 99 > Nothing -> " <> (show $ Just 99 > Nothing)
  log $ "Just 99 < Nothing -> " <> (show $ Just 99 < Nothing)
  log "\nShow for Maybe:"
  log $ "Just 'abc' -> " <> (show $ Just "abc")
  log $ "(Nothing :: Maybe Unit) -> " <> (show (Nothing :: Maybe Unit))
  log "\nTest for Either:"
  log $ show $ (Left "abc" :: Either _ Unit)
  log $ show $ (Right $ Just 42 :: Either Unit _)
