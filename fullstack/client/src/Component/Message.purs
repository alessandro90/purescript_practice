module Component.Message where

import Prelude

import AppTheme (paperColor, themeFont)
import CSS (backgroundColor)
import Data.Const (Const)
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.CSS as HC

type Output = Void
type Action = Void

type Query :: ∀ k. k -> Type
type Query = Const Void

type Slots :: ∀ k. Row k
type Slots = ()

type Input = String

type State = { message :: String }

component
  :: ∀ m
   . MonadAff m
  => H.Component Query Input Output m
component = H.mkComponent
  { initialState: { message: _ }
  , render
  , eval: H.mkEval H.defaultEval
  }
  where
  render :: State -> H.ComponentHTML Action Slots m
  render { message } =
    HH.div
      [ HC.style do
          themeFont
          backgroundColor paperColor
      ]
      [ HH.text message ]
