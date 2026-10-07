#!/usr/bin/env bash

set -e

currentBranch=$(git rev-parse --abbrev-ref HEAD)
if [ "$currentBranch" != 'master' ]; then
  printf "Release: You must be on master\n"
  exit 1
fi

if [[ $# -eq 0 ]] ; then
  printf "Release: use \`pnpm run release [major|minor|patch|x.x.x]\`\n"
  exit 1
fi

pnpm exec mversion "$1"
pnpm exec conventional-changelog --infile CHANGELOG.md --same-file --preset angular

version=$(node -p "require('./package.json').version")

git commit -am "$version"
git tag "v$version"

pnpm publish

git push origin master
git push --tags origin master
