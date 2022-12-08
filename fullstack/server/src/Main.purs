module Main where

import Prelude

import Data.Array ((!!))
import Data.Maybe (fromMaybe)
import Effect (Effect)
import Effect.Class.Console (log)
import HTTPure (Method(..), ServerM)
import HTTPure as HTTPure
import HTTPure.Lookup ((!@))
import HTTPure.Request (Request)
import HTTPure.Response (ResponseM)
import Test (test)

postRouter :: Request -> ResponseM
postRouter { path }
  | path !@ 0 == "this" = HTTPure.ok $ fromMaybe "missing path[1]" $ path !! 1
  | path !@ 0 == "that" = HTTPure.ok $ fromMaybe "missing path[2]" $ path !! 2
  | otherwise = HTTPure.notFound

router :: Request -> ResponseM
router { path: [ "goodbye" ] } = HTTPure.ok "Goodbye"
router request@{ method }
  | method == Get = HTTPure.methodNotAllowed
  | method == Post = postRouter request
router _ = HTTPure.notFound

port :: Int
port = 3000

-- main :: ServerM
-- main = HTTPure.serve port router $ log $ "Server up and runnig on port " <> show port

main :: Effect Unit
main = test