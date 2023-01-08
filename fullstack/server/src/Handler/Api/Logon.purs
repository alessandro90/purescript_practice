module Handler.Api.Logon where

import Prelude

import Control.Monad.Reader.Class (ask)
import Control.Monad.Trans.Class (lift)
import Data.Api.Logon (LogonRequest(..), LogonResponse(..), LogonResults(..))
import Data.Argonaut (encodeJson, stringify)
import Data.Maybe (Maybe(..))
import Entity.Account (Account(..))
import HTTPure as HTTPure
import Handler.Api.Common (handleApi)
import Handler.Class.ApiHandler (class ApiHandler, Handler)
import Manager.Account (verifyLogon)
import Manager.Session (createSession)

data Logon = Logon

handler :: LogonRequest -> Handler
handler (LogonRequest { userName, password }) = do
  { accountsAVar, sessionsAVar } <- ask
  account <- lift $ verifyLogon accountsAVar userName password
  response <- case account of
    Nothing -> pure $ LogonResponse LogonResultsFailure
    Just (Account { temporaryPassword }) -> do
      authToken <- lift $ createSession sessionsAVar userName
      pure $ LogonResponse $ LogonResultsSuccess
        { authToken
        , mustChangePassword: temporaryPassword
        }
  HTTPure.ok $ stringify $ encodeJson $ response

instance ApiHandler Logon where
  handle _ = handleApi handler
