module Manager.Session where

import Prelude

import Data.JSDate (getTime, now)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Data.UUID (UUID, genUUID)
import Effect.Aff (Aff)
import Effect.Aff.AVar (AVar)
import Effect.Aff.AVar as AVar
import Effect.Class (liftEffect)
import Entity.Session (Session(..))

type Sessions = Map UUID Session

sinceEpoch :: Aff Number
sinceEpoch = getTime <$> liftEffect now

startup :: Aff (AVar Sessions)
startup = AVar.new Map.empty

shutdown :: AVar Sessions -> Aff Unit
shutdown = void <<< AVar.take

verifySession :: AVar Sessions -> UUID -> Aff (Maybe Session)
verifySession sessionsAVar authToken = do
  expireSessions sessionsAVar
  sessions <- AVar.take sessionsAVar
  lastTime <- sinceEpoch
  let
    Tuple newSessions newSession = case Map.lookup authToken sessions of
      Nothing -> Tuple sessions Nothing
      Just (Session session) ->
        let
          newSession' = Just $ Session $ session { lastTime = lastTime }
          newSessions' = Map.update (const newSession') authToken sessions
        in
          Tuple newSessions' newSession'
  AVar.put newSessions sessionsAVar
  pure newSession

createSession :: AVar Sessions -> String -> Aff UUID
createSession sessionsAVar userName = do
  lastTime <- sinceEpoch
  sessions <- AVar.take sessionsAVar
  authToken <- liftEffect genUUID
  flip AVar.put sessionsAVar $ Map.insert authToken (Session { authToken, userName, lastTime }) sessions
  pure authToken

sessionTimeout :: Number
sessionTimeout = 4.0 * 60.0 * 60.0 * 1000.0

expireSessions :: AVar Sessions -> Aff Unit
expireSessions sessionsAVar = do
  sessions <- AVar.take sessionsAVar
  elapsedTime <- sinceEpoch
  let newSessions = Map.filter (\(Session { lastTime }) -> elapsedTime - lastTime < sessionTimeout) sessions
  AVar.put newSessions sessionsAVar

deleteSession :: AVar Sessions -> UUID -> Aff Unit
deleteSession sessionsAVar authToken = do
  sessions <- AVar.take sessionsAVar
  let newSessions = Map.delete authToken sessions
  AVar.put newSessions sessionsAVar