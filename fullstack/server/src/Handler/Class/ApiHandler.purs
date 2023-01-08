module Handler.Class.ApiHandler where

-- import Prelude

import Control.Monad.Reader (ReaderT)
import Data.Argonaut (Json, JsonDecodeError)
import Data.Either (Either)
import Effect.Aff (Aff)
import Effect.Aff.AVar (AVar)
import HTTPure (Response)
import Manager.Account (Accounts)
import Manager.Session (Sessions)
import Type.Proxy (Proxy)

type HandlerEnv =
  { accountsAVar :: AVar Accounts
  , sessionsAVar :: AVar Sessions
  }

type Handler = ReaderT HandlerEnv Aff Response

class ApiHandler :: ∀ k. k -> Constraint
class ApiHandler a where
  handle :: Proxy a -> Json -> Either JsonDecodeError Handler