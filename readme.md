# Functional Programming Made Easier notes

Notes and code written while reading [Functional Programming Made Easier](https://leanpub.com/fp-made-easier).

## Create a new project with compiler installed locally

- make project directory

```shell
mkdir /dev/purescript/second-project
```

- enter project

```shell
cd /dev/purescript/second-project
```

- initialize for using `npm` and `npx`

```shell
npm init -y
```

- add compiler and build tools to the project

```shell
npm install --save-dev spago[@x.x.x] purescript[@x.x.x]
```

- initialize our `git` repo (Optional)

```shell
git init
```

- create a skeleton PureScript project

```shell
npx spago init
```

- build and run the skeleton project

```shell
npx spago run
```

## Notes

### Client

Apparently the client works properly only with Chrome and not with Firefox.

### Recurse to the end before doing any computation

The way to go down to a recursion chain and then "go back" to perform a computation is by directly pipe the result of a recursive call into another function.

For example, for `unzip` we first traverse the whole list, and then we build the Tuple of lists by piping the result of the recursive call to a lambda.

```haskell
unzip :: ∀ a b. List (Tuple a b) -> Tuple (List a) (List b)
unzip Nil = Tuple Nil Nil
unzip (Tuple x y : xs) = unzip xs # \(Tuple i j) -> Tuple (x : i) (y : j)
```
