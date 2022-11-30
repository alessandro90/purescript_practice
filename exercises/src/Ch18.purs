module Ch18 where

import Prelude

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)

oddTest :: Int -> Maybe Int
oddTest n = if n `mod` 2 /= 0 then Just n else Nothing

greaterThanTest :: Int -> Int -> Maybe Int
greaterThanTest minVal n = if n > minVal then Just n else Nothing

lessThanTest :: Int -> Int -> Maybe Int
lessThanTest maxVal n = if n < maxVal then Just n else Nothing

-- 

oddTestEither :: Int -> Either String Int
oddTestEither n = if n `mod` 2 /= 0 then Right n else Left "Number is not odd"

greaterThanTestEither :: Int -> Int -> Either String Int
greaterThanTestEither minVal n =
  if n > minVal then
    Right n
  else
    Left $ "Number is not greater than " <> show minVal

lessThanTestEither :: Int -> Int -> Either String Int
lessThanTestEither maxVal n =
  if n < maxVal then
    Right n
  else
    Left $ "Number is not less than " <> show maxVal

gauntlet :: Int -> Maybe Int
gauntlet = oddTest >=> pure <<< (_ + 1) >=> greaterThanTest 10 >=> lessThanTest 20

gauntlet' :: Int -> Maybe Int
gauntlet' n =
  pure n
    >>= oddTest
    >>= \x -> pure (x + 1)
      >>= \y -> greaterThanTest 10 y
        >>= \z -> lessThanTest 20 z

gauntlet'' :: Int -> Maybe Int
gauntlet'' n = do
  o <- oddTest n
  let y = o + 1
  z <- greaterThanTest 10 y
  lessThanTest 20 z

gauntletEither :: Int -> Either String Int
gauntletEither n = do
  o <- oddTestEither n
  let y = o + 1
  z <- greaterThanTestEither 10 y
  lessThanTestEither 20 z

test :: Effect Unit
test = do
  log $ show $ gauntlet 14
  log $ show $ gauntlet 1
  log $ show $ gauntlet 93
  log $ show $ gauntlet 17
  log "Wotking with Either"
  log $ show $ gauntletEither 14
  log $ show $ gauntletEither 1
  log $ show $ gauntletEither 93
  log $ show $ gauntletEither 17