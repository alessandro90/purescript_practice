module Ch17 where

-- ( Age(..)
-- , FamilyAges
-- , FamilyAgesRow
-- , Validation
-- , createFamilyAges
-- , test
-- ) where

import Prelude

import Data.Bifunctor (class Bifunctor)
import Data.Generic.Rep (class Generic)
import Data.Newtype (class Newtype)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Console (log)

data Maybe a = Nothing | Just a

derive instance Generic (Maybe a) _
instance Show a => Show (Maybe a) where
  show = genericShow

instance Functor Maybe where
  map _ Nothing = Nothing
  map f (Just x) = Just $ f x

instance Apply Maybe where
  apply (Just f) x = f <$> x
  apply _ _ = Nothing

instance Applicative Maybe where
  pure = Just

data Either a b = Left a | Right b

derive instance (Eq a, Eq b) => Eq (Either a b)
derive instance (Ord a, Ord b) => Ord (Either a b)

derive instance Generic (Either a b) _
instance (Show a, Show b) => Show (Either a b) where
  show = genericShow

instance Functor (Either a) where
  map f (Right x) = Right $ f x
  map _ (Left x) = Left x

instance Bifunctor Either where
  bimap :: ∀ a b c d. (a -> b) -> (c -> d) -> Either a c -> Either b d
  bimap f _ (Left x) = Left $ f x
  bimap _ g (Right x) = Right $ g x

instance Apply (Either a) where
  apply (Right f) x = f <$> x
  apply (Left f) _ = Left f

instance Applicative (Either a) where
  pure = Right

newtype Validation err result = Validation (Either err result)

derive instance Newtype (Validation err result) _
derive newtype instance Functor (Validation err)
derive newtype instance Bifunctor Validation
derive instance (Eq err, Eq result) => Eq (Validation err result)
derive instance (Ord err, Ord result) => Ord (Validation err result)
derive instance Generic (Validation err result) _

instance (Show err, Show result) => Show (Validation err result) where
  show = genericShow

instance Semigroup err => Apply (Validation err) where
  apply (Validation (Left err)) (Validation (Left x)) = Validation $ Left $ err <> x
  apply (Validation (Left err)) _ = Validation $ Left err
  apply (Validation (Right f)) x = f <$> x

instance Semigroup err => Applicative (Validation err) where
  pure = Validation <<< Right

-- This is actually invalid. The error case short-circuits, and that is not
-- the behaviour of the Validation type. So we cannot build a Bind instance
-- for Validation
-- instance Semigroup e => Bind (Validation e) where
--   bind (Validation (Left e)) _ = Validation $ Left e
--   bind (Validation (Right v)) f = f v

-- instance Semigroup e => Monad (Validation e)

newtype Age = Age Int

derive instance Newtype Age _
derive instance Generic Age _
instance Show Age where
  show = genericShow

newtype LowerAge = LowerAge Int

derive instance Newtype LowerAge _
derive instance Generic LowerAge _
instance Show LowerAge where
  show = genericShow

newtype UpperAge = UpperAge Int

derive instance Newtype UpperAge _
derive instance Generic UpperAge _
instance Show UpperAge where
  show = genericShow

newtype FullName = FullName String

derive instance Newtype FullName _
derive instance Generic FullName _
instance Show FullName where
  show = genericShow

type FamilyAgesRow r = (fatherAge :: Age, motherAge :: Age, childAge :: Age | r)

type FamilyNamesRow r = (fatherName :: FullName, motherName :: FullName, childName :: FullName | r)

newtype Family = Family { | FamilyNamesRow (FamilyAgesRow ()) }

derive instance Generic Family _
instance Show Family where
  show = genericShow

newtype FamilyAges = FamilyAges { | FamilyAgesRow () }

derive instance Generic FamilyAges _
instance Show FamilyAges where
  show = genericShow

validateAge :: LowerAge -> UpperAge -> Age -> String -> Validation (Array String) Age
validateAge (LowerAge lower) (UpperAge upper) age_@(Age age) name
  | age < lower = Validation $ Left [ name <> " is too young" ]
  | age > upper = Validation $ Left [ name <> " is too old" ]
  | otherwise = Validation $ Right $ age_

createFamilyAges :: { | FamilyAgesRow () } -> Validation (Array String) FamilyAges
createFamilyAges { fatherAge, motherAge, childAge } =
  FamilyAges <$> -- Map constructor to a Validation
    ( { fatherAge: _, motherAge: _, childAge: _ } -- Map a function that takes 3 args and give a Record

        <$> validateAge (LowerAge 18) (UpperAge 100) fatherAge "father" -- same technique as fullNameComplete
        <*> validateAge (LowerAge 18) (UpperAge 100) motherAge "mother"
        <*> validateAge (LowerAge 1) (UpperAge 18) childAge "child"
    )

test :: Effect Unit
test = do
  log $ show $ (+) <$> Just 21 <*> Just 21
  log $ show $ (*) <$> pure 2 <*> (pure 21 :: Maybe Int)
  log $ show $ pure (+) <*> Just 17 <*> Just 25
  --   ----------------------------------------------------
  log "Applicative laws for Either a b"
  log $ "Associative composition: " <>
    ( show $ ((<<<) <$> pure identity <*> pure identity <*> pure 1) ==
        (pure identity <*> (pure identity <*> pure 1 :: Either Unit Int))
    )
  log $ "Identity: " <>
    ( show $ (pure identity <*> pure 1) ==
        (pure 1 :: Either Unit Int)
    )
  log $ "Interchange: " <>
    ( show $ (pure negate <*> pure 1) ==
        (pure (_ $ 1) <*> pure negate :: Either Unit Int)
    )
  log "-----------------------------------------------------------------"
  log $ show $ createFamilyAges { fatherAge: Age 40, motherAge: Age 30, childAge: Age 10 }
  log $ show $ createFamilyAges { fatherAge: Age 400, motherAge: Age 300, childAge: Age 0 }
  log $ show $ createFamilyAges { fatherAge: Age 4, motherAge: Age 3, childAge: Age 10 }
  log $ show $ createFamilyAges { fatherAge: Age 40, motherAge: Age 30, childAge: Age 100 }
  log $ show $ createFamilyAges { fatherAge: Age 40, motherAge: Age 3, childAge: Age 0 }