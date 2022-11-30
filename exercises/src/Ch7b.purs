module Ch7b where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Int as DInt
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Show.Generic (genericShow)
import Data.String (Pattern(..), split)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)

newtype CSV = CSV String

derive instance Newtype CSV _
-- derive newtype instance Show CSV
derive newtype instance Eq CSV

instance Show CSV where
  show (CSV csv) = csv

class ToCSV a where
  toCSV :: a -> CSV

class FromCSV a where
  fromCSV :: CSV -> Maybe a

newtype FullName = FullName String

derive instance Newtype FullName _
derive instance Eq FullName
derive instance Generic FullName _
-- derive newtype instance Show FullName
instance Show FullName where
  show (FullName name) = name

newtype Age = Age Int

derive instance Newtype Age _
derive instance Eq Age
derive instance Generic Age _
derive newtype instance Show Age

data Occupation
  = Doctor
  | Dentist
  | Lawyer
  | SoftwareDeveloper
  | Unemployed

derive instance Eq Occupation

fromString :: String -> Maybe Occupation
fromString "Doctor" = Just Doctor
fromString "Dentist" = Just Dentist
fromString "Lawyer" = Just Lawyer
fromString "SoftwareDeveloper" = Just SoftwareDeveloper
fromString "Unemployed" = Just Unemployed
fromString _ = Nothing

derive instance Generic Occupation _
instance Show Occupation where
  show = genericShow

data Person = Person
  { name :: FullName
  , age :: Age
  , occupation :: Occupation
  }

derive instance Eq Person
derive instance Generic Person _
instance Show Person where
  show = genericShow

instance ToCSV Person where
  toCSV (Person { name, age, occupation }) = CSV $
    show name <> "," <> show age <> "," <> show occupation

instance FromCSV Person where
  fromCSV (CSV csv) = case split (Pattern ",") csv of
    [ name, age, occupation ] -> case Tuple (DInt.fromString age) (fromString occupation) of
      Tuple (Just iage) (Just occ) -> Just $ Person
        { name: FullName name, age: Age iage, occupation: occ }
      _ -> Nothing
    _ -> Nothing

myself :: Person
myself = Person { name: FullName "Alessandro", age: Age 32, occupation: SoftwareDeveloper }

test :: Effect Unit
test = do
  log $ show $ toCSV $ Person
    { name: FullName "Alessandro", age: Age 32, occupation: SoftwareDeveloper }
  -- log $ show $ CSV "Alessandro,32,SoftwareDeveloper"
  log $ show $ toCSV myself == CSV "Alessandro,32,SoftwareDeveloper"
  log $ show $ (toCSV myself # fromCSV) == Just myself
