module Component.CountdownTimer where

import Prelude

import CSS as CSS
import Control.Alt ((<|>))
import Control.Monad.Rec.Class (forever)
import Data.Maybe (Maybe(..))
import Effect.Aff (Milliseconds(..), delay, error, forkAff, killFiber, launchAff_)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC
import Halogen.HTML.Properties as HP
import Halogen.Query.Event as HQE
import Halogen.Query.HalogenM as HQ
import Halogen.Subscription as HS
import Web.DOM.Element as DomElement
import Web.DOM.Node as DomNode
import Web.Event.Event as WebEvent
import Web.HTML (HTMLDocument, window)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.HTMLElement as HTMLElement
import Web.HTML.Window as Window
import Web.UIEvent.MouseEvent (MouseEvent)
import Web.UIEvent.MouseEvent as ME
import Web.UIEvent.MouseEvent.EventTypes (click)

type Input = Int
type Output = Unit
type State = { count :: Int }

type Slots :: ∀ k. Row k
type Slots = ()

data Query :: ∀ k. k -> Type
data Query a = Const Void

data Action
  = Initialize
  | Tick H.SubscriptionId
  | HandleDoClick HTMLDocument MouseEvent

component :: ∀ m. MonadAff m => H.Component Query Input Output m
component = H.mkComponent
  { initialState: { count: _ }
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }
  where
  handleAction :: Action -> H.HalogenM State Action Slots Output m Unit
  handleAction = case _ of
    Initialize -> do
      -- timer setup
      { emitter: tickEmitter, listener: tickListener } <- H.liftEffect HS.create
      tickFiber <- H.liftAff $ forkAff $ forever do
        delay $ Milliseconds 1000.0
        H.liftEffect $ HS.notify tickListener $ Tick
      let
        fiberEmitter = HS.makeEmitter \_ -> pure $ launchAff_ do
          killFiber (error "Event source finalized") tickFiber
      HQ.subscribe' \sid -> (tickEmitter <|> fiberEmitter) <#> (_ $ sid)
      -- document click setup
      document <- H.liftEffect $ Window.document =<< window
      HQ.subscribe' $ const $ HQE.eventListener
        click
        (HTMLDocument.toEventTarget document)
        (map (HandleDoClick document) <<< ME.fromEvent)
    (Tick sid) -> do
      { count } <- H.get
      unless (count <= 0) $ H.modify_ _ { count = count - 1 }
      when (count == 1) do
        H.raise unit
        H.unsubscribe sid
    (HandleDoClick _ event) -> do
      let clickNode' = DomElement.toNode <$> (DomElement.fromEventTarget =<< (WebEvent.target $ ME.toEvent event))
      divNode' <- map HTMLElement.toNode <$> H.getHTMLElementRef theCountdownDiv
      case clickNode', divNode' of
        Just cn, Just dn -> H.liftEffect do
          eq <- DomNode.isEqualNode cn dn
          when eq $ log "CountdownTimer div clicked on"
        _, _ -> pure unit

  theCountdownDiv :: H.RefLabel
  theCountdownDiv = H.RefLabel "the-countdown-div"

  render :: State -> H.ComponentHTML Action Slots m
  render { count } = do
    HH.div
      [ HP.ref theCountdownDiv
      , HC.style do
          CSS.display CSS.flex
          CSS.flexDirection CSS.column
          CSS.padding (CSS.rem 1.0) (CSS.rem 1.0) (CSS.rem 1.0) (CSS.rem 1.0)
      ]
      [ HH.text $ "COUNTDOWN: " <> show count ]