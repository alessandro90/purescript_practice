module Ch23a where

import Prelude

import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, Canceler(..), Milliseconds(..), cancelWith, delay, error, forkAff, joinFiber, killFiber, launchAff_, message, runAff)
import Effect.Aff.AVar (AVar)
import Effect.Aff.AVar as AVar
import Effect.Class.Console (log)
import Effect.Console as Console

data TickTock = Tick | Tock

setTickTock :: TickTock -> AVar TickTock -> Aff Unit
setTickTock tck ttAVar = do
  _ <- AVar.take ttAVar
  delay $ Milliseconds 1000.0
  AVar.put tck ttAVar

runTickTock :: TickTock -> (AVar TickTock -> Aff Unit)
runTickTock tck = go
  where
  go ttAVar = do
    setTickTock tck ttAVar
    go ttAVar

tick :: AVar TickTock -> Aff Unit
tick = runTickTock Tick

tock :: AVar TickTock -> Aff Unit
tock = runTickTock Tock

clock :: AVar TickTock -> Aff Unit
clock ttAVar = do
  setTickTock Tock ttAVar
  setTickTock Tick ttAVar
  clock ttAVar

bomb :: AVar TickTock -> Int -> Aff Unit
bomb ttAVar detonationCount = go 0 Tick
  where
  go count tck = do
    if (count == detonationCount) then
      log "BOOM!"
    else do
      delay $ Milliseconds 500.0
      tt <- AVar.read ttAVar
      case Tuple tck tt of
        Tuple Tick Tick -> log "Tick" *> go count Tock
        Tuple Tock Tock -> log "Tock" *> go (count + 1) Tick
        Tuple _ _ -> go count tck

test :: Effect Unit
test = launchAff_ do
  ttAVar <- AVar.empty
  clockFiber <- forkAff $ cancelWith (clock ttAVar) $ Canceler $ log <<< message
  bombFiber <- forkAff $ bomb ttAVar 4
  AVar.put Tick ttAVar
  joinFiber bombFiber
  killFiber (error "Exploded") clockFiber

