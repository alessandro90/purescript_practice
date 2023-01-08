module Handler.Api.Logoff where

import Prelude

import Control.Monad.Reader (ask)
import Control.Monad.Trans.Class (lift)
import Data.Api.Logoff (LogoffRequest(..), LogoffResponse(..))
import Data.Argonaut (encodeJson, stringify)
import Data.Maybe (Maybe(..))
import HTTPure as HTTPure
import Handler.Api.Common (handleApi)
import Handler.Class.ApiHandler (class ApiHandler, Handler)
import Manager.Session (deleteSession, verifySession)

data Logoff = Logoff

handler :: LogoffRequest -> Handler
handler (LogoffRequest { authToken }) = do
  { sessionsAVar } <- ask
  session <- lift $ verifySession sessionsAVar authToken
  response <- case session of
    Nothing -> pure $ LogoffResponseFailure
    Just _ -> do
      lift $ deleteSession sessionsAVar authToken
      pure $ LogoffResponseSuccess
  HTTPure.ok $ stringify $ encodeJson $ response

instance ApiHandler Logoff where
  handle _ = handleApi handler
