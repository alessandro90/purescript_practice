module Ch23b where

import Prelude

import Control.Monad.Reader (ReaderT, lift, runReaderT)
import Control.Monad.Reader.Trans (ask)
import Control.Monad.Rec.Class (forever)
import Control.Monad.State (StateT, get, modify_, runStateT)
import Effect (Effect)
import Effect.Aff (Aff, Milliseconds(..), delay, forkAff, launchAff_)
import Effect.Aff.Bus (BusRW)
import Effect.Aff.Bus as Bus
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Effect.Random (random)

-- randomAff :: Aff Number
-- randomAff = Aff.makeAff \cb -> do
--   n <- random
--   cb $ Right n
--   pure nonCanceler

randomAff :: Aff Number
randomAff = liftEffect random

-- delayRandom :: Aff Number
-- delayRandom = do
--   delay $ Milliseconds 1000.0
--   randomAff

constant :: Aff Number
constant = pure 42.0

delayRandom :: Aff Number
delayRandom = delay (Milliseconds 1000.0) *> randomAff

type Config = { bus :: BusRW String }

type State = { count :: Int }

type FiberM a = ReaderT Config (StateT State Aff) a

runFiberM :: State -> Config -> FiberM Unit -> Aff Unit
runFiberM s cfg = void
  <<< forkAff
  <<< flip runStateT s
  <<< flip runReaderT cfg

initialState :: State
initialState = { count: 10 }

liftAffToFiberM :: Aff ~> FiberM
liftAffToFiberM = lift <<< lift

logger :: FiberM Unit
logger = forever do
  { bus } <- ask
  n <- liftAffToFiberM $ Bus.read bus
  log $ "Logger: " <> n

randomGenerator :: String -> (Number -> Boolean) -> FiberM Unit
randomGenerator valueType pred = do
  { count } <- get
  when (count > 0) do
    { bus } <- ask
    liftAffToFiberM do
      n <- delayRandom
      when (pred n)
        $ flip Bus.write bus
        $ "Found a value that is " <> valueType <> " -> " <> show n
    modify_ _ { count = count - 1 }
    randomGenerator valueType pred

test :: Effect Unit
test = launchAff_ do
  bus <- Bus.make
  let forkFiberM = runFiberM initialState { bus }
  forkFiberM logger
  forkFiberM $ randomGenerator "> 0.5" (_ > 0.5)
  forkFiberM $ randomGenerator "< 0.5" (_ < 0.5)
  forkFiberM $ randomGenerator "> 0.1" (_ > 0.1)
