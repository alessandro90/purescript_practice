module Ch10 where

import Prelude

import Data.Foldable (class Foldable, foldl)
import Effect (Effect)
import Effect.Console (log)
import Data.List (List(..), (:))

length :: ∀ f a. Foldable f => f a -> Int
length = foldl (\acc _ -> acc + 1) 0

test :: Effect Unit
test = do
  log $ show $ length (3 : 4 : 5 : Nil)
  log $ show $ length [ 3, 4, 5, 6 ]