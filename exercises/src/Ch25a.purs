module Ch25a where

import Prelude

import Affjax.Node (Error, Response)
import Affjax.Node as AjaxNode
import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Control.Parallel (parSequence)
import Data.Argonaut (class DecodeJson, class EncodeJson, Json, JsonDecodeError(..), decodeJson, encodeJson, (.:))
import Data.Argonaut.Core as ArgCore
import Data.Argonaut.Decode.Decoders (decodeInt, decodeJObject, decodeNumber, decodeString)
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.Int (fromString)
import Data.Maybe (Maybe(..))
import Data.Number as DN
import Data.Show.Generic (genericShow)
import Data.String (Pattern(..), split)
import Data.Traversable (sequence)
import Effect (Effect)
import Effect.Aff (Aff, launchAff_)
import Effect.Class.Console (log)

fromString' :: String -> Either JsonDecodeError Int
fromString' s = case fromString s of
  Nothing -> Left $ UnexpectedValue $ ArgCore.fromString s
  Just n -> Right n

fromString'' :: String -> Either JsonDecodeError Number
fromString'' s = case DN.fromString s of
  Nothing -> Left $ UnexpectedValue $ ArgCore.fromString s
  Just n -> Right n

newtype Centimeters = Centimeters Number

derive instance Generic Centimeters _
derive newtype instance Show Centimeters

instance DecodeJson Centimeters where
  decodeJson = liftA1 Centimeters <<< decodeNumber

derive newtype instance EncodeJson Centimeters

newtype Kilograms = Kilograms Number

derive instance Generic Kilograms _
derive newtype instance Show Kilograms

instance DecodeJson Kilograms where
  decodeJson = liftA1 Kilograms <$> decodeNumber

derive newtype instance EncodeJson Kilograms

newtype Years = Years Int

derive instance Generic Years _
derive newtype instance Show Years

instance DecodeJson Years where
  decodeJson = liftA1 Years <$> decodeInt

derive newtype instance EncodeJson Years

newtype Personal = Personal
  { height :: Centimeters
  , weight :: Kilograms
  , age :: Years
  }

derive instance Generic Personal _

instance Show Personal where
  show = genericShow

derive newtype instance EncodeJson Personal
instance DecodeJson Personal where
  decodeJson json = do
    obj <- decodeJObject json
    height <- (decodeJson =<< obj .: "thgieh") :: Either _ Centimeters
    weight <- (decodeJson =<< obj .: "thgiew") :: Either _ Kilograms
    age <- (decodeJson =<< obj .: "ega") :: Either _ Years
    pure $ Personal { height, weight, age }

newtype GPA = GPA Number

derive instance Generic GPA _
derive newtype instance Show GPA

instance DecodeJson GPA where
  decodeJson = liftA1 GPA <$> decodeNumber

derive newtype instance EncodeJson GPA

data Grade = Preschool | Kindergarten | Grade Int | High Int | College Int

derive instance Generic Grade _

instance Show Grade where
  show = genericShow

instance DecodeJson Grade where
  decodeJson json = do
    s <- decodeString json
    case s of
      "Preschool" -> pure Preschool
      "Kindergarten" -> pure Kindergarten
      grade -> case split (Pattern " ") grade of
        [ "Grade", n ] -> Grade <$> fromString' n
        [ "High", n ] -> High <$> fromString' n
        [ "College", n ] -> College <$> fromString' n
        _ -> Left $ UnexpectedValue json

instance EncodeJson Grade where
  encodeJson Preschool = encodeJson "Preschool"
  encodeJson Kindergarten = encodeJson "Kindergarten"
  encodeJson (Grade n) = encodeJson $ "Grade " <> show n
  encodeJson (High n) = encodeJson $ "High " <> show n
  encodeJson (College n) = encodeJson $ "College " <> show n

newtype Student = Student
  { grade :: Grade
  , teacher :: Teacher
  , gpa :: GPA
  , personal :: Personal
  }

derive instance Generic Student _

instance Show Student where
  show = genericShow

derive newtype instance EncodeJson Student

