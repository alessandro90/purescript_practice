module Component.Users where

import Prelude

import AppTheme (paperColor, selectedColor)
import CSS (alignItems, backgroundColor, black, color, column, cursor, display, flex, flexBasis, flexDirection, flexGrow, flexStart, justifyContent, minWidth, padding, paddingBottom, paddingRight, pct, rem, row, white)
import CSS.Cursor (pointer)
import Capability.Navigate (class Navigate, navigate)
import Component.Message as Message
import Component.Modal as Modal
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Api.QueryUsers (QueryUsersRequest(..), QueryUsersResponse(..), QueryUsersResults(..))
import Data.Array (fromFoldable)
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Foldable (foldl)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (unwrap)
import Data.Route (Route)
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Entity.User (User(..))
import Env (Env)
import Halogen (ClassName(..))
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Utils (apiCall)

type Input = Maybe String

type Output = Void

type State =
  { authorized :: Boolean
  , selectedUser :: Maybe User
  , users :: Map String User
  , initUserName :: Maybe String
  , errorMessage :: Maybe String
  }

data Action
  = Initialize
  | UserSelected User
  | SelectedUserName (Maybe String)
  | Modal (Modal.Output Message.Output)

type Query :: ∀ k. k -> Type
type Query = Const Void

type Slots = (modal :: H.Slot Message.Query (Modal.Output Message.Output) Unit)

_modal = Proxy :: Proxy "modal"

component
  :: ∀ m
   . MonadAff m
  => MonadAsk Env m
  => Navigate m Route
  => H.Component Query Input Output m
component = H.mkComponent
  { initialState:
      { authorized: false
      , selectedUser: Nothing
      , users: Map.empty
      , initUserName: _
      , errorMessage: Nothing
      }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      , receive = Just <<< SelectedUserName
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction = case _ of
    Initialize -> do
      { userRef } <- ask
      loggedOnUser' <- H.liftEffect $ Ref.read userRef
      loggedOnUser' # maybe (pure unit) \{ authToken, admin } ->
        when admin do
          queryResponse <- apiCall $ QueryUsersRequest { authToken }
          case queryResponse of
            Left err -> H.modify_ _ { errorMessage = Just err }
            Right (QueryUsersResponse (QueryUsersResultsFailure { reason })) ->
              H.modify_ _ { errorMessage = Just $ "Query Users: " <> show reason }
            Right (QueryUsersResponse (QueryUsersResultsSuccess { users })) -> do
              let
                mkMap f = foldl (\m r -> Map.insert (f r) r m) Map.empty
                usersMap = mkMap (_.userName <<< unwrap) users
              { initUserName } <- H.get
              H.modify_ _
                { authorized = true
                , users = usersMap
                , selectedUser = initUserName >>= flip Map.lookup usersMap
                }
    UserSelected (User { userName }) -> navigate $ Route.Users $ Just userName
    SelectedUserName userName' -> do
      { users } <- H.get
      H.modify_ _ { selectedUser = userName' >>= flip Map.lookup users }
    Modal output -> case output of
      Modal.Affirmative -> H.modify_ _ { errorMessage = Nothing }
      Modal.Negative -> H.modify_ _ { errorMessage = Nothing }
      Modal.InnerOutput _ -> pure unit

  render :: State -> H.ComponentHTML Action Slots m
  render { authorized, users, selectedUser, errorMessage } =
    if not authorized then HH.text "Not Authorized"
    else
      HH.div
        [ HC.style do
            display flex
            flexDirection row
            flexGrow 1.0
        ]
        [ HH.div
            [ HC.style do
                display flex
                flexDirection column
                minWidth (rem 20.0)
                paddingRight (rem 2.0)
            ]
            [ HH.ul_
                ( Map.values users # fromFoldable <#> \user@(User { userName }) ->
                    let
                      isSelected = Just user == selectedUser
                    in
                      HH.li
                        [ HP.class_ $ ClassName "list-group-item"
                        , HC.style do
                            backgroundColor
                              if isSelected then selectedColor else paperColor
                            color
                              if isSelected then white else black
                            cursor pointer
                        , HE.onClick $ const $ UserSelected user
                        ]
                        [ HH.text userName ]
                )
            ]
        , selectedUser # maybe (HH.text "") \(User user) ->
            let
              item h = HH.div [ HC.style $ paddingBottom (rem 0.5) ] [ h ]
            in
              HH.div
                [ HC.style do
                    display flex
                    flexDirection row
                    flexBasis (pct 100.0)
                    backgroundColor paperColor
                    padding (rem 2.0) (rem 2.0) (rem 2.0) (rem 2.0)
                ]
                [ HH.div
                    [ HC.style do
                        display flex
                        flexDirection column
                        justifyContent flexStart
                        alignItems flexStart
                        minWidth (rem 10.0)
                    ]
                    [ item $ HH.text "User Name:"
                    , item $ HH.text "Name:"
                    , item $ HH.text "Administrator:"
                    ]
                , HH.div
                    [ HC.style do
                        display flex
                        flexDirection column
                        justifyContent flexStart
                        alignItems flexStart
                    ]
                    [ item $ HH.text user.userName
                    , item $ HH.text $ user.firstName <> " " <> user.lastName
                    , item $ HH.text if user.admin then "Yes" else "No"
                    ]
                ]
        , ( errorMessage # maybe (HH.text "") \message ->
              HH.slot _modal unit (Modal.component Modal.defaultConfig Message.component) message Modal
          )
        ]