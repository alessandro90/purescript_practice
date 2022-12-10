module Api.Logon where

import Prelude

import Data.Argonaut (class DecodeJson, class EncodeJson, Json, JsonDecodeError(..), encodeJson, (.:))
import Data.Argonaut.Decode.Decoders (decodeJObject)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.UUID (UUID, parseUUID, toString)

tagError :: Json -> JsonDecodeError
tagError = (AtKey "tag") <<< UnexpectedValue

newtype LogonRequest = LogonRequest
  { userName :: String
  , password :: String
  }

logonRequestTag :: String
logonRequestTag = "LogonRequest"

instance EncodeJson LogonRequest where
  encodeJson (LogonRequest { userName, password }) =
    encodeJson { tag: "LogonRequest", contents: { userName, password } }

instance DecodeJson LogonRequest where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == logonRequestTag then do
      contents <- obj .: "contents"
      Right $ LogonRequest contents
    else
      Left $ tagError json

type LogonResultSuccessContents =
  { authToken :: UUID
  , mustChangePassword :: Boolean
  }

type LogonResultSuccessContentsString =
  { authToken :: String
  , mustChangePassword :: Boolean
  }

data LogonResults
  = LogonResultsFailure
  | LogonResultsSuccess LogonResultSuccessContents

instance EncodeJson LogonResults where
  encodeJson LogonResultsFailure = encodeJson { tag: "LogonResultsFailure" }
  encodeJson (LogonResultsSuccess { authToken, mustChangePassword }) =
    encodeJson
      { tag: "LogonResultsSuccess"
      , contents: { authToken: toString authToken, mustChangePassword }
      }

instance DecodeJson LogonResults where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    case tag of
      "LogonResultsFailure" -> Right LogonResultsFailure
      "LogonResultsSuccess" -> do
        { authToken, mustChangePassword } <- obj .: "contents" :: _ LogonResultSuccessContentsString
        case parseUUID authToken of
          Nothing -> Left $ AtKey "authToken" $ UnexpectedValue json
          Just token -> Right $ LogonResultsSuccess { authToken: token, mustChangePassword }
      _ -> Left $ tagError json

newtype LogonResponse = LogonResponse LogonResults

logonResponseTag :: String
logonResponseTag = "LogonResponse"

instance EncodeJson LogonResponse where
  encodeJson (LogonResponse response) = encodeJson { tag: logonResponseTag, contents: response }

instance DecodeJson LogonResponse where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == logonResponseTag then do
      contents <- obj .: "contents"
      Right $ LogonResponse contents
    else
      Left $ tagError json