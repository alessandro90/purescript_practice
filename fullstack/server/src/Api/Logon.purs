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

newtype LogonResultSuccessContents = LogonResultSuccessContents
  { authToken :: UUID
  , mustChangePassword :: Boolean
  }

instance EncodeJson LogonResultSuccessContents where
  encodeJson (LogonResultSuccessContents { authToken, mustChangePassword }) =
    encodeJson { authToken: toString authToken, mustChangePassword }

instance DecodeJson LogonResultSuccessContents where
  decodeJson json = do
    obj <- decodeJObject json
    token <- obj .: "authToken"
    mustChangePassword <- obj .: "mustChangePassword"
    case parseUUID token of
      Nothing -> Left $ AtKey "authToken" $ UnexpectedValue json
      Just authToken -> Right $ LogonResultSuccessContents { authToken, mustChangePassword }

data LogonResults
  = LogonResultsFailure
  | LogonResultsSuccess LogonResultSuccessContents

instance EncodeJson LogonResults where
  encodeJson LogonResultsFailure = encodeJson { tag: "LogonResultsFailure" }
  encodeJson (LogonResultsSuccess (LogonResultSuccessContents { authToken, mustChangePassword })) =
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
        contents <- obj .: "contents"
        Right $ LogonResultsSuccess contents
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