module Ch13 where

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Data.String (toUpper)
import Effect (Effect)
import Effect.Console (log)
import Prelude (class Eq, class Show, Unit, discard, identity, show, ($), (+), (/), (<<<), (<>), (==), (*))

class Functor f where
  map :: ∀ a b. (a -> b) -> f a -> f b

infixl 4 map as <$>

class Bifunctor f where
  bimap :: ∀ a b c d. (a -> b) -> (c -> d) -> f a c -> f b d

data Maybe a = Nothing | Just a

derive instance Eq a => Eq (Maybe a)
derive instance Generic (Maybe a) _
instance Show a => Show (Maybe a) where
  show = genericShow

instance Functor Maybe where
  map _ Nothing = Nothing
  map f (Just x) = Just $ f x

data Either a b = Left a | Right b

derive instance Generic (Either a b) _
instance (Show a, Show b) => Show (Either a b) where
  show = genericShow

instance Functor (Either a) where
  map _ (Left x) = Left x
  map f (Right x) = Right $ f x

instance Bifunctor Either where
  bimap f _ (Left x) = Left $ f x
  bimap _ g (Right x) = Right $ g x

data Tuple a b = Tuple a b

derive instance Generic (Tuple a b) _
instance (Show a, Show b) => Show (Tuple a b) where
  show = genericShow

derive instance (Eq a, Eq b) => Eq (Tuple a b)

instance Functor (Tuple a) where
  map f (Tuple x y) = Tuple x $ f y

instance Bifunctor Tuple where
  bimap f g (Tuple x y) = Tuple (f x) (g y)

data Threeple a b c = Threeple a b c

derive instance Generic (Threeple a b c) _
instance (Show a, Show b, Show c) => Show (Threeple a b c) where
  show = genericShow

instance Functor (Threeple a b) where
  map f (Threeple x y z) = Threeple x y $ f z

instance Bifunctor (Threeple a) where
  bimap f g (Threeple k x y) = Threeple k (f x) (g y)

rmap :: ∀ f a b c. Bifunctor f => (c -> b) -> f a c -> f a b
rmap f = bimap identity f

lmap :: ∀ f a b c. Bifunctor f => (a -> b) -> f a c -> f b c
lmap f = bimap f identity

testMaybeFunctorComposition :: ∀ a b c f. Functor f => Eq (f c) => (a -> b) -> (b -> c) -> f a -> Boolean
testMaybeFunctorComposition f g m = map (g <<< f) m == (map g <<< map f) m

test :: Effect Unit
test = do
  log $ show $ (_ / 2) <$> (Just 10)
  log $ show $ (_ / 2) <$> (Nothing :: Maybe Int)
  log $ show $ (_ / 2) <$> (Right 10 :: Either Unit _)
  log $ show $ (_ / 2) <$> (Left "Oh no")
  log $ show $ (_ / 2) <$> (Tuple 10 20)
  log $ show $ bimap (_ / 2) (_ / 5) (Tuple 10 20)
  log $ show $ (_ / 2) <$> (Threeple 10 20 30)
  log $ "Maybe identity for Nothing: " <> show ((identity <$> (Nothing :: Maybe Unit)) == Nothing)
  log $ "Maybe identity for Just: " <> show ((identity <$> Just [ 1, 2 ]) == Just [ 1, 2 ])
  log $ "Maybe composition for Nothing: " <> (show $ testMaybeFunctorComposition (_ + 1) (_ / 2) Nothing)
  log $ "Maybe composition for Just: " <> (show $ testMaybeFunctorComposition (_ + 1) (_ / 2) (Just 100))
  log $ "Maybe composition for Tuple: " <> (show $ testMaybeFunctorComposition (_ + 1) (_ / 2) (Tuple 100 50))
  log $ show $ rmap (_ * 2) $ Left "error reason"
  log $ show $ rmap (_ * 2) $ (Right 10 :: Either Unit _)
  log $ show $ lmap toUpper $ (Left "error reason" :: Either _ Unit)
  log $ show $ lmap toUpper $ Right 10
  log $ show $ rmap (_ * 2) $ Tuple 80 40
  log $ show $ lmap (_ / 2) $ Tuple 80 40
  log $ show $ bimap (_ * 2) (_ / 2) $ Tuple 80 40
  log $ show $ rmap (_ * 2) $ Threeple 0 80 40
  log $ show $ lmap (_ / 2) $ Threeple 0 80 40
  log $ show $ bimap (_ * 2) (_ / 2) $ Threeple 0 80 40
