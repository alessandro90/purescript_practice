module Capability.LogonRoute where

import Prelude

import Halogen (HalogenM, lift)

data PasswordType = PasswordPermanent | PasswordTemporary

class Monad m <= LogonRoute m route | m -> route where
  logonRoute :: PasswordType -> m route

instance LogonRoute m route => LogonRoute (HalogenM state action slots output m) route where
  logonRoute = lift <<< logonRoute