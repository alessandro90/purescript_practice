module Handler.Api.Logon where

import Prelude

import Data.Api.Logon (LogonRequest)
import Data.Argonaut (decodeJson)
import HTTPure (ResponseM)
import HTTPure as HTTPure
import Handler.Class.ApiHandler (class ApiHandler)

data Logon = Logon

handler :: LogonRequest -> ResponseM
handler _ = HTTPure.notFound

instance ApiHandler Logon where
  handle json _ = do
    request <- decodeJson json :: _ LogonRequest
    pure $ handler request