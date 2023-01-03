module Manager.Account where

import Prelude

import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Aff (Aff)
import Effect.Aff.AVar (AVar)
import Effect.Aff.AVar as AVar
import Entity.Account (Account(..))
import Handler.Account (passwordHashHex)

type Accounts = Map String Account

startup :: Array Account -> Aff (AVar Accounts)
startup accounts =
  let
    foldable = accounts <#> \account@(Account { userName }) -> Tuple userName account
  in
    AVar.new $ Map.fromFoldable foldable

shutdown :: AVar Accounts -> Aff Unit
shutdown = void <<< AVar.take

verifyLogon :: AVar Accounts -> String -> String -> Aff (Maybe Account)
verifyLogon accountsAVar userName password = do
  accounts <- AVar.read accountsAVar
  hash <- passwordHashHex userName password
  pure $ Map.lookup userName accounts >>= \(account@(Account { passwordHash })) ->
    if passwordHash == hash then Just account else Nothing
