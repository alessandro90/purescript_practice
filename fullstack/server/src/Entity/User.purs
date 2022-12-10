module Entity.User where

import Prelude

import Data.Argonaut (class DecodeJson, class EncodeJson, JsonDecodeError(..), encodeJson, (.:))
import Data.Argonaut.Decode.Decoders (decodeJObject)
import Data.Either (Either(..))

type UserRow r =
  ( userName :: String
  , temporaryPassword :: Boolean
  , admin :: Boolean
  , firstName :: String
  , lastName :: String
  | r
  )

newtype User = User { | UserRow () }

instance EncodeJson User where
  encodeJson (User userData) = encodeJson { tag: "User", contents: userData }

instance DecodeJson User where
  decodeJson json = do
    obj <- decodeJObject json
    tag <- obj .: "tag"
    if tag == "User" then do
      contents <- obj .: "contents"
      Right $ User contents
    else
      Left $ AtKey "tag" $ UnexpectedValue json
