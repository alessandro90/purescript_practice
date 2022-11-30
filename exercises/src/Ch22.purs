module Ch22 where

import Prelude

import Data.Either (Either(..))
import Data.String (toLower, toUpper)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (Aff, Canceler(..), Error, Fiber, Milliseconds(..), cancelWith, delay, error, forkAff, killFiber, launchAff_, message, runAff, try)
import Effect.Aff.AVar (AVar)
import Effect.Aff.AVar as AVar
import Effect.Aff.Bus (BusW, BusR)
import Effect.Aff.Bus as Bus
import Effect.Class.Console (log)
import Node.Encoding (Encoding(..))
import Node.FS.Aff (readTextFile)

testFile :: String
testFile = "stuff/file.txt"

-- readAFile :: Aff (Either Error String)
-- readAFile = do
--   result <- try $ readTextFile ASCII testFile
--   pure result

readAFile :: Aff (Either Error String)
readAFile = try $ readTextFile ASCII testFile

readAFile' :: Aff String
readAFile' = readTextFile ASCII testFile

logEverySecond :: Aff Unit
logEverySecond = go 0
  where
  go x = do
    log $ show x
    delay $ Milliseconds 1000.0
    go $ x + 1

readAFileAfter2Seconds :: Aff (Either Error String)
readAFileAfter2Seconds = do
  delay $ Milliseconds 2000.0
  readAFile

readAFileAfter2Seconds' :: Aff String
readAFileAfter2Seconds' = do
  delay $ Milliseconds 2000.0
  readAFile'

readAFileAfter2SecondsAVar :: AVar String -> Aff Unit
readAFileAfter2SecondsAVar var = do
  delay $ Milliseconds 2000.0
  text <- readAFile'
  AVar.put text var

processText :: AVar String -> Aff Unit
processText avar = do
  text <- AVar.take avar
  log text

readAFileBus :: BusW String -> Aff Unit
readAFileBus fileBus = do
  text <- readAFile'
  Bus.write text fileBus

processFileBus :: (String -> String) -> BusR String -> Aff Unit
processFileBus convert fileBus = do
  text <- Bus.read fileBus
  log $ convert text

kill :: ∀ a. Fiber a -> Aff Unit
kill = killFiber $ error "Killing you softly..."

test :: Effect Unit
test = launchAff_ do
  fileBus <- Bus.make
  let Tuple readBus writeBus = Bus.split fileBus
  void $ forkAff $ processFileBus toUpper readBus
  void $ forkAff $ processFileBus toLower readBus
  void $ forkAff $ readAFileBus writeBus
-- avar <- AVar.empty
-- void $ forkAff $ readAFileAfter2SecondsAVar avar
-- void $ forkAff $ processText avar
--   fileReader <-
--     runAff case _ of
--       Left err -> log $ show err
--       Right result -> log $ "File content: " <> show result
--       $ readAFileAfter2Seconds'

--   launchAff_ do
--     logger <- forkAff $ cancelWith logEverySecond (Canceler $ log <<< message)
--     delay $ Milliseconds 5000.0
--     kill fileReader
--     kill logger
