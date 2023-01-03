module Handler.Api.Logon where

import Prelude

import Control.Monad.Reader.Class (ask)
import Control.Monad.Trans.Class (lift)
import Data.Api.Logon (LogonRequest(..), LogonResponse(..), LogonResults(..))
import Data.Argonaut (decodeJson, encodeJson, stringify)
import Data.Maybe (Maybe(..))
import Data.UUID (emptyUUID)
import Entity.Account (Account(..))
import HTTPure as HTTPure
import Handler.Class.ApiHandler (class ApiHandler, Handler)
import Manager.Account (verifyLogon)

data Logon = Logon

handler :: LogonRequest -> Handler
handler (LogonRequest { userName, password }) = do
  { accountsAVar } <- ask
  account <- lift $ verifyLogon accountsAVar userName password
  HTTPure.ok $ stringify $ encodeJson $ case account of
    Nothing -> LogonResponse LogonResultsFailure
    Just (Account { temporaryPassword }) -> LogonResponse $ LogonResultsSuccess
      { authToken: emptyUUID
      , mustChangePassword: temporaryPassword
      }

instance ApiHandler Logon where
  handle json _ = do
    request <- decodeJson json :: _ LogonRequest
    pure $ handler request
