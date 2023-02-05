module Env where

-- import Prelude

import Data.Maybe (Maybe)
import Data.LoggedOnUser (LoggedOnUser)
import Effect.Ref (Ref)

type Env =
  { userRef :: Ref (Maybe LoggedOnUser)
  }