module Main where

import Prelude

import Control.Alt ((<|>))
import Control.Monad.Error.Class (try)
import Control.Monad.Reader (runReaderT)
import Data.Argonaut (jsonParser)
import Data.Array (intercalate, last, null, tail)
import Data.Either (Either(..), either, hush)
import Data.Foldable (class Foldable)
import Data.JSDate (getTime, now, toUTCString)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), maybe)
import Data.MediaType (MediaType)
import Data.MediaType.Common as MIME
import Data.Newtype (unwrap)
import Data.NonEmpty (NonEmpty, foldl1, (:|))
import Data.Posix.Signal (Signal(..))
import Data.String (Pattern(..), length, split, toLower)
import Data.Tuple (Tuple(..))
import Data.UUID (genUUID)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import HTTPure (Request, ResponseM)
import HTTPure as HTTPure
import Handler.Account (loadAccounts)
import Handler.Api.CreateUser (CreateUser)
import Handler.Api.Logoff (Logoff)
import Handler.Api.Logon (Logon)
import Handler.Api.QueryUsers (QueryUsers)
import Handler.Class.ApiHandler (HandlerEnv, handle)
import Manager.Account as AccountManager
import Manager.Session as SessionManager
import Node.Encoding (Encoding(..))
import Node.FS.Aff (readTextFile)
import Node.Process (onSignal)
import Record as Record
import Type.Proxy (Proxy(..))

port :: Int
port = 3000

staticRoot :: String
staticRoot = "../client/dist"

staticFiles :: Request -> ResponseM
staticFiles { path } =
  let
    fileName =
      if null path then "index.html"
      else intercalate "/" path
  in
    mimeType fileName # maybe HTTPure.forbidden \mime -> do
      fileData' <- try $ readTextFile ASCII $ staticRoot <> "/" <> fileName
      fileData' # either (const HTTPure.notFound) \fileData ->
        let
          headers = HTTPure.headers
            [ Tuple "Content-Length" (show $ length fileData)
            , Tuple "Content-Type" $ unwrap mime
            ]
        in
          HTTPure.ok' headers fileData

mimeTypes :: Map String MediaType
mimeTypes = Map.fromFoldable
  [ Tuple "js" MIME.applicationJavascript
  , Tuple "html" MIME.textHTML
  , Tuple "jpg" MIME.imageJPEG
  , Tuple "png" MIME.imagePNG
  ]

mimeType :: String -> Maybe MediaType
mimeType fname = toLower <$> (last <=< tail $ split (Pattern ".") fname) >>= flip Map.lookup mimeTypes

oneOf :: ∀ a e f. Foldable f => NonEmpty f (Either e a) -> Either e a
oneOf x = foldl1 (<|>) x

router :: HandlerEnv -> Request -> ResponseM
router env req@{ method, body }
  | method == HTTPure.Post =
      do
        body' <- HTTPure.toString body
        either HTTPure.badRequest (reqHandler body') $ jsonParser body'
      where
      handlers json =
        (handle (Proxy :: _ Logon)) :|
          [ handle (Proxy :: _ Logoff)
          , handle (Proxy :: _ CreateUser)
          , handle (Proxy :: _ QueryUsers)
          ] <#> (_ $ json)
      reqHandler b json = case hush $ oneOf $ handlers json of
        Nothing -> HTTPure.badRequest b
        Just readerT -> runReaderT readerT env
  | method == HTTPure.Get = staticFiles req
  | otherwise = HTTPure.methodNotAllowed

loggingRouter :: HandlerEnv -> Request -> ResponseM
loggingRouter env req@{ method, body } = do
  id <- liftEffect $ show <$> genUUID
  let idStr = "(id: " <> id <> ")"
  body' <- HTTPure.toString body
  start <- liftEffect now
  log $ ts start <> " Method: " <> show method <> " Body: " <> show body' <> idStr
  res <- router env req
  end <- liftEffect now
  let duration = " [" <> show (getTime end - getTime start) <> "ms]"
  log $ ts end <> " Response: "
    <> show (Record.delete (Proxy :: _ "writeBody") res)
    <> duration
    <> idStr
  pure res
  where
  ts dt = "[" <> toUTCString dt <> "]"

main :: Effect Unit
main = launchAff_ do
  accounts' <- loadAccounts
  case accounts' of
    Left err -> log $ "Cannot load accounts: " <> show err
    Right accounts -> do
      accountsAVar <- AccountManager.startup accounts
      sessionsAVar <- SessionManager.startup
      liftEffect do
        shutdown <- HTTPure.serve port (loggingRouter { accountsAVar, sessionsAVar }) $ log $ "Server running on port " <> show port

        let
          shutdownServer = launchAff_ do
            log "Shutting down the server"
            SessionManager.shutdown sessionsAVar
            AccountManager.shutdown accountsAVar
            liftEffect $ shutdown $ log "Server shutdown"

        onSignal SIGINT shutdownServer
        onSignal SIGTERM shutdownServer
