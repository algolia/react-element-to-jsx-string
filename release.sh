#!/usr/bin/env bash

set -e # exit when error

currentBranch=`git rev-parse --abbrev-ref HEAD`
if [ $currentBranch != 'master' ]; then
  printf "Release: You must be on master\n"
  exit 1
fi

if [[ $# -eq 0 ]] ; then
  printf "Release: use ``yarn release [major|minor|patch|x.x.x]``\n"
  exit 1
fi

yarn run mversion $1
yarn run conventional-changelog --infile CHANGELOG.md --same-file --preset angular
yarn run doctoc README.md
git commit -am "$(json -f package.json version)"
git tag v`json -f package.json version`
git push origin master
git push --tags origin master
npm publish
