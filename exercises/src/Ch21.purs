module Ch21 where

import Prelude

import Control.Monad.Error.Class (class MonadError, class MonadThrow, catchError, throwError)
import Control.Monad.Except (ExceptT, runExceptT)
import Control.Monad.Reader (class MonadAsk, class MonadTrans, ask, lift)
import Control.Monad.State (class MonadState, get, put)
import Control.Monad.Writer (class MonadTell, WriterT, runWriterT, tell)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)

-- import Undefined (undefined)

newtype State s a = State (s -> Tuple a s)

newtype StateT s m a = StateT (s -> m (Tuple a s))

runStateT :: ∀ s m a. StateT s m a -> s -> m (Tuple a s)
runStateT (StateT fma) = fma

instance Functor m => Functor (StateT s m) where
  map f (StateT mg) = StateT \s -> mg s <#> \(Tuple x s') -> Tuple (f x) s'

instance Monad m => Apply (StateT s m) where
  apply :: ∀ a b. StateT s m (a -> b) -> StateT s m a -> StateT s m b
  apply (StateT fmf) (StateT fmx) = StateT \s -> do
    Tuple x s' <- fmx s
    Tuple f s'' <- fmf s'
    pure $ Tuple (f x) s''

-- Bind version
-- instance Monad m => Apply (StateT s m) where
--   apply :: ∀ a b. StateT s m (a -> b) -> StateT s m a -> StateT s m b
--   apply (StateT fmf) (StateT fmx) = StateT \s ->
--     fmx s
--       >>= \(Tuple x s') -> fmf s'
--         >>= \(Tuple f s'') -> pure $ Tuple (f x) s''

instance Monad m => Applicative (StateT s m) where
  pure x = StateT $ pure <<< Tuple x

instance Monad m => Bind (StateT s m) where
  bind :: ∀ a b. (StateT s m a) -> (a -> StateT s m b) -> StateT s m b
  bind (StateT f) fm = StateT \s -> do
    Tuple x s' <- f s
    Tuple y s'' <- runStateT (fm x) s'
    pure $ Tuple y s''

-- Bind version
-- instance Monad m => Bind (StateT s m) where
--   bind :: ∀ a b. (StateT s m a) -> (a -> StateT s m b) -> StateT s m b
--   bind (StateT f) fm = StateT \s -> f s >>= \(Tuple x s') -> runStateT (fm x) s'

instance Monad m => Monad (StateT s m)

instance Monad m => MonadState s (StateT s m) where
  state :: ∀ a. (s -> Tuple a s) -> StateT s m a
  state f = StateT $ pure <<< f

liftStateT :: ∀ m a s. Functor m => m a -> StateT s m a
liftStateT ma = StateT \s -> ma <#> \x -> Tuple x s

instance MonadTrans (StateT s) where
  lift = liftStateT

instance MonadAsk r m => MonadAsk r (StateT s m) where
  ask :: StateT s m r
  ask = lift ask

instance MonadTell w m => MonadTell w (StateT s m) where
  tell :: w -> StateT s m Unit
  tell = lift <<< tell

-- instance MonadTell w m => MonadTell w (StateT s m) where
--   tell :: w -> StateT s m Unit
--   tell w = StateT \s -> do
--     _ <- tell w
--     pure $ Tuple unit s

instance MonadThrow e m => MonadThrow e (StateT s m) where
  throwError = lift <<< throwError

instance MonadError e m => MonadError e (StateT s m) where
  catchError :: ∀ a. StateT s m a -> (e -> StateT s m a) -> StateT s m a
  catchError (StateT fmx) f = StateT \s -> catchError (fmx s) \e -> runStateT (f e) s

-- ----------------------------------------------------------------------------------

type AppStack e w s a = ExceptT e (WriterT w (StateT s Effect)) a

type AppM = AppStack String String Int Unit

type StackResult = Tuple (Tuple (Either String Unit) String) Int

type AppEffects =
  { log :: String
  , state :: Int
  , result :: Maybe Unit
  }

type AppResult = Tuple (Maybe String) AppEffects

results :: StackResult -> AppResult
results (Tuple (Tuple (Left e) l) s) = Tuple (Just e) { log: l, state: s, result: Nothing }
results (Tuple (Tuple (Right r) l) s) = Tuple Nothing { log: l, state: s, result: Just r }

runApp :: Int -> AppM -> Effect StackResult
runApp s = flip runStateT s <<< runWriterT <<< runExceptT

appLog :: ∀ m. MonadTell String m => String -> m Unit
appLog s = tell $ s <> "\n"

app :: AppM
app = do
  _ <- appLog "Staring App.."
  s <- get
  when (s == 0) $ void $ throwError "WE CANNOT HAVE 0 STATE"
  put $ s + 1
  _ <- appLog "Incremented state"
  pure unit

test :: Effect Unit
test = do
  result1 <- runApp 0 app
  log $ show result1
  result2 <- runApp 99 app
  log $ show result2