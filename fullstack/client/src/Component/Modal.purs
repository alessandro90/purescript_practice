module Component.Modal where

import Prelude hiding (top)

import AppTheme (paperColor, themeColor, themeFont)
import CSS (cursor)
import CSS.Background (backgroundColor)
import CSS.Color (graytone, rgba, white)
import CSS.Common (center)
import CSS.Cursor (notAllowed)
import CSS.Display (display, position, fixed, zIndex, flex)
import CSS.Flexbox (alignItems, justifyContent, flexDirection, row, column, flexEnd, spaceAround)
import CSS.Font (FontWeight(..), fontWeight, color, fontSize)
import CSS.Geometry (top, left, padding, width, height, marginLeft, minWidth, minHeight)
import CSS.Overflow (overflow, overflowAuto)
import CSS.Property (value)
import CSS.Size (Size(..), pct, rem)
import Data.Maybe (Maybe(..))
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))

type State iInput =
  { iInput :: iInput
  , affirmativeDisabled :: Boolean
  , negativeDisabled :: Boolean
  }

data Output iOutput
  = Affirmative
  | Negative
  | InnerOutput iOutput

data Action iInput iOuput
  = Input iInput
  | Output (InnerOutput iOuput)
  | AffirmativeClickedInternal
  | NegativeClickedInternal

type Slots iQuery iOutput = (inner :: H.Slot (InnerQuery iQuery) (InnerOutput iOutput) Unit)

_inner = Proxy :: Proxy "inner"

data ButtonDisplay
  = DisplayBothButtons
  | DisplayAffirmative
  | DisplayNegative
  | DisplayNoButtons

type Config =
  { affirmativeLabel :: String
  , negativeLabel :: String
  , displayButtons :: ButtonDisplay
  , affirmativeDisabled :: Boolean
  , negativeDisabled :: Boolean
  }

data InnerOutput iOutput
  = PassThroughOutput iOutput
  | EnableAffirmative
  | DisableAffirmative
  | EnableNegative
  | DisableNegative
  | CloseAffirmative
  | CloseNegative
  | ParentAffirmative
  | ParentNegative

data InnerQuery iQuery a
  = AffirmativeClicked a
  | NegativeClicked a
  | PassThroughQuery iQuery a

defaultConfig :: Config
defaultConfig =
  { affirmativeLabel: "OK"
  , negativeLabel: "CANCEL"
  , displayButtons: DisplayBothButtons
  , affirmativeDisabled: false
  , negativeDisabled: false
  }

component
  :: ∀ iQuery iInput iOutput m
   . MonadAff m
  => Config
  -> H.Component (InnerQuery iQuery) iInput (InnerOutput iOutput) m
  -> H.Component (InnerQuery iQuery) iInput (Output iOutput) m
component config innerComponent = H.mkComponent
  { initialState:
      { iInput: _
      , affirmativeDisabled: config.affirmativeDisabled
      , negativeDisabled: config.negativeDisabled
      }
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , receive = Just <<< Input
      }
  }
  where
  handleAction
    :: Action iInput iOutput
    -> H.HalogenM (State iInput) (Action iInput iOutput) (Slots iQuery iOutput) (Output iOutput) m Unit
  handleAction = case _ of
    Input input -> H.modify_ _ { iInput = input }
    Output innerOutput -> case innerOutput of
      PassThroughOutput output -> H.raise $ InnerOutput output
      EnableAffirmative -> H.modify_ _ { affirmativeDisabled = false }
      DisableAffirmative -> H.modify_ _ { affirmativeDisabled = true }
      EnableNegative -> H.modify_ _ { negativeDisabled = false }
      DisableNegative -> H.modify_ _ { negativeDisabled = true }
      CloseAffirmative -> handleAction AffirmativeClickedInternal
      CloseNegative -> handleAction NegativeClickedInternal
      ParentAffirmative -> H.raise Affirmative
      ParentNegative -> H.raise Negative
    AffirmativeClickedInternal -> void $ H.tell _inner unit AffirmativeClicked
    NegativeClickedInternal -> void $ H.tell _inner unit NegativeClicked

  handleQuery
    :: ∀ a
     . InnerQuery iQuery a
    -> H.HalogenM (State iInput) (Action iInput iOutput) (Slots iQuery iOutput) (Output iOutput) m (Maybe a)
  handleQuery = H.query _inner unit

  render :: State iInput -> H.ComponentHTML (Action iInput iOutput) (Slots iQuery iOutput) m
  render { iInput, affirmativeDisabled, negativeDisabled } =
    let
      displayAffirmative = case config.displayButtons of
        DisplayBothButtons -> true
        DisplayAffirmative -> true
        _ -> false
      displayNegative = case config.displayButtons of
        DisplayBothButtons -> true
        DisplayNegative -> true
        _ -> false
    in
      HH.div
        [ HC.style do
            display flex
            alignItems center
            justifyContent center
            position fixed
            top $ BasicSize $ value 0.0
            left $ BasicSize $ value 0.0
            width $ pct 100.0
            height $ pct 100.0
            overflow overflowAuto
            backgroundColor $ rgba 0 0 0 0.4
            zIndex 1
        ]
        [ HH.div
            [ HC.style do
                display flex
                flexDirection column
                justifyContent spaceAround
                padding (rem 1.0) (rem 1.0) (rem 1.0) (rem 1.0)
                backgroundColor paperColor
                minWidth (rem 40.0)
                minHeight (rem 10.0)
            ]
            [ HH.div
                [ HC.style do
                    display flex
                    flexDirection column
                    padding (rem 1.0) (rem 1.0) (rem 1.0) (rem 1.0)
                ]
                [ HH.slot _inner unit innerComponent iInput Output ]
            , HH.div
                [ HC.style do
                    display flex
                    flexDirection row
                    alignItems center
                    justifyContent flexEnd
                    width $ pct 100.0
                    backgroundColor paperColor
                ]
                [ if not displayAffirmative then HH.text ""
                  else HH.button
                    [ buttonStyle affirmativeDisabled
                    , HP.disabled affirmativeDisabled
                    , HE.onClick $ const AffirmativeClickedInternal
                    ]
                    [ HH.text config.affirmativeLabel ]
                , if not displayNegative then HH.text ""
                  else HH.button
                    [ buttonStyle negativeDisabled
                    , HP.disabled negativeDisabled
                    , HE.onClick $ const NegativeClickedInternal
                    ]
                    [ HH.text config.negativeLabel ]
                ]
            ]
        ]
    where
    buttonStyle isDisabled = HC.style do
      themeFont
      fontWeight $ FontWeight $ value "500"
      color if isDisabled then (graytone 0.5) else white
      when isDisabled $ cursor notAllowed
      padding (rem 0.5) (rem 0.5) (rem 0.5) (rem 0.5)
      backgroundColor themeColor
      width $ rem 8.0
      marginLeft $ rem 2.0
      fontSize $ rem 0.9