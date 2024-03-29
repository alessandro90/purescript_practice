module Data.Route where

import Prelude hiding ((/))

import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Routing.Duplex (RouteDuplex', optional, path, root, segment)
import Routing.Duplex.Generic (noArgs, sum)
import Routing.Duplex.Generic.Syntax ((/))

data Route
  = Logon
  | Logoff
  | Users (Maybe String)
  | ChangePassword

derive instance Generic Route _
derive instance Eq Route

routeCodec :: RouteDuplex' Route
routeCodec = root $ sum
  { "Logon": path "logon" noArgs
  , "Logoff": path "logoff" noArgs
  , "Users": "users" / (optional segment)
  , "ChangePassword": path "change-passowrd" noArgs
  }

-- userId :: RouteDuplex' String -> RouteDuplex' UserId
-- userId = as printer parser
--   where
--   printer (UserId uuid) = UUID.toString uuid
--   parser = (map UserId <<< UUID.parseUUID) >>> note "Invalid user UUID"