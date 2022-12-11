module Data.Api.Logoff where

import Prelude

import Data.Argonaut (class DecodeJson, class EncodeJson, JsonDecodeError(..), encodeJson, (.:))
import Data.Argonaut.Decode.Decoders (decodeJObject)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.UUID (UUID, parseUUID, toString)

newtype LogoffRequest = LogoffRequest { authToken :: UUID }

instance EncodeJson LogoffRequest where
  encodeJson (LogoffRequest { authToken }) = encodeJson
    { tag: "LogoffRequest"
    , contents: { authToken: toString authToken }
    }

instance DecodeJson LogoffRequest where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "LogoffRequest" then do
      { authToken } <- (obj .: "contents") :: _ { authToken :: String }
      case parseUUID authToken of
        Nothing -> Left $ AtKey "authToken" $ UnexpectedValue json
        Just tok -> Right $ LogoffRequest { authToken: tok }
    else
      Left $ AtKey tag $ UnexpectedValue json

data LogoffResponse = LogoffResponseFailure | LogoffResponseSuccess

instance EncodeJson LogoffResponse where
  encodeJson LogoffResponseFailure = encodeJson { tag: "LogoffResponseFailure" }
  encodeJson LogoffResponseSuccess = encodeJson { tag: "LogoffResponseSuccess" }

instance DecodeJson LogoffResponse where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    case tag of
      "LogoffResponseFailure" -> Right LogoffResponseFailure
      "LogoffResponseSuccess" -> Right LogoffResponseSuccess
      _ -> Left $ AtKey "tag" $ UnexpectedValue json

