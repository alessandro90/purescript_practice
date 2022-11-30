module Ch11 where

import Data.Foldable (class Foldable, foldMap, foldl, foldr)
import Data.List (List(..), (:))
import Data.List.Types (NonEmptyList(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Data.NonEmpty (NonEmpty, (:|))
import Data.Semigroup ((<>))
import Effect (Effect)
import Effect.Console (log)
import Prelude (class Ord, class Semiring, type (~>), Unit, discard, flip, negate, show, zero, ($), (+), (<<<), (>=))

-- reverse :: List ~> List
-- reverse = foldl (\acc x -> x : acc) Nil

reverse :: List ~> List
reverse = foldl (flip (:)) Nil

max :: ∀ a. Ord a => a -> a -> a
max x y = if x >= y then x else y

foldl1 :: ∀ f a. Foldable f => (a -> a -> a) -> NonEmpty f a -> a
foldl1 fn (x :| xs) = foldl fn x xs

-- A generic max function valid for every Foldable type
findMax :: ∀ f a. Foldable f => Ord a => f a -> Maybe a
findMax = foldl go Nothing
  where
  go x y = max x $ Just y

findMaxList :: ∀ a. Ord a => List a -> Maybe a
findMaxList Nil = Nothing
findMaxList (x : xs) = Just $ foldl max x xs

findMaxListNE' :: ∀ a. Ord a => NonEmptyList a -> a
findMaxListNE' (NonEmptyList (x :| xs)) = foldl max x xs

findMaxListNE :: ∀ a. Ord a => NonEmptyList a -> a
findMaxListNE = foldl1 max <<< unwrap

sumNE :: ∀ f a. Foldable f => Semiring a => NonEmpty f a -> a
sumNE = foldl1 (+)

sum :: ∀ f a. Foldable f => Semiring a => f a -> a
sum = foldl (+) zero

data Tree a = Leaf a | Node (Tree a) (Tree a)

instance Foldable Tree where
  foldl f acc (Leaf x) = f acc x
  foldl f acc (Node l r) = go acc l r
    where
    go acc' (Leaf x') keep = foldl f (f acc' x') keep
    go acc' (Node l' r') keep = go acc' l' $ Node r' keep

  foldr f acc (Leaf x) = f x acc
  foldr f acc (Node l r) = go acc r l
    where
    go acc' (Leaf x') keep = foldr f (f x' acc') keep
    go acc' (Node l' r') keep = go acc' r' $ Node keep l'

  foldMap f (Leaf x) = f x
  foldMap f (Node l r) = foldMap f l <> foldMap f r

exampleTree :: Tree Int
exampleTree =
  Node
    ( Node
        (Leaf 5)
        ( Node
            (Leaf (-1))
            (Leaf 14)
        )
    )
    (Leaf 99)

-- A much cleaner implementation, but not useful to understand how to traverse a tree
-- instance Foldable Tree where
--   foldMap g (Leaf x) = g x
--   foldMap g (Node l r) = foldMap g l <> foldMap g r

--   foldr g = foldrDefault g
--   foldl g = foldlDefault g

test :: Effect Unit
test = do
  log $ show $ reverse (1 : 2 : 3 : Nil)
  log $ show $ max (-1) 99
  log $ show $ max "aa" "z"
  log $ show $ findMax (1 : 10 : 2 : 7 : 150 : 3 : Nil)
  log $ show $ findMax [ 1, 10, 2, 7, 150, 3 ]
  log $ show $ findMax ([] :: Array Unit)
  log $ show $ findMax (Nil :: List Unit)
  log $ show $ findMaxList (1 : 10 : 2 : 7 : 150 : 3 : Nil)
  log $ show $ findMaxList (Nil :: List Unit)
  log $ show $ findMaxListNE $ NonEmptyList (1 :| (10 : 2 : 7 : 150 : 3 : Nil))
  log $ show $ sumNE (1 :| (2 : 3 : Nil))
  log $ show $ sumNE (1 :| [ 2, 3 ])
  log $ show $ sum [ 1, 2, 3 ]
  log $ show $ sum (1.5 : 2.0 : 3.5 : Nil)
  log $ show $ sum ([] :: Array Int)
  log $ show $ sum (Nil :: List Int)
  log $ (foldl (\s x -> s <> " | " <> show x) "" exampleTree) <> " | "
  log $ (foldr (\x s -> s <> " | " <> show x) "" exampleTree) <> " | "
  log $ foldMap (\s -> show s <> " | ") exampleTree
  log $ show $ sum exampleTree
