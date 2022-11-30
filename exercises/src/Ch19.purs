module Ch19 where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)

-- Implement Maybe monad

data Maybe a = Nothing | Just a

derive instance Generic (Maybe a) _
instance Show a => Show (Maybe a) where
  show = genericShow

instance Functor Maybe where
  map _ Nothing = Nothing
  map f (Just x) = Just $ f x

instance Apply Maybe where -- Or just use ap
  apply Nothing _ = Nothing
  apply (Just f) x = f <$> x

instance Applicative Maybe where
  pure = Just

instance Bind Maybe where
  bind Nothing _ = Nothing
  bind (Just x) f = f x

instance Monad Maybe

-- Implement Either monad

data Either a b = Left a | Right b

derive instance Generic (Either a b) _
instance (Show a, Show b) => Show (Either a b) where
  show = genericShow

instance Functor (Either a) where
  map _ (Left x) = Left x
  map f (Right x) = Right $ f x

instance Apply (Either a) where -- Or just use ap
  apply (Left e) _ = Left e
  apply (Right fx) x = fx <$> x

instance Applicative (Either a) where
  pure = Right

instance Bind (Either a) where
  bind (Left x) _ = Left x
  bind (Right x) f = f x

instance Monad (Either a)

type RWSResult r w s =
  { r :: r
  , w :: w
  , s :: s
  }

newtype RWS r w s a = RWS (RWSResult r w s -> Tuple a (RWSResult r w s))

instance Functor (RWS r w s) where
  map f (RWS g) = RWS \rws -> g rws # \(Tuple x rws') -> Tuple (f x) rws'

instance Monoid w => Apply (RWS r w s) where
  apply = ap

instance Monoid w => Applicative (RWS r w s) where
  pure x = RWS \{ r, s } -> Tuple x { r, w: mempty, s }

runRWS :: ∀ r w s a. RWS r w s a -> (RWSResult r w s -> Tuple a (RWSResult r w s))
runRWS (RWS fx) = fx

instance Monoid w => Bind (RWS r w s) where
  bind (RWS g) f = RWS \rws -> g rws
    # \(Tuple x rws'@{ w }) -> runRWS (f x) rws'
        # \(Tuple x' rws''@{ w: w' }) -> Tuple x' rws'' { w = w <> w' }

instance (Monoid w) => Monad (RWS r w s)

tell :: ∀ r w s. w -> RWS r w s Unit
tell w = RWS \rws -> Tuple unit rws { w = w }

ask :: ∀ r w s. Monoid w => RWS r w s r
ask = RWS \rws@{ r } -> Tuple r rws { w = mempty :: w }

get :: ∀ r w s. Monoid w => RWS r w s s
get = RWS \rws@{ s } -> Tuple s rws { w = mempty :: w }

put :: ∀ r w s. Monoid w => s -> RWS r w s Unit
put s = RWS \rws -> Tuple unit rws { s = s, w = mempty :: w }

-- -------------------------------------------------------------

type Config = { debugModeOn :: Boolean }
type Counter = Int

rwsTest :: RWS Config (Array String) Counter Unit
rwsTest = do
  tell [ "test the log" ]
  tell [ "test the log 2", "test the log 3" ]
  config <- ask
  tell [ "the config is " <> show config ]
  counter <- get
  tell [ "old counter is " <> show counter ]
  put $ counter + 1
  newCounter <- get
  tell [ "new counter is " <> show newCounter ]
  pure unit

test :: Effect Unit
test = do
  log "Maybe tests:"
  log $ show $ Just (_ * 10) <*> Just 20
  log $ show $ Just (_ * 10) <*> pure 20
  log $ show $ Just 20 >>= pure <<< (_ * 10)
  log $ show do
    x <- Just 20
    let y = x * 10
    pure y
  log $ show $ Just 20 >>= const Nothing >>= \y -> Just $ y + 42
  log $ show do
    _ <- Just 20
    y <- Nothing
    pure $ y + 42
  log "Either tests:"
  log $ show $ Right (_ * 10) <*> (Right 20 :: Either Unit _)
  log $ show $ Right (_ * 10) <*> (pure 20 :: Either Unit _)
  log $ show $ (Right 20 :: Either Unit _) >>= pure <<< (_ * 10)
  log $ show do
    x <- Right 20 :: Either Unit _
    let y = x * 10
    pure y
  log $ show $ Right 20 >>= const (Left "error") >>= \y -> Right $ y + 42
  log $ show do
    _ <- Right 20
    y <- Left "error"
    pure $ y + 42
  log "RWS test"
  log $ show $ runRWS rwsTest { r: { debugModeOn: true }, w: mempty, s: 0 }