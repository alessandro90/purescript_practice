module Test where

import Prelude

import Api.Logon (LogonRequest(..), LogonResponse(..), LogonResults(..))
import Data.Argonaut (decodeJson, encodeJson)
import Data.Either (Either(..))
import Data.UUID (emptyUUID, toString)
import Effect (Effect)
import Effect.Class.Console (log)

testLogonRequest :: LogonRequest
testLogonRequest = LogonRequest { userName: "John", password: "1234" }

testLogonResponseSuccess :: LogonResponse
testLogonResponseSuccess = LogonResponse $ LogonResultsSuccess
  { authToken: emptyUUID
  , mustChangePassword: true
  }

testLogonResponseFailure :: LogonResponse
testLogonResponseFailure = LogonResponse LogonResultsFailure

runTestLogonRequest :: Effect Unit
runTestLogonRequest = do
  let json = encodeJson testLogonRequest
  let logonRequest = decodeJson json
  log case logonRequest of
    Right (LogonRequest { userName, password }) -> "{ userName: "
      <> userName
      <> "; password: "
      <> password
      <> " }"
    Left err -> "Error: " <> show err

runTestLogonResponse :: LogonResponse -> Effect Unit
runTestLogonResponse resp = do
  let json = encodeJson resp
  let logonResponse = decodeJson json
  log case logonResponse of
    Right (LogonResponse (LogonResultsSuccess { authToken, mustChangePassword })) ->
      "{ authToken: "
        <> (toString authToken)
        <> "; "
        <> "mustChangePassword: "
        <> (show mustChangePassword)
        <> " }"
    Right (LogonResponse LogonResultsFailure) -> "LogonResultsFailure"
    Left err -> "Error: " <> show err

test :: Effect Unit
test = do
  runTestLogonRequest
  runTestLogonResponse testLogonResponseSuccess
  runTestLogonResponse testLogonResponseFailure
