module Utils where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as Ajax
import Data.Argonaut (class DecodeJson, class EncodeJson, decodeJson, encodeJson, printJsonDecodeError)
import Data.Bifunctor (lmap)
import Data.Either (Either)
import Data.Maybe (Maybe(..))
import Effect.Aff.Class (class MonadAff, liftAff)
import Type.Proxy (Proxy)

apiCall
  :: ∀ m request response
   . MonadAff m
  => EncodeJson request
  => DecodeJson response
  => request
  -> Proxy response
  -> m (Either String response)
apiCall request _ = do
  ajaxResult <- liftAff $ Ajax.post ResponseFormat.json "http://localhost:3000/"
    $ Just
    $ RequestBody.json
    $ encodeJson
    $ request

  pure do
    { body } <- lmap Ajax.printError ajaxResult
    lmap printJsonDecodeError $ decodeJson body