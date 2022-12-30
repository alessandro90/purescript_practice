module Handler.Account where

import Prelude

import Data.Array (intercalate)
import Data.Bifunctor (lmap)
import Data.Either (Either(..))
import Data.Newtype (unwrap)
import Data.String.Utils (lines)
import Data.Traversable (sequence)
import Effect.Aff (Aff, try)
import Effect.Class (liftEffect)
import Entity.Account (Account(..))
import Node.Encoding (Encoding(..))
import Node.FS.Aff (appendTextFile, readTextFile, writeTextFile)
import Node.FS.Sync (exists)
import Parser.Account (accountParser)
import Parsing (ParseError, runParserT)

accountsFile :: String
accountsFile = "accounts.csv"

bootstrapAccount :: String
bootstrapAccount = "admin,placeholder,true,true,Joe,Admin"

writeBootstrapAccount :: Aff Unit
writeBootstrapAccount = writeTextFile ASCII accountsFile bootstrapAccount

loadAccounts :: Aff (Either ParseError (Array Account))
loadAccounts = do
  fileExists <- try $ liftEffect $ exists accountsFile
  case fileExists of
    Left _ -> writeBootstrapAccount
    Right itExists -> when (not itExists) $ writeBootstrapAccount
  accountLines <- lines <$> readTextFile ASCII accountsFile
  pure $ sequence $ unwrap <<< flip runParserT accountParser <$> accountLines

accountToCSV :: Account -> String
accountToCSV
  ( Account
      { userName
      , temporaryPassword
      , admin
      , firstName
      , lastName
      , passwordHash
      }
  ) = intercalate "," [ userName, show temporaryPassword, show admin, firstName, lastName, passwordHash ]

createAccount :: Account -> Aff (Either String Unit)
createAccount account = lmap show <$> (try $ appendTextFile ASCII accountsFile $ accountToCSV account)
