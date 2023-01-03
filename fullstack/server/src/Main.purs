module Main where

import Prelude

import Control.Monad.Reader (runReaderT)
import Data.Argonaut (fromString)
import Data.Array (head)
import Data.Either (Either(..), hush)
import Data.Maybe (Maybe(..))
import Data.NonEmpty (oneOf, (:|))
import Data.Posix.Signal (Signal(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import HTTPure (Request, ResponseM)
import HTTPure as HTTPure
import Handler.Account (loadAccounts)
import Handler.Api.Logon (Logon)
import Handler.Class.ApiHandler (HandlerEnv, handle)
import Manager.Account (startup)
import Node.Process (onSignal)
import Type.Proxy (Proxy(..))

-- postRouter :: Request -> ResponseM
-- postRouter { path }
--   | path !@ 0 == "this" = HTTPure.ok $ fromMaybe "missing path[1]" $ path !! 1
--   | path !@ 0 == "that" = HTTPure.ok $ fromMaybe "missing path[2]" $ path !! 2
--   | otherwise = HTTPure.notFound

port :: Int
port = 3000

router :: HandlerEnv -> Request -> ResponseM
router env { body } = do
  body' <- HTTPure.toString body
  case hush =<< (head $ oneOf $ (handle (fromString body') (Proxy :: _ Logon)) :| []) of
    Nothing -> HTTPure.badRequest body'
    Just readerT -> runReaderT readerT env

main :: Effect Unit
main = launchAff_ do
  accounts' <- loadAccounts
  case accounts' of
    Left err -> log $ "Cannot load accounts: " <> show err
    Right accounts -> do
      accountsAVar <- startup accounts

      liftEffect do
        shutdown <- HTTPure.serve port (router { accountsAVar }) $ log $ "Server running on port " <> show port

        let
          shutdownServer = do
            log "Shutting down the server"
            shutdown $ log "Server shutdown"

        onSignal SIGINT shutdownServer
        onSignal SIGTERM shutdownServer
