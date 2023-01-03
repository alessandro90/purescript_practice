module Handler.Account where

import Prelude

import Data.Array (foldl, intercalate)
import Data.Bifunctor (lmap)
import Data.Char (toCharCode)
import Data.Either (Either(..))
import Data.Newtype (unwrap)
import Data.String (length)
import Data.String.CodeUnits (fromCharArray, toCharArray)
import Data.String.Utils (lines)
import Data.Traversable (sequence)
import Effect (Effect)
import Effect.Aff (Aff, try)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Entity.Account (Account(..))
import Node.Buffer as Buffer
import Node.Crypto.Hash as Hash
import Node.Encoding (Encoding(..))
import Node.FS.Aff (appendTextFile, readTextFile, writeTextFile)
import Node.FS.Sync (exists)
import Parser.Account (accountParser)
import Parsing (ParseError, runParserT)
import Random.LCG (Seed, mkSeed)
import Test.QuickCheck (arbitrary)
import Test.QuickCheck.Gen (sample)

accountsFile :: String
accountsFile = "accounts.csv"

bootstrapAccount :: Aff String
bootstrapAccount = do
  let userName = "admin"
  let password = "admin"
  passwordHash <- passwordHashHex userName password
  pure $ intercalate "," [ userName, passwordHash, trueStr, trueStr, "Joe", "Admin" ]
  where
  trueStr = "true"

writeBootstrapAccount :: Aff Unit
writeBootstrapAccount = bootstrapAccount >>= writeTextFile ASCII accountsFile

loadAccounts :: Aff (Either ParseError (Array Account))
loadAccounts = do
  fileExists <- try $ liftEffect $ exists accountsFile
  case fileExists of
    Left _ -> writeBootstrapAccount
    Right itExists -> when (not itExists) $ writeBootstrapAccount
  accountLines <- lines <$> readTextFile ASCII accountsFile
  log $ "AccountLines:\n" <> show accountLines
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

userNameSeed :: String -> Seed
userNameSeed = mkSeed <<< foldl (*) 1 <<< map toCharCode <<< toCharArray

userNameSalt :: Int -> String -> String
userNameSalt len name = fromCharArray $ sample (userNameSeed name) len arbitrary

hex :: String -> Effect String
hex s = do
  buf <- Buffer.fromString s UTF8
  Hash.createHash "sha512" >>= Hash.update buf >>= Hash.digest >>= Buffer.toString Hex

passwordHashHex :: String -> String -> Aff String
passwordHashHex userName password = liftEffect $ hex $ password <> userNameSalt (3 * length userName) userName
