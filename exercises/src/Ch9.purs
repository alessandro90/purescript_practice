module Ch9 where

import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype, unwrap)
import Data.Semigroup as StdSemigroup
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Console (log)
import Prelude (class Eq, class HeytingAlgebra, class Show, Unit, discard, show, ($), (&&), (==))

class Semigroup a where
  append :: a -> a -> a

infixr 5 append as <>

class Semigroup a <= Monoid a where
  mempty :: a

class Monoid a <= Group a where
  ginverse :: a -> a

class Semigroup g <= Commutative g

instance Semigroup String where
  append a b = StdSemigroup.append a b

data AndBool = AFalse | ATrue

derive instance Eq AndBool
derive instance Generic AndBool _

instance Show AndBool where
  show = genericShow

instance HeytingAlgebra AndBool where
  ff = AFalse
  tt = ATrue
  conj ATrue ATrue = ATrue
  conj _ _ = AFalse
  disj AFalse AFalse = AFalse
  disj _ _ = ATrue
  not ATrue = AFalse
  not AFalse = ATrue
  implies ATrue ATrue = ATrue
  implies AFalse AFalse = ATrue
  implies _ _ = AFalse

instance Semigroup AndBool where
  append = (&&)

instance Monoid AndBool where
  mempty = ATrue

-- instance Semigroup AndBool where
--   append ATrue ATrue = ATrue
--   append _ _ = AFalse

verifyAndBoolSemigroup :: Boolean
verifyAndBoolSemigroup = ATrue <> (AFalse <> ATrue) == (ATrue <> AFalse) <> ATrue

verifyAndBoolMonoid :: Boolean
verifyAndBoolMonoid = (ATrue <> mempty == ATrue)
  && (mempty <> ATrue == ATrue)
  && (AFalse <> mempty == AFalse)
  && (mempty <> AFalse == AFalse)

data OrBool = OFalse | OTrue

derive instance Eq OrBool
derive instance Generic OrBool _
instance Show OrBool where
  show = genericShow

instance Semigroup OrBool where
  append OFalse OFalse = OFalse
  append _ _ = OTrue

instance Monoid OrBool where
  mempty = OFalse

verifyOrBoolSemigroup :: Boolean
verifyOrBoolSemigroup = OTrue <> (OFalse <> OTrue) == (OTrue <> OFalse) <> OTrue

verifyOrBoolMonoid :: Boolean
verifyOrBoolMonoid = (OTrue <> mempty == OTrue)
  && (mempty <> OTrue == OTrue)
  && (OFalse <> mempty == OFalse)
  && (mempty <> OFalse == OFalse)

data Mod4 = Zero | One | Two | Three

derive instance Eq Mod4
derive instance Generic Mod4 _
instance Show Mod4 where
  show = genericShow

instance Semigroup Mod4 where
  append Zero x = x
  append x Zero = x
  append One One = Two
  append One Two = Three
  append One Three = Zero
  append Two One = Three
  append Two Two = Zero
  append Two Three = One
  append Three One = Zero
  append Three Two = One
  append Three Three = Two

instance Monoid Mod4 where
  mempty = Zero

instance Group Mod4 where
  ginverse Zero = Zero
  ginverse One = Three
  ginverse Two = Two
  ginverse Three = One

instance Commutative Mod4

verifyMod4Semigroup :: Boolean
verifyMod4Semigroup = One <> (Three <> Two) == (One <> Three) <> Two

verifyMod4Monoid :: Boolean
verifyMod4Monoid = (One <> mempty == One)
  && (mempty <> Two == Two)
  && (Three <> mempty == Three)
  && (mempty <> Zero == Zero)

newtype First a = First (Maybe a)

derive instance Newtype (First a) _
derive instance Eq a => Eq (First a)
derive instance Generic (First a) _
instance Show a => Show (First a) where
  show x = "(First" <> show (unwrap x) <> ")"

instance Semigroup (First a) where
  append (First Nothing) last = last
  append first _ = first

instance Monoid (First a) where
  mempty = First Nothing

newtype Last a = Last (Maybe a)

derive instance Newtype (Last a) _
derive instance Eq a => Eq (Last a)
derive instance Generic (Last a) _
derive newtype instance Show a => Show (Last a)

instance Semigroup (Last a) where
  append first (Last Nothing) = first
  append _ last = last

instance Monoid (Last a) where
  mempty = Last Nothing

test :: Effect Unit
test = do
  log $ show $ ATrue <> ATrue
  log $ show $ ATrue <> AFalse
  log $ show $ AFalse <> AFalse
  log $ show $ mempty <> ATrue == ATrue
  log $ show $ mempty <> AFalse == ATrue
  log $ show verifyAndBoolSemigroup
  log $ show verifyAndBoolMonoid
  log $ show verifyOrBoolSemigroup
  log $ show verifyOrBoolMonoid
  log $ show verifyMod4Semigroup
  log $ show verifyMod4Monoid
  log $ show $ First Nothing <> First (Just 10)
  log $ show $ Last (Just 1) <> Last (Just 99)
