module Manager.Account where

import Prelude

import Crypto (passwordHashHex)
import Data.Array (fromFoldable)
import Data.Either (Either(..))
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect.Aff (Aff)
import Effect.Aff.AVar (AVar)
import Effect.Aff.AVar as AVar
import Entity.Account (Account(..))
import Utils (withAVar)

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

data CreateAccountError = CreateAccountAlreadyExists

createAccount :: AVar Accounts -> Account -> Aff (Either CreateAccountError Unit)
createAccount accountsAVar account@(Account { userName }) = do
  withAVar accountsAVar \accounts -> pure $
    if Map.member userName accounts then
      Tuple accounts $ Left CreateAccountAlreadyExists
    else
      Tuple (Map.insert userName account accounts) $ Right unit

findAccount :: AVar Accounts -> String -> Aff (Maybe Account)
findAccount accountsAVar userName = AVar.read accountsAVar >>= pure <<< Map.lookup userName

getAccounts :: AVar Accounts -> Aff (Array Account)
getAccounts accountsAVar = AVar.read accountsAVar >>= pure <<< fromFoldable <<< Map.values