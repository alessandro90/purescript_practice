module Handler.Api.CreateUser where

import Prelude

import Control.Monad.Except (runExceptT, throwError, withExceptT)
import Control.Monad.Reader.Class (ask)
import Control.Monad.Trans.Class (lift)
import Crypto (passwordHashHex)
import Data.Api.CreateUser (CreateUserRequest(..), CreateUserResponse(..), CreateUserResults(..), CreateUserResultsFailureReason(..))
import Data.Argonaut (encodeJson, stringify)
import Data.Either (either, note)
import Entity.Account (Account(..))
import Entity.Session (Session(..))
import HTTPure as HTTPure
import Handler.Account as HA
import Handler.Api.Common (handleApi)
import Handler.Class.ApiHandler (class ApiHandler, Handler)
import Manager.Account as MA
import Manager.Session (verifySession)
import Record as Record
import Type.Proxy (Proxy(..))
import Utils (liftSuccess)

data CreateUser = CreateUser

ok :: CreateUserResults → Handler
ok = HTTPure.ok <<< stringify <<< encodeJson <<< CreateUserResponse

handler :: CreateUserRequest -> Handler
handler (CreateUserRequest { authToken, user: user' }) = do
  { sessionsAVar, accountsAVar } <- ask
  result <- lift $ runExceptT do
    Session { userName } <- verifySession sessionsAVar authToken <#> note NotAuthenticated # liftSuccess
    Account { admin } <- MA.findAccount accountsAVar userName <#> note NotAuthorized # liftSuccess
    unless admin $ throwError NotAuthorized
    passwordHash <- lift $ passwordHashHex user'.userName user'.password
    let
      user = Record.delete (Proxy :: _ "password") user'
      account = Account $ Record.insert (Proxy :: _ "passwordHash") passwordHash user
    MA.createAccount accountsAVar account # liftSuccess # (withExceptT $ const AlreadyExists)
    HA.createAccount account # liftSuccess # (withExceptT \(HA.CreateAccountFileError err) -> FileIOError err)
  ok $ result # either
    (\reason -> CreateUserResultsFailure { reason })
    (const $ CreateUserResultsSuccess)

instance ApiHandler CreateUser where
  handle _ = handleApi handler
