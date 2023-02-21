module Component.Modal.CreateUser where

import Prelude

import Capability.Navigate (class Navigate, navigate)
import Component.Modal (InnerOutput(..))
import Component.Modal as Modal
import Component.Modal.Message as Message
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Api.CreateUser
  ( CreateUserRequest(..)
  , CreateUserResponse(..)
  , CreateUserResults(..)
  , CreateUserResultsFailureReason(..)
  )
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), maybe)
import Data.Route (Route)
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Entity.User (User(..))
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Type.Proxy (Proxy(..))
import Utils (apiCall)

type Input = Unit

type Output = User

type Query :: ∀ k. k -> Type
type Query = Const Void

data Action
  = CreateUser
  | Input (State -> State)
  | Modal (Modal.Output Message.Output)
  | RouteToLogon

type Slots = (modal :: H.Slot Message.Query (Modal.Output Message.Output) Unit)

_modal = Proxy :: Proxy "modal"

type State =
  { userName :: String
  , password :: String
  , admin :: Boolean
  , firstName :: String
  , lastName :: String
  , errorMessage :: Maybe String
  , postModalAction :: Maybe Action
  }

component
  :: ∀ m
   . MonadAff m
  => MonadAsk Env m
  => Navigate m Route
  => H.Component Query Input (InnerOutput Output) m
component = H.mkComponent
  { initialState: const
      { userName: ""
      , password: ""
      , admin: false
      , firstName: ""
      , lastName: ""
      , errorMessage: Nothing
      , postModalAction: Nothing
      }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots (InnerOutput Output) m Unit
  handleAction = case _ of
    Input f -> H.modify_ f
    Modal output -> case output of
      Modal.Affirmative -> do
        { postModalAction } <- H.get
        H.modify_ _ { errorMessage = Nothing, postModalAction = Nothing }
        maybe (pure unit) handleAction postModalAction
      Modal.Negative -> H.modify_ _ { errorMessage = Nothing }
      Modal.InnerOutput _ -> pure unit
    RouteToLogon -> navigate Route.Logon
    CreateUser -> do
      { userRef } <- ask
      loggedOnUser' <- H.liftEffect $ Ref.read userRef
      case loggedOnUser' of
        Nothing -> H.modify_ _
          { errorMessage = Just "Session has timed out"
          , postModalAction = Just RouteToLogon
          }
        Just { authToken } -> do
          { userName, password, admin, firstName, lastName } <- H.get
          createResponse <- apiCall
            ( CreateUserRequest
                { authToken
                , user:
                    { userName
                    , password
                    , admin
                    , firstName
                    , lastName
                    , temporaryPassword: true
                    }
                }
            )
          case createResponse of
            Left err -> H.modify_ _ { errorMessage = Just err }
            Right (CreateUserResponse (CreateUserResultsFailure { reason })) -> case reason of
              NotAuthenticated ->
                H.modify_ _ { errorMessage = Just $ show reason, postModalAction = Just RouteToLogon }
              _ -> H.modify_ _ { errorMessage = Just $ show reason }
            Right (CreateUserResponse CreateUserResultsSuccess) ->
              H.raise $ PassThrough $ User
                { userName
                , admin
                , firstName
                , lastName
                , temporaryPassword: true
                }

  render :: State -> H.ComponentHTML Action Slots m
  render { userName, password, admin, firstName, lastName, errorMessage } = HH.text ""