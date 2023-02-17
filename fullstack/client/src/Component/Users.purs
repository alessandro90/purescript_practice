module Component.Users where

import Prelude

import Capability.Navigate (class Navigate)
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Api.QueryUsers (QueryUsersRequest(..), QueryUsersResponse(..), QueryUsersResults(..))
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), maybe)
import Data.Route (Route)
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Entity.User (User)
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Utils (apiCall)
import Web.HTML (window)
import Web.HTML.Window (alert)

type Input = Unit

type Output = Void

type State =
  { authorized :: Boolean
  , selectedUser :: Maybe User
  , users :: Array User
  }

data Action = Initialize

type Query :: ∀ k. k -> Type
type Query = Const Void

type Slots :: ∀ k. Row k
type Slots = ()

component
  :: ∀ m
   . MonadAff m
  => MonadAsk Env m
  => Navigate m Route
  => H.Component Query Input Output m
component = H.mkComponent
  { initialState: const
      { authorized: false
      , selectedUser: Nothing
      , users: []
      }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction Initialize = do
    { userRef } <- ask
    loggedOnUser' <- H.liftEffect $ Ref.read userRef
    loggedOnUser' # maybe (pure unit) \{ authToken, admin } ->
      when admin do
        queryResponse <- apiCall $ QueryUsersRequest { authToken }
        case queryResponse of
          Left err -> alertError err
          Right (QueryUsersResponse (QueryUsersResultsFailure { reason })) ->
            alertError $ "Query Users: " <> show reason
          Right (QueryUsersResponse (QueryUsersResultsSuccess { users })) ->
            H.modify_ _ { authorized = true, users = users }
    where
    alertError :: String -> H.HalogenM State Action Slots Output m Unit
    alertError msg = H.liftEffect $ window >>= alert msg

  render :: State -> H.ComponentHTML Action Slots m
  render _ = HH.text ""
