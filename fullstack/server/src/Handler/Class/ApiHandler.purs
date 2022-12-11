module Handler.Class.ApiHandler where

-- import Prelude

import Data.Argonaut (Json, JsonDecodeError)
import Data.Either (Either)
import HTTPure (ResponseM)
import Type.Proxy (Proxy)

class ApiHandler :: ∀ k. k -> Constraint
class ApiHandler a where
  handle :: Json -> Proxy a -> Either JsonDecodeError ResponseM