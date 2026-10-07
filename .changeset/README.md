# Changesets

This folder holds the [changesets](https://changesets.dev) of the pending
release: one Markdown file per change, with the version bump (`major`,
`minor` or `patch`) and a description for the changelog.

Add one to every pull request that changes the published package:

```sh
pnpm changeset
```
