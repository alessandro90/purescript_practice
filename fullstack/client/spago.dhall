{-
Welcome to a Spago project!
You can edit this file as you like.

Need help? See the following resources:
- Spago documentation: https://github.com/purescript/spago
- Dhall language tour: https://docs.dhall-lang.org/tutorials/Language-Tour.html

When creating a new Spago project, you can use
`spago init --no-comments` or `spago init -C`
to generate this file without the comments in this block.
-}
{ name = "my-project"
, dependencies =
  [ "aff"
  , "affjax"
  , "affjax-web"
  , "argonaut"
  , "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "console"
  , "const"
  , "css"
  , "datetime"
  , "dom-indexed"
  , "effect"
  , "either"
  , "foldable-traversable"
  , "halogen"
  , "halogen-css"
  , "maybe"
  , "newtype"
  , "nonempty"
  , "now"
  , "ordered-collections"
  , "prelude"
  , "refs"
  , "routing"
  , "routing-duplex"
  , "strings"
  , "transformers"
  , "uuid"
  ]
, packages = ./packages.dhall
, sources =
  [ "src/**/*.purs"
  , "test/**/*.purs"
  , "../server/src/Data/Api/**/*.purs"
  , "../server/src/Entity/**/*.purs"
  ]
}
