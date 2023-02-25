module Parser.Account where

import Prelude

import Control.Alt ((<|>))
import Data.Array (catMaybes, fromFoldable, many, some, (:))
import Data.CodePoint.Unicode (isAlpha, isAlphaNum, isLower, isUpper)
import Data.Identity (Identity)
import Data.Maybe (Maybe(..))
import Data.String (codePointFromChar)
import Data.String.CodeUnits (fromCharArray)
import Entity.Account (Account(..))
import Parsing (ParserT, fail)
import Parsing.Combinators (notFollowedBy, sepBy)
import Parsing.String (anyChar, char, satisfy, string)

type AccountParserT a = ParserT String Identity a

userName :: AccountParserT String
userName = do
  alpha <- satisfy (isAlpha <<< codePointFromChar)
  alphaNums <- many $ satisfy (isAlphaNum <<< codePointFromChar)
  pure $ fromCharArray $ alpha : alphaNums

hex :: AccountParserT String
hex = do
  chars <- fromCharArray <$> (some $ satisfy isHex)
  pure chars
  where
  isHex c = (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f')

passwordHash :: AccountParserT String
passwordHash = hex

boolean :: AccountParserT Boolean
boolean = (_ == "true") <$> ((string "true") <|> (string "false"))

temporaryPassword :: AccountParserT Boolean
temporaryPassword = boolean

admin :: AccountParserT Boolean
admin = boolean

properName :: AccountParserT String
properName = do
  firstLetter <- satisfy (isUpper <<< codePointFromChar)
  otherLetters <- many $ satisfy (isLower <<< codePointFromChar)
  pure $ fromCharArray $ firstLetter : otherLetters

firstName :: AccountParserT String
firstName = properName

lastName :: AccountParserT String
lastName = properName

accountParser :: AccountParserT Account
accountParser = do
  uname <- userName <* comma
  tpassword <- temporaryPassword <* comma
  isadmin <- admin <* comma
  fname <- firstName <* comma
  lname <- lastName <* comma
  pswd <- passwordHash
  pure $ Account
    { userName: uname
    , temporaryPassword: tpassword
    , admin: isadmin
    , firstName: fname
    , lastName: lname
    , passwordHash: pswd
    }
  where
  comma = char ','

accountsParser :: AccountParserT (Array Account)
accountsParser =
  ( (Just <$> accountParser <|> pure Nothing)
      `sepBy` char '\n' <#> catMaybes <<< fromFoldable
  ) <* (notFollowedBy anyChar <|> fail "Failed to parse complete file")