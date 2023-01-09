module Handler.Account where

import Prelude

import Crypto (passwordHashHex)
import Data.Array (intercalate)
import Data.Either (Either(..), either)
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

bootstrapAccount :: Aff String
bootstrapAccount = do
  let userName = "admin"
  let password = "admin"
  passwordHash <- passwordHashHex userName password
  pure $ accountToCSV $ Account
    { userName
    , temporaryPassword: true
    , admin: true
    , firstName: "Joe"
    , lastName: "Admin"
    , passwordHash
    }

writeBootstrapAccount :: Aff Unit
writeBootstrapAccount = bootstrapAccount >>= writeTextFile ASCII accountsFile

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

data CreateAccountError = CreateAccountFileError String

createAccount :: Account -> Aff (Either CreateAccountError Unit)
createAccount account =
  either (Left <<< CreateAccountFileError <<< show) (const Right unit)
    <$> (try $ appendTextFile ASCII accountsFile $ accountToCSV account)
