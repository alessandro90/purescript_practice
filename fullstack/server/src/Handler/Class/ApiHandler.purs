module Handler.Class.ApiHandler where

-- import Prelude

import Control.Monad.Reader (ReaderT)
import Data.Argonaut (Json, JsonDecodeError)
import Data.Either (Either)
import Effect.Aff (Aff)
import Effect.Aff.AVar (AVar)
import HTTPure (Response)
import Manager.Account (Accounts)
import Type.Proxy (Proxy)

type HandlerEnv = { accountsAVar :: AVar Accounts }

type Handler = ReaderT HandlerEnv Aff Response

class ApiHandler :: ∀ k. k -> Constraint
class ApiHandler a where
  handle :: Json -> Proxy a -> Either JsonDecodeError Handler