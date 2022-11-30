module Ch20 where

import Prelude

import Control.Monad.Except (ExceptT, runExceptT, throwError)
import Control.Monad.State (StateT, get, put, runStateT)
import Control.Monad.Writer (class MonadTell, WriterT, runWriterT, tell)
import Data.Either (Either(..))
import Data.Identity (Identity)
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)

type AppStack e w s a = ExceptT e (WriterT w (StateT s Effect)) a

type StackResult = Tuple (Tuple (Either String Unit) String) Int

type AppM = AppStack String String Int Unit

type AppEffects =
  { log :: String
  , state :: Int
  , result :: Maybe Unit
  }

type AppResult = Tuple (Maybe String) AppEffects

results :: StackResult -> AppResult
results (Tuple (Tuple (Left err) l) s) = Tuple (Just err) { log: l, state: s, result: Nothing }
results (Tuple (Tuple (Right _) l) s) = Tuple Nothing { log: l, state: s, result: Just unit }

app :: AppM
app = do
  logLn "Starting App..."
  n <- get
  when (n == 0) $ void $ throwError "We cannot have 0 state"
  put $ n + 1
  logLn "Incremented state"
  pure unit

runApp :: Int -> AppM -> Effect AppResult
runApp initialState =
  runExceptT
    >>> runWriterT
    >>> flip runStateT initialState
    >>> map results

logLn :: ∀ m. MonadTell String m => String -> m Unit
logLn s = tell $ s <> "\n"

test :: Effect Unit
test = do
  result1 <- runApp 0 app
  log $ show $ result1
  result2 <- runApp 1 app
  log $ show $ result2