module Component.Logon where

import Prelude

import AppTheme (paperColor, themeColor, themeFont)
import CSS.Background (backgroundColor)
import CSS.Border (borderRadius)
import CSS.Box (boxShadow, bsColor, shadow)
import CSS.Color (graytone, rgba, white)
import CSS.Common (center)
import CSS.Cursor (cursor, notAllowed)
import CSS.Display (display, flex)
import CSS.Flexbox (flexDirection, column, row, flexGrow, alignItems, justifyContent)
import CSS.Font (FontWeight(..), color, fontSize, fontWeight)
import CSS.Geometry (paddingTop, paddingBottom, paddingRight, paddingLeft, width, height)
import CSS.Missing (spaceEvenly)
import CSS.Property (value)
import CSS.Size (rem, px, pct, vw)
import Capability.Log (class Log, LogLevel(..), log, logEntry)
import Capability.LogonRoute (class LogonRoute, PasswordType(..), logonRoute)
import Capability.Navigate (class Navigate, navigate)
import Component.Modal (InnerQuery)
import Component.Modal as Modal
import Component.Modal.Common as ModalCommon
import Component.Modal.Message as Message
import Control.Monad.Reader (class MonadAsk, ask)
import DOM.HTML.Indexed.InputType (InputType(..))
import Data.Api.Logon (LogonRequest(..), LogonResponse(..), LogonResults(..))
import Data.Const (Const)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), maybe)
import Data.NonEmpty ((:|))
import Data.String (trim)
import Effect.Aff.Class (class MonadAff)
import Effect.Ref as Ref
import Env (Env)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Image.BookCover (bookCover)
import Type.Proxy (Proxy(..))
import Utils (apiCall)

type Input = Unit
type Output = Void
type State =
  { userName :: String
  , password :: String
  , errorMessage :: Maybe String
  }

data Action
  = Logon
  | Input (State -> State)
  | Modal (Modal.Output Message.Output)

type Query :: ∀ k. k -> Type
type Query = Const Void

type Slots = (modal :: H.Slot (InnerQuery Message.Query) (Modal.Output Message.Output) Unit)

_modal = Proxy :: Proxy "modal"

component
  :: ∀ m route
   . MonadAff m
  => MonadAsk Env m
  => Navigate m route
  => LogonRoute m route
  => Log m
  => H.Component Query Input Output m
component = H.mkComponent
  { initialState: const { userName: "", password: "", errorMessage: Nothing }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction = case _ of
    Input f -> H.modify_ f
    Logon -> do
      { userName, password } <- H.get
      logonResponse <- apiCall $ LogonRequest { userName, password }
      case logonResponse of
        Left err -> H.modify_ _ { errorMessage = Just err }
        Right (LogonResponse LogonResultsFailure) -> H.modify_ _ { errorMessage = Just "Invalid logon crediantials" }
        Right (LogonResponse (LogonResultsSuccess { authToken, admin, mustChangePassword })) -> do
          log =<< logEntry Info "User logged on"
          { userRef } <- ask
          H.liftEffect $ Ref.write (Just { admin, authToken }) userRef
          navigate <=< logonRoute $ if mustChangePassword then PasswordTemporary else PasswordPermanent
    Modal output -> case output of
      Modal.Affirmative -> H.modify_ _ { errorMessage = Nothing }
      Modal.Negative -> H.modify_ _ { errorMessage = Nothing }
      Modal.InnerOutput _ -> pure unit

  render :: State -> H.ComponentHTML Action Slots m
  render { userName, password, errorMessage } =
    HH.div
      [ HC.style do
          display flex
          flexDirection column
          width $ vw 22.0
          height $ vw 25.0
          paddingTop $ vw 1.25
          paddingBottom $ vw 1.25
          paddingLeft $ vw 1.50
          paddingRight $ vw 1.50
          backgroundColor paperColor
          borderRadius (px 7.0) (px 7.0) (px 7.0) (px 7.0)
          boxShadow $ (rgba 0 0 24 0.75) `bsColor` shadow (px 10.0) (px 10.0) :| [ (rgba 0 0 24 0.75) `bsColor` shadow (px 10.0) (px 20.0) ]
      ]
      [ HH.div
          [ HC.style do
              paddingRight $ vw 1.0
              display flex
              flexDirection column
              alignItems center
              justifyContent center
              flexGrow 10.0
          ]
          [ HH.img
              [ HC.style do
                  width $ pct 40.0
              , HP.src bookCover
              ]
          ]
      , HH.div
          [ HC.style do
              display flex
              flexDirection column
              justifyContent spaceEvenly
              alignItems center
              flexGrow 3.0
          ]
          [ HH.div
              [ HC.style do
                  display flex
                  flexDirection row
                  alignItems center
                  justifyContent center
                  themeFont
              ]
              [ HH.label
                  [ HC.style do
                      width (rem 6.0)
                  ]
                  [ HH.text "Username: " ]
              , HH.input
                  [ HE.onValueInput $ Input <<< \s -> _ { userName = s }
                  , HC.style do
                      backgroundColor paperColor
                      width (vw 8.3)
                      paddingLeft (rem 0.5)
                      paddingRight (rem 0.5)
                      fontSize (vw 1.0)
                  ]
              ]
          , HH.div
              [ HC.style do
                  display flex
                  flexDirection row
                  alignItems center
                  justifyContent center
                  themeFont
              ]
              [ HH.label
                  [ HC.style do
                      width (rem 6.0)
                  ]
                  [ HH.text "Password: " ]
              , HH.input
                  [ HP.type_ InputPassword
                  , HE.onValueInput $ Input <<< \s -> _ { password = s }
                  , HC.style do
                      backgroundColor paperColor
                      width (vw 8.3)
                      paddingLeft (rem 0.5)
                      paddingRight (rem 0.5)
                      fontSize (vw 1.0)
                  ]
              ]
          ]
      , HH.div
          [ HC.style do
              display flex
              flexDirection row
              alignItems center
              justifyContent center
              paddingTop $ vw 0.65
          ]
          [ HH.button
              [ HC.style do
                  backgroundColor themeColor
                  themeFont
                  fontWeight $ FontWeight $ value "500"
                  fontSize $ vw 1.0
                  width (rem 20.0)
                  height $ vw 3.0
                  color if logonDisabled then (graytone 0.5) else white
                  when logonDisabled $ cursor notAllowed
              , HE.onClick $ const Logon
              , HP.disabled logonDisabled
              ]
              [ HH.text "LOGON" ]
          ]
      , ( errorMessage # maybe (HH.text "") \message ->
            HH.slot _modal unit (Modal.component ModalCommon.errorConfig Message.component) message Modal
        )
      ]
    where
    logonDisabled = trim userName == "" || trim password == ""