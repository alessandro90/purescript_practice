module Handler.Api.QueryUsers where

import Prelude

import Control.Monad.Except (runExceptT, throwError)
import Control.Monad.Reader (ask, lift)
import Data.Api.QueryUsers (QueryUsersFailureReason(..), QueryUsersRequest(..), QueryUsersResponse(..), QueryUsersResults(..))
import Data.Argonaut (encodeJson, stringify)
import Data.Either (either, note)
import Entity.Account (Account(..))
import Entity.Session (Session(..))
import Entity.User (User(..))
import HTTPure as HTTPure
import Handler.Api.Common (handleApi)
import Handler.Class.ApiHandler (class ApiHandler, Handler)
import Manager.Account as MA
import Manager.Session (verifySession)
import Record as Record
import Type.Proxy (Proxy(..))
import Utils (liftSuccess)

data QueryUsers = QueryUsers

handler :: QueryUsersRequest -> Handler
handler (QueryUsersRequest { authToken }) = do
  { sessionsAVar, accountsAVar } <- ask
  result <- lift $ runExceptT do
    Session { userName } <- verifySession sessionsAVar authToken <#> note NotAuthenticated # liftSuccess
    Account { admin } <- MA.findAccount accountsAVar userName <#> note NotAuthorized # liftSuccess
    unless admin $ throwError NotAuthorized
    accounts <- lift $ MA.getAccounts accountsAVar
    pure $ accounts <#> \(Account account) -> User $ Record.delete (Proxy :: _ "passwordHash") account
  HTTPure.ok $ stringify $ encodeJson $ QueryUsersResponse $
    either (\reason -> QueryUsersResultsFailure { reason }) (\users -> QueryUsersResultsSuccess { users }) result

instance ApiHandler QueryUsers where
  handle _ = handleApi handler