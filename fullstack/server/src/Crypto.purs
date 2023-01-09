module Crypto where

import Prelude

import Data.Array (foldl)
import Data.Char (toCharCode)
import Data.String (length)
import Data.String.CodeUnits (fromCharArray, toCharArray)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Node.Buffer as Buffer
import Node.Crypto.Hash as Hash
import Node.Encoding (Encoding(..))
import Random.LCG (Seed, mkSeed)
import Test.QuickCheck (arbitrary)
import Test.QuickCheck.Gen (sample)

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
