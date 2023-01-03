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
  , "affjax-node"
  , "argonaut"
  , "argonaut-codecs"
  , "arrays"
  , "avar"
  , "bifunctors"
  , "console"
  , "control"
  , "crypto"
  , "debug"
  , "effect"
  , "either"
  , "foldable-traversable"
  , "httpure"
  , "identity"
  , "lcg"
  , "maybe"
  , "newtype"
  , "node-buffer"
  , "node-fs"
  , "node-fs-aff"
  , "node-process"
  , "nonempty"
  , "ordered-collections"
  , "parsing"
  , "posix-types"
  , "prelude"
  , "quickcheck"
  , "strings"
  , "stringutils"
  , "transformers"
  , "tuples"
  , "unicode"
  , "uuid"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
