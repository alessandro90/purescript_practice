module Handler.Account where

import Prelude

import Data.Either (Either(..))
import Data.String.Utils (lines)
import Effect.Aff (Aff, try)
import Effect.Class (liftEffect)
import Entity.Account (Account)
import Node.Encoding (Encoding(..))
import Node.FS.Aff (readTextFile, writeTextFile)
import Node.FS.Sync (exists)

accountsFile :: String
accountsFile = "accounts.csv"

bootstrapAccount :: String
bootstrapAccount = "admin,placeholder,true,true,Joe,Admin"

writeBootstrapAccount :: Aff Unit
writeBootstrapAccount = writeTextFile ASCII accountsFile bootstrapAccount

loadAccounts :: Aff (Array Account)
loadAccounts = do
  fileExists <- try $ liftEffect $ exists accountsFile
  case fileExists of
    Left _ -> writeBootstrapAccount
    Right itExists -> when (not itExists) $ writeBootstrapAccount
  accountLines <- lines <$> readTextFile ASCII accountsFile
  pure []