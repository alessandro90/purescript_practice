module Api.QueryUsers where

import Prelude

import Data.Argonaut (class DecodeJson, class EncodeJson, JsonDecodeError(..), encodeJson, (.:))
import Data.Argonaut.Decode.Decoders (decodeJObject)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.UUID (UUID, parseUUID, toString)
import Entity.User (User)

newtype QueryUsersRequest = QueryUsersRequest { authToken :: UUID }

instance EncodeJson QueryUsersRequest where
  encodeJson (QueryUsersRequest { authToken }) = encodeJson
    { tag: "QueryUsersRequest"
    , contents: { authToken: toString authToken }
    }

instance DecodeJson QueryUsersRequest where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "QueryUsersRequest" then do
      { authToken } <- obj .: "contents" :: _ { authToken :: String }
      case parseUUID authToken of
        Nothing -> Left $ AtKey "authToken" $ UnexpectedValue json
        Just tok -> Right $ QueryUsersRequest { authToken: tok }
    else
      Left $ AtKey "tag" $ UnexpectedValue json

data QueryUsersFailureReason = NotAuthorized | NotAuthenticated

instance EncodeJson QueryUsersFailureReason where
  encodeJson NotAuthorized = encodeJson
    { tag: "QueryUsersFailureReason"
    , contents: { reason: "NotAuthorized" }
    }
  encodeJson NotAuthenticated = encodeJson
    { tag: "QueryUsersFailureReason"
    , contents: { reason: "NotAuthenticated" }
    }

instance DecodeJson QueryUsersFailureReason where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "QueryUsersFailureReason" then do
      { reason } <- obj .: "contents" :: _ { reason :: String }
      case reason of
        "NotAuthorized" -> Right NotAuthorized
        "NotAuthenticated" -> Right NotAuthenticated
        _ -> Left $ AtKey "contents.reason" $ UnexpectedValue json
    else
      Left $ AtKey "tag" $ UnexpectedValue json

type FailureReasonRecord = { reason :: QueryUsersFailureReason }
type UserArray = { users :: Array User }

data QueryUsersResults
  = QueryUsersResultsFailure FailureReasonRecord
  | QueryUsersResultsSuccess UserArray

instance EncodeJson QueryUsersResults where
  encodeJson (QueryUsersResultsFailure reason) = encodeJson
    { tag: "QueryUsersResultsFailure"
    , contents: reason
    }
  encodeJson (QueryUsersResultsSuccess users) = encodeJson
    { tag: "QueryUsersResultsSuccess"
    , contents: users
    }

instance DecodeJson QueryUsersResults where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    case tag of
      "QueryUsersResultsFailure" -> do
        { reason } <- obj .: "contents" :: _ FailureReasonRecord
        Right $ QueryUsersResultsFailure { reason }
      "QueryUsersResultsSuccess" -> do
        { users } <- obj .: "contents" :: _ UserArray
        Right $ QueryUsersResultsSuccess { users }
      _ -> Left $ AtKey "tag" $ UnexpectedValue json

newtype QueryUsersResponse = QueryUsersResponse QueryUsersResults

instance EncodeJson QueryUsersResponse where
  encodeJson (QueryUsersResponse queryResults) = encodeJson
    { tag: "QueryUsersResponse"
    , contents: queryResults
    }

instance DecodeJson QueryUsersResponse where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "QueryUsersResponse" then do
      userResults <- obj .: "contents" :: _ QueryUsersResults
      Right $ QueryUsersResponse userResults
    else
      Left $ AtKey "tag" $ UnexpectedValue json
