module Component.Router where

import Prelude

import CSS (white, color)
import Capability.Log (class Log)
import Capability.LogonRoute (class LogonRoute)
import Capability.Navigate (class Navigate, navigate)
import Component.ChangePassword as ChangePassword
import Component.Logon as Logon
import Component.Page as Page
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Const (Const)
import Data.Maybe (Maybe(..), isNothing)
import Data.Route (Route(..))
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Type.Proxy (Proxy(..))

type Input = Unit
type Output = Void
type State = { route :: Route }
type Action = Void
data Query a = Navigate Route a
type PageSlot = H.Slot (Const Void) Void Unit
type Slots =
  ( logon :: PageSlot
  , logoff :: PageSlot
  , users :: PageSlot
  , changePassword :: PageSlot
  )

_logon = Proxy :: Proxy "logon"
_logoff = Proxy :: Proxy "logoff"
_users = Proxy :: Proxy "users"
_changePassword = Proxy :: Proxy "changePassword"

component
  :: ∀ m
   . MonadAff m
  => Navigate m Route
  => MonadAsk Env m
  => LogonRoute m Route
  => Log m
  => H.Component Query Input Output m
component = H.mkComponent
  { initialState: const { route: Logon }
  , render
  , eval: H.mkEval H.defaultEval
      { handleQuery = handleQuery
      }
  }
  where
  render :: State -> H.ComponentHTML Action Slots m
  render { route } = case route of
    Logon -> HH.slot _logon unit (Page.component Logon.component) unit absurd -- Or use HH.slot_
    Logoff -> HH.span [ HC.style $ color white ] [ HH.text "Logoff" ]
    Users _ -> HH.span [ HC.style $ color white ] [ HH.text "Users" ]
    ChangePassword -> HH.slot_ _changePassword unit (Page.component ChangePassword.component) unit

  handleQuery :: ∀ a. Query a -> H.HalogenM State Action Slots Output m (Maybe a)
  handleQuery = case _ of
    Navigate route a -> do
      { userRef } <- ask
      ref <- H.liftEffect $ Ref.read userRef
      if isNothing ref then navigate Logon
      else H.modify_ _ { route = route }
      pure $ Just a