instance DecodeJson Student where
  decodeJson json = do
    obj <- decodeJObject json
    grade <- obj .: "edarg"
    teacher <- obj .: "rehcaet"
    gpa <- obj .: "apg"
    personal <- obj .: "lanosrep"
    pure $ Student { grade, teacher, gpa, personal }

data TeachingStatus = StudentStatus | Probationary | NonTenured | Tenured

derive instance Generic TeachingStatus _

instance Show TeachingStatus where
  show = genericShow

instance DecodeJson TeachingStatus where
  decodeJson json = do
    s <- decodeString json
    case s of
      "StudentStatus" -> pure StudentStatus
      "Probationary" -> pure Probationary
      "NonTenured" -> pure NonTenured
      "Tenured" -> pure Tenured
      _ -> Left $ UnexpectedValue json

instance EncodeJson TeachingStatus where
  encodeJson StudentStatus = encodeJson "StudentStatus"
  encodeJson Probationary = encodeJson "Probationary"
  encodeJson NonTenured = encodeJson "NonTenured"
  encodeJson Tenured = encodeJson "Tenured"

newtype Teacher = Teacher
  { grades :: Array Grade
  , numberOfStudents :: Int
  , personal :: Personal
  , status :: TeachingStatus
  }

derive instance Generic Teacher _

instance Show Teacher where
  show = genericShow

derive newtype instance EncodeJson Teacher

instance DecodeJson Teacher where
  decodeJson json = do
    obj <- decodeJObject json
    grades <- obj .: "sedarg"
    status <- obj .: "sutats"
    personal <- obj .: "lanosrep"
    numberOfStudents <- obj .: "stnedutSfOrebmun"
    pure $ Teacher { grades, numberOfStudents, personal, status }

testTeacher :: Teacher
testTeacher = Teacher
  { grades: [ Preschool, Kindergarten, Grade 1 ]
  , numberOfStudents: 23
  , personal: Personal
      { height: Centimeters 162.5
      , weight: Kilograms 63.5
      , age: Years 31
      }
  , status: NonTenured
  }

testStudent :: Student
testStudent = Student
  { grade: Grade 1
  , teacher: testTeacher
  , gpa: GPA 3.2
  , personal: Personal
      { height: Centimeters 107.9
      , weight: Kilograms 17.9
      , age: Years 5
      }
  }

-- reverseString :: String -> String
-- reverseString = fold <<< reverse <<< split (Pattern "")

-- keyPairs :: Array (Tuple String String)
-- keyPairs =
--   [ "grades"
--   , "numberOfStudents"
--   , "personal"
--   , "height"
--   , "weight"
--   , "age"
--   , "status"
--   ]
--     <#> \key -> Tuple (reverseString key) key

-- reverseResponseKeys :: String -> String
-- reverseResponseKeys s = foldl (\s' (Tuple rk k) -> replace (Pattern rk) (Replacement k) s') s keyPairs

-- decodeTeacher :: String -> Either JsonDecodeError Teacher
-- decodeTeacher = decodeJson <<< ArgCore.fromString <<< reverseResponseKeys

postRequest :: ∀ a. EncodeJson a => a -> Aff (Either Error (Response Json))
postRequest =
  AjaxNode.post ResponseFormat.json "http://localhost:3000/" <<< Just <<< RequestBody.String <<< ArgCore.stringify <<< encodeJson

test :: Effect Unit
test = launchAff_ do
  responses <- sequence <$> parSequence [ postRequest testTeacher, postRequest testStudent ]
  let bodies = map _.body <$> responses
  log case bodies of
    Left err -> AjaxNode.printError err
    Right [ teacherJson, studentJson ] ->
      show (decodeJson teacherJson :: _ Teacher) <> "\n\n"
        <> show (decodeJson studentJson :: _ Student)
    Right _ -> "Wrong Array size"

-- response <-
--   AjaxNode.post
--     ResponseFormat.json
--     "http://localhost:3000/"
--     $ Just
--     $ RequestBody.String
--     $ ArgCore.stringify
--     $ encodeJson testTeacher

-- log case response of
--   Left err -> AjaxNode.printError err
--   Right { body } -> do
--     "Response: \n" <> show (decodeJson body :: Either _ Teacher)
