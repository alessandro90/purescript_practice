module Component.Logoff where

import Prelude

import AppTheme (themeColor, themeFont)
import CSS.Background (backgroundColor)
import CSS.Color (white)
import CSS.Common (center)
import CSS.Cursor (cursor, pointer)
import CSS.Display (display, flex)
import CSS.Flexbox (alignItems, column, flexDirection, justifyContent, row)
import CSS.Font (FontWeight(..), color, fontSize, fontWeight)
import CSS.Geometry (height, paddingBottom, paddingTop, width)
import CSS.Property (value)
import CSS.Size (rem, vw)
import Capability.Navigate (class Navigate, navigate)
import Component.Modal as Modal
import Component.Modal.Common as ModalCommon
import Component.Modal.Message as Message
import Control.Monad.Reader (class MonadAsk, ask)
import Data.Api.Logoff (LogoffRequest(..), LogoffResponse(..))
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), maybe)
import Data.Route (Route)
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Type.Proxy (Proxy(..))
import Utils (apiCall)

type State =
  { errorMessage :: Maybe String
  , loggedOff :: Boolean
  }

type Input = Unit

type Output = Void

data Action
  = Initialize
  | Click
  | Modal (Modal.Output Message.Output)

type Query :: ∀ k. k -> Type
type Query = Const Void

type Slots = (modal :: H.Slot (Modal.InnerQuery Message.Query) (Modal.Output Message.Output) Unit)

_modal = Proxy :: Proxy "modal"

component :: ∀ m. MonadAff m => MonadAsk Env m => Navigate m Route => H.Component Query Input Output m
component = H.mkComponent
  { initialState: const { errorMessage: Nothing, loggedOff: false }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction Click = navigate Route.Logon
  handleAction Initialize = do
    { userRef } <- ask
    loggedOnUser' <- H.liftEffect $ Ref.read userRef
    loggedOnUser' # maybe (pure unit) \{ authToken } -> do
      logoffResponse <- apiCall (LogoffRequest { authToken })
      case logoffResponse of
        Left err -> H.modify_ _ { errorMessage = Just err }
        Right LogoffResponseFailure -> H.modify_ _ { errorMessage = Just "Unable to logoff" }
        Right LogoffResponseSuccess -> do
          H.liftEffect $ Ref.write Nothing userRef
          H.modify_ _ { loggedOff = true }
  handleAction (Modal output) = case output of
    Modal.Affirmative -> H.modify_ _ { errorMessage = Nothing }
    Modal.Negative -> H.modify_ _ { errorMessage = Nothing }
    Modal.InnerOutput _ -> pure unit

  render :: State -> H.ComponentHTML Action Slots m
  render { errorMessage, loggedOff } =
    HH.div
      [ HC.style do
          display flex
          flexDirection column
          alignItems center
          justifyContent center
          paddingTop $ vw 0.65
      ]
      if loggedOff then
        [ HH.span
            [ HC.style do
                color white
                paddingBottom (rem 1.0)
            ]
            [ HH.text "You have been successfully logged off"
            , HH.button
                [ HC.style do
                    backgroundColor themeColor
                    themeFont
                    fontWeight $ FontWeight $ value "500"
                    fontSize $ vw 1.0
                    width (rem 20.0)
                    height $ vw 3.0
                    color white
                    cursor pointer
                , HE.onClick $ const Click
                ]
                [ HH.text "Log Back On" ]
            ]
        ]
      else [] <>
        [ ( errorMessage
              # maybe (HH.text "") \message ->
                  HH.slot
                    _modal
                    unit
                    (Modal.component ModalCommon.errorConfig Message.component)
                    message
                    Modal
          )
        ]