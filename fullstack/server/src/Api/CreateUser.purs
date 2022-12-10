module Api.CreateUser where

import Prelude

import Data.Argonaut (class DecodeJson, class EncodeJson, JsonDecodeError(..), encodeJson, (.:))
import Data.Argonaut.Decode.Decoders (decodeJObject)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.UUID (UUID, parseUUID, toString)
import Entity.User (UserRow)

type UserWithPassword = { | UserRow (password :: String) }

newtype CreateUserRequest = CreateUserRequest
  { authToken :: UUID
  , user :: UserWithPassword
  }

instance EncodeJson CreateUserRequest where
  encodeJson (CreateUserRequest { authToken, user }) = encodeJson
    { tag: "CreateUserRequest"
    , contents: { authToken: toString authToken, user }
    }

instance DecodeJson CreateUserRequest where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "CreateUserRequest" then do
      { authToken, user } <- obj .: "contents" :: _ { authToken :: String, user :: UserWithPassword }
      case parseUUID authToken of
        Nothing -> Left $ AtKey "contents.authToken" $ UnexpectedValue json
        Just token -> Right $ CreateUserRequest { authToken: token, user }
    else
      Left $ AtKey "tag" $ UnexpectedValue json

data CreateUserResultsFailureReason = AlreadyExists | NotAuthenticated | NotAuthorized

instance EncodeJson CreateUserResultsFailureReason where
  encodeJson AlreadyExists = encodeJson
    { tag: "CreateUserResultsFailureReason"
    , contents: { reason: "AlreadyExists" }
    }
  encodeJson NotAuthenticated = encodeJson
    { tag: "CreateUserResultsFailureReason"
    , contents: { reason: "NotAuthenticated" }
    }
  encodeJson NotAuthorized = encodeJson
    { tag: "CreateUserResultsFailureReason"
    , contents: { reason: "NotAuthorized" }
    }

instance DecodeJson CreateUserResultsFailureReason where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "CreateUserResultsFailureReason" then do
      { reason } <- obj .: "contents" :: _ { reason :: String }
      case reason of
        "AlreadyExists" -> Right AlreadyExists
        "NotAuthenticated" -> Right NotAuthenticated
        "NotAuthorized" -> Right NotAuthorized
        _ -> Left $ AtKey "contents.reason" $ UnexpectedValue json
    else
      Left $ AtKey "tag" $ UnexpectedValue json

type CreateUserResultsFailureRecord = { reason :: CreateUserResultsFailureReason }

data CreateUserResults = CreateUserResultsSuccess | CreateUserResultsFailure CreateUserResultsFailureRecord

instance EncodeJson CreateUserResults where
  encodeJson CreateUserResultsSuccess = encodeJson { tag: "CreateUserResultsSuccess" }
  encodeJson (CreateUserResultsFailure reason) = encodeJson { tag: "CreateUserResultsFailure", contents: { reason } }

instance DecodeJson CreateUserResults where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    case tag of
      "CreateUserResultsSuccess" -> Right CreateUserResultsSuccess
      "CreateUserResultsFailure" -> do
        reason <- obj .: "contents" :: _ { reason :: CreateUserResultsFailureReason }
        Right $ CreateUserResultsFailure reason
      _ -> Left $ AtKey "tag" $ UnexpectedValue json

newtype CreateUserResponse = CreateUserResponse CreateUserResults

instance EncodeJson CreateUserResponse where
  encodeJson (CreateUserResponse results) = encodeJson { tag: "CreateUserResponse", contents: results }

instance DecodeJson CreateUserResponse where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "CreateUserResponse" then do
      results <- obj .: "contents" :: _ CreateUserResults
      Right $ CreateUserResponse results
    else
      Left $ AtKey "tag" $ UnexpectedValue json
