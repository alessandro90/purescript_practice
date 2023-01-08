module Handler.Api.Common where

import Prelude

import Data.Argonaut (class DecodeJson, Json, JsonDecodeError, decodeJson)
import Data.Either (Either)
import Handler.Class.ApiHandler (Handler)

handleApi :: ∀ a. DecodeJson a => (a -> Handler) -> Json -> Either JsonDecodeError Handler
handleApi handler json = do
  request <- decodeJson json :: _ a
  pure $ handler request