module Component.Counter where

import Prelude

import CSS as CSS
import CSS.Common (center)
import Data.Array (range)
import Data.Maybe (Maybe(..))
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Events as HE
import Type.Proxy (Proxy(..))

defaultSpaceEvenly :: ∀ a. CSS.IsString a => a
defaultSpaceEvenly = CSS.fromString "space-evenly"

class SpaceEvenly a where
  spaceEvenly :: a

instance SpaceEvenly CSS.Value where
  spaceEvenly = defaultSpaceEvenly

instance SpaceEvenly CSS.AlignContentValue where
  spaceEvenly = defaultSpaceEvenly

instance SpaceEvenly CSS.JustifyContentValue where
  spaceEvenly = defaultSpaceEvenly

type Input = Int
type Output = Int
type State = { count :: Int }

type SlotNum = Int
type CounterValue = Int

data Action
  = Initialize
  | Finalize
  | Decrement
  | Increment
  | FromChild SlotNum CounterValue
  | RaiseParent
  | Received Int

data Query a
  = SetCount CounterValue a
  | GetCount (CounterValue -> a)

type Slots = (counter :: H.Slot Query Output SlotNum)

_counter = Proxy :: Proxy "counter"

component :: ∀ m. MonadAff m => Int -> H.Component Query Input Output m
component numChildren = H.mkComponent
  { initialState: { count: _ }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      , finalize = Just Finalize
      , receive = Just <<< Received
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction = case _ of
    Initialize -> log "Initialize"
    Finalize -> log "Finalize"
    Decrement -> H.modify_ \s@{ count } -> s { count = count - 1 }
    Increment -> H.modify_ \s@{ count } -> s { count = count + 1 }
    FromChild slot count -> do
      log $ "Received from Child " <> show (slot + 1) <> ": " <> show count
      H.tell _counter slot $ SetCount 123
      count' <- H.request _counter slot GetCount
      log $ "GetCount: " <> show count'
    RaiseParent -> H.get >>= \{ count } -> H.raise count
    Received count -> H.modify_ _ { count = count }

  handleQuery :: ∀ a. Query a -> H.HalogenM State Action Slots Output m (Maybe a)
  handleQuery = case _ of
    SetCount count a -> H.modify_ _ { count = count } *> pure (Just a)
    GetCount reply -> H.get >>= \{ count } -> pure $ Just $ reply count

  render :: State -> H.ComponentHTML Action Slots m
  render { count } =
    HH.div []
      ( [ HH.div
            [ HC.style do
                CSS.display CSS.flex
                CSS.flexDirection CSS.row
                CSS.justifyContent spaceEvenly
                CSS.width $ CSS.rem 6.0
            ]
            [ HH.button [ onClick Decrement ] [ HH.text "-" ]
            , HH.text $ show count
            , HH.button [ onClick Increment ] [ HH.text "+" ]
            ]
        , HH.div
            [ HC.style do
                CSS.display CSS.flex
                CSS.justifyContent center
                CSS.width $ CSS.rem 6.0
                CSS.paddingTop $ CSS.rem 0.5
            ]
            [ HH.button [ onClick RaiseParent ] [ HH.text "Raise" ] ]
        ]
          <> children
      )
    where
    onClick = HE.onClick <<< const
    children =
      if numChildren == 0 then []
      else
        [ HH.div
            [ HC.style do
                CSS.display CSS.flex
                CSS.paddingLeft $ CSS.rem 1.0
                CSS.paddingTop $ CSS.rem 1.0
                CSS.paddingBottom $ CSS.rem 1.0
            ] $ range 0 (numChildren - 1) <#> \n -> HH.slot _counter n (component 0) (n + 1) $ FromChild n
        ]