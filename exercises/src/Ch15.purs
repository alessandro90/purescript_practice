module Ch15 where

import Prelude

import Data.Foldable (class Foldable, foldl)
import Data.Functor.Contravariant (class Contravariant, cmap, (>$<))
import Data.Int.Bits ((.&.))
import Data.List (List(..), (:))
import Data.Profunctor (class Profunctor, dimap)
import Data.String (length)
import Effect (Effect)
import Effect.Console (log)

odd :: Int -> Boolean
odd x = x .&. 1 == 1

newtype Predicate a = Predicate (a -> Boolean)

instance Contravariant Predicate where
  cmap f (Predicate p) = Predicate (p <<< f)

runPredicate :: ∀ a. Predicate a -> (a -> Boolean)
runPredicate (Predicate f) = f

-- s: state type
-- b: output type
-- a: input type
data Moore s a b = Moore s (s -> b) (s -> a -> s)

instance Profunctor (Moore s) where
  dimap :: ∀ a b c d. (a -> b) -> (c -> d) -> Moore s b c -> Moore s a d
  dimap f g (Moore s output transition') = Moore s (g <<< output) (\x -> transition' x <<< f)

runFoldL
  :: ∀ foldable state inp out
   . Foldable foldable
  => Moore state inp out
  -> foldable inp
  -> out
runFoldL (Moore s0 output step) = output <<< foldl step s0

data OvenState = Off | Bake | Idling

data Heat = HeatOn | HeatOff

outputFn :: OvenState -> Heat
outputFn Off = HeatOff
outputFn Bake = HeatOn
outputFn Idling = HeatOff

data InputSignal = BakePressed | OffPressed | TooHot | TooCold

transition :: OvenState -> InputSignal -> OvenState
transition Off BakePressed = Bake
transition Bake OffPressed = Off
transition Bake TooHot = Idling
transition Idling OffPressed = Off
transition Idling TooCold = Bake
transition s _ = s

addr :: ∀ a. Semiring a => Moore a a a
addr = Moore zero identity (+)

-- Can't decide if this version is clearer than the profunctor version below
-- sizer :: Moore Int String String
-- sizer = Moore 0 (\l -> "Size is " <> show l) (\l str -> l + length str)

sizer :: Moore Int String String
sizer = dimap length (\l -> "Size is " <> show l) addr

test :: Effect Unit
test = do
  log $ show $ odd 0
  log $ show $ odd 1
  log $ show $ runPredicate (Predicate odd) $ 10
  log $ show $ runPredicate (Predicate odd) $ 11
  log "----------------------------------------"
  log $ show $ runPredicate (cmap (_ + 1) (Predicate odd)) 10
  log $ show $ runPredicate (cmap (_ + 2) (Predicate odd)) 10
  log $ show $ runPredicate ((_ + 1) >$< (Predicate odd)) 10
  log $ show $ runPredicate ((_ + 2) >$< (Predicate odd)) 10
  log "----------------------------------------"
  log $ show $ runFoldL addr [ 1, 2, 3 ]
  log $ show $ runFoldL addr (1.0 : 2.0 : 3.0 : Nil)
  log $ show $ runFoldL sizer [ "This", "is", "the", "test" ]
