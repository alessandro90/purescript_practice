module Component.Modal.CreateUser where

import Prelude

import CSS (alignSelf, display, flex, flexBasis, flexEnd, flexGrow, flexShrink, justifyContent, marginBottom, marginRight, maxHeight, padding, pct, rem)
import CSS.Common (center)
import Capability.Navigate (class Navigate, navigate)
import Component.Modal (InnerOutput(..), InnerQuery(..))
import Component.Modal as Modal
import Component.Modal.Common as ModalCommon
import Component.Modal.Message as Message
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Api.CreateUser (CreateUserRequest(..), CreateUserResponse(..), CreateUserResults(..), CreateUserResultsFailureReason(..))
import Data.Array (filter, null)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), maybe)
import Data.Route (Route)
import Data.Route as Route
import Data.String (trim)
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Entity.User (User(..))
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties (InputType(..))
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Utils (apiCall)

type Input = Unit

type Output = User

type Query = Void

data Action
  = Input (State -> State)
  | Check (State -> State)
  | Modal (Modal.Output Message.Output)
  | RouteToLogon

type Slots = (modal :: H.Slot (InnerQuery Message.Query) (Modal.Output Message.Output) Unit)

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
  => H.Component (InnerQuery Query) Input (InnerOutput Output) m
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
      , handleQuery = handleQuery
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots (InnerOutput Output) m Unit
  handleAction = case _ of
    Input f -> do
      state <- H.modify f
      H.raise if canCreate state then EnableAffirmative else DisableAffirmative
    Check f -> H.modify_ f
    Modal output -> case output of
      Modal.Affirmative -> do
        { postModalAction } <- H.get
        H.modify_ _ { errorMessage = Nothing, postModalAction = Nothing }
        maybe (pure unit) handleAction postModalAction
      Modal.Negative -> H.modify_ _ { errorMessage = Nothing }
      Modal.InnerOutput _ -> pure unit
    RouteToLogon -> navigate Route.Logon
    where
    canCreate s = [ s.userName, s.password, s.firstName, s.lastName ]
      <#> trim
      # filter (_ == "")
      # null

  handleQuery :: ∀ a. InnerQuery Query a -> H.HalogenM State Action Slots (InnerOutput Output) m (Maybe a)
  handleQuery = case _ of
    AffirmativeClicked a -> do
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
            Right (CreateUserResponse CreateUserResultsSuccess) -> do
              H.raise $ PassThroughOutput $ User
                { userName
                , admin
                , firstName
                , lastName
                , temporaryPassword: true
                }
              H.raise ParentAffirmative
      pure $ Just a
    NegativeClicked a -> do
      H.raise ParentNegative
      pure $ Just a
    _ -> pure Nothing

  render :: State -> H.ComponentHTML Action Slots m
  render { errorMessage } =
    HH.div_
      [ HH.ul_
          [ item "User Name" \s -> _ { userName = s }
          , itemPassword "Password" \s -> _ { password = s }
          , itemCheckbox "Administrator" \b -> _ { admin = b }
          , item "First Name" \s -> _ { firstName = s }
          , item "Last Name" \s -> _ { lastName = s }
          ]
      , ( errorMessage # maybe (HH.text "") \message ->
            HH.slot _modal unit
              (Modal.component ModalCommon.errorConfig Message.component)
              message
              Modal
        )
      ]
    where
    item_ labelStyle inputStyle label type_ valueInput =
      HH.li
        [ HC.style do
            display flex
            justifyContent flexEnd
            padding (rem 0.5) (rem 0.5) (rem 0.5) (rem 0.5)
        ]
        [ HH.label
            [ HC.style $
                ( do
                    alignSelf center
                    flexGrow 1.0
                    flexShrink 1.0
                    flexBasis (pct 0.0)
                    marginBottom (rem 0.0)
                ) *> labelStyle
            ]
            [ HH.text $ label <> ":" ]
        , HH.input
            ( [ valueInput
              , HC.style $
                  ( do
                      flexGrow 2.0
                      flexShrink 2.0
                      flexBasis (pct 0.0)
                      maxHeight (rem 2.0)
                      padding (rem 0.5) (rem 0.5) (rem 0.5) (rem 0.5)
                  ) *> inputStyle
              ] <> (type_ # maybe [] \t -> [ HP.type_ t ])
            )
        ]

    defItem = item_ (pure unit) (pure unit)

    item label = defItem label Nothing <<< textValueInput

    itemPassword label = defItem label (Just InputPassword) <<< textValueInput

    itemCheckbox label =
      item_
        ( do
            flexGrow 0.0
            flexBasis (pct 33.0)
        )
        ( do
            alignSelf center
            marginRight (rem 20.5)
        )
        label
        (Just InputCheckbox)
        <<< checkInput

    textValueInput :: (String -> State -> State) -> _
    textValueInput inputFunc = HE.onValueInput $ Input <<< inputFunc

    checkInput :: (Boolean -> State -> State) -> _
    checkInput inputFunc = HE.onChecked $ Check <<< inputFunc