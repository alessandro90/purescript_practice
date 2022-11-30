module Ch6 where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Newtype (class Newtype, unwrap)
import Data.Show.Generic (genericShow)

data Place = First | Second | Third

instance Eq Place where
  eq First First = true
  eq Second Second = true
  eq Third Third = true
  eq _ _ = false

instance Ord Place where
  compare First First = EQ
  compare First _ = LT
  compare Second Third = LT
  compare Second Second = EQ
  compare Second First = GT
  compare Third Third = EQ
  compare Third _ = GT

instance Show Place where
  show First = "First"
  show Second = "Second"
  show Third = "Third"

-- Deriving typeclasses
data SomeType = This | That | TheOther | AndYetAnother

derive instance Eq SomeType
derive instance Ord SomeType
-- Show is not derivable directly, but there is a workaround
-- First derive from Generic, than implement Show based on Generic
derive instance Generic SomeType _
instance Show SomeType where
  show = genericShow

-- NewType typeclasses
newtype FirstName = FirstName String

derive instance Eq FirstName
derive instance Newtype FirstName _

newtype LastName = LastName String

derive instance Newtype LastName _

fullName :: FirstName -> LastName -> String
fullName (FirstName fn) (LastName ln) = fn <> " " <> ln

-- unwrap can be used if the type implements Newtype typeclass
fullName' :: FirstName -> LastName -> String
fullName' fn ln = unwrap fn <> " " <> unwrap ln

glueName :: ∀ a b. Newtype a String => Newtype b String => a -> b -> String
glueName fs sn = unwrap fs <> " " <> unwrap sn

class HasAddress a where
  getAddress :: a -> Address

type Address =
  { street1 :: String
  , street2 :: String
  , city :: String
  , state :: String
  , zip :: String
  }

newtype Person = Person
  { name :: String
  , age :: Int
  , address :: Address
  }

instance HasAddress Person where
  getAddress (Person p) = p.address

newtype Ceo = Ceo Person

derive instance Newtype Ceo _

instance HasAddress Ceo where
  getAddress (Ceo (Person p)) = p.address

newtype Janitor = Janitor Person

derive instance Newtype Janitor _

instance HasAddress Janitor where
  getAddress (Janitor p) = getAddress p

-- A more generic way
-- Get the address from any Newtype wrapping an HasAddress instance
extractAddress :: ∀ a b. Newtype a b => HasAddress b => a -> Address
extractAddress = getAddress <<< unwrap

newtype Employee = Employee Person

derive instance Newtype Employee _

instance HasAddress Employee where
  getAddress = extractAddress

-- An even more compact way
newtype Stuart = Stuart Person

derive instance Newtype Stuart _
-- This will call Person's getAddress implementation
derive newtype instance HasAddress Stuart

-- Instance chaining
-- NOTE: we are implementing a user-defined typeclass for a standard type
class IsRecord a where
  isRecord :: a -> Boolean

instance IsRecord (Record a) where
  isRecord _ = true
else instance IsRecord a where
  isRecord _ = false
