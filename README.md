<!-- Generated via running `pnpm run docs` -->

<h1 align="center">globify-gitignore</h1>
<p>
  <a href="https://github.com/aminya/patha/actions/workflows/CI.yml" target="_blank">
    <img alt="CI" src="https://github.com/aminya/patha/actions/workflows/CI.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/globify-gitignore" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/globify-gitignore.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Convert Gitignore to Glob patterns

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install](#install)
- [Usage](#usage)
- [Main API](#main-api)
  - [`GlobifiedEntry` (type)](#globifiedentry-type)
  - [`globifyGitIgnoreFile` (function)](#globifygitignorefile-function)
  - [`globifyGitIgnore` (function)](#globifygitignore-function)
- [Other API](#other-api)
  - [`globifyPath` (function)](#globifypath-function)
  - [`globifyDirectory` (function)](#globifydirectory-function)
  - [`globifyGitIgnoreEntry` (function)](#globifygitignoreentry-function)
  - [`getGlob` (function)](#getglob-function)
  - [`globSorter` (variable)](#globsorter-variable)
  - [`uniqueMatcher` (function)](#uniquematcher-function)
  - [`uniqueGlobs` (function)](#uniqueglobs-function)
  - [`uniqueSortGlobs` (function)](#uniquesortglobs-function)
  - [`posixifyPath` (function)](#posixifypath-function)
  - [`posixifyPathNormalized` (function)](#posixifypathnormalized-function)
  - [`getPathType` (function)](#getpathtype-function)
- [🤝 Contributing](#contributing)

<!-- /code_chunk_output -->

## Install

```sh
npm install --save globify-gitignore
```

`globify-gitignore` is tiny and treeshakable.

## Usage

Use `globifyGitIgnoreFile` to pass the path to a directory that has a `.gitignore` file.

```ts
import { globifyGitIgnoreFile, globifyGitIgnore } from "globify-gitignore"

// ./ is the path that has a .gitignore
globifyGitIgnoreFile("./")
```

Use `globifyGitIgnore` to directly globify the gitignore content

```ts
import { globifyGitIgnore } from "globify-gitignore"

const gitignoreContent = `# OS metadata
.DS_Store
Thumbs.db

# Node
node_modules
package-lock.json

# TypeScript
*.tsbuildinfo

# Build directories
dist
`
const gitignoreDirectory = __dirname

const globPatterns = await globifyGitIgnore(gitignoreContent, gitignoreDirectory)
```

## Main API

<!-- INSERT GENERATED DOCS START -->

### `GlobifiedEntry` (type)

The result of a globified gitignore entry

The glob pattern is in the `@property glob` property, and the `@property included` property tells if the pattern is
an included file or an excluded file

### `globifyGitIgnoreFile` (function)

Parse and globy the `.gitingore` file that exists in a directory

**Parameters:**

- gitIgnoreDirectory (`string`) - The given directory that has the `.gitignore` file
- absolute (`boolean`) - [false] If true, the glob will be absolute

**returns:** Promise<GlobifiedEntry[]>

### `globifyGitIgnore` (function)

Globify the content of a gitignore string

**Parameters:**

- gitIgnoreContent (`string`) - The content of the gitignore file
- gitIgnoreDirectory (`string`) - The directory of gitignore
- absolute (`boolean`) - [false] If true, the glob will be absolute

**returns:** Promise<GlobifiedEntry[]>

## Other API

### `globifyPath` (function)

**Parameters:**

- givenPath (`string`) - The given path to be globified
- givenDirectory (`string`) - [process.cwd()] The cwd to use to resolve relative path names
- absolute (`boolean`) - [false] If true, the glob will be absolute

**returns:** Promise<[GlobifiedEntry] | [GlobifiedEntry, GlobifiedEntry]>

### `globifyDirectory` (function)

Globifies a directory

**Parameters:**

- givenDirectory (`string`) - The given directory to be globified

**returns:** string

### `globifyGitIgnoreEntry` (function)

**Parameters:**

- gitIgnoreEntry (`string`) - One git ignore entry (it expects a valid non-comment gitignore entry with no
  surrounding whitespace)
- gitIgnoreDirectory (`string`) - The directory of gitignore
- absolute (`boolean`) - [false] If true, the glob will be absolute

**returns:** Promise<[GlobifiedEntry] | [GlobifiedEntry, GlobifiedEntry]>

### `getGlob` (function)

**Parameters:**

- g (`GlobifiedEntry`)

**returns:** string

### `globSorter` (variable)

### `uniqueMatcher` (function)

**Parameters:**

- a (`GlobifiedEntry`)
- b (`GlobifiedEntry`)

**returns:** boolean

### `uniqueGlobs` (function)

**Parameters:**

- globs (`GlobifiedEntry[]`)

**returns:** any

### `uniqueSortGlobs` (function)

**Parameters:**

- globs (`GlobifiedEntry[]`)

**returns:** any

### `posixifyPath` (function)

Converts given path to Posix (replacing \ with /)

**Parameters:**

- givenPath (`string`) - Path to convert

**returns:** string

### `posixifyPathNormalized` (function)

Converts given path to Posix (replacing \ with /) and removing ending slashes

**Parameters:**

- givenPath (`string`) - Path to convert

**returns:** string

### `getPathType` (function)

Get the type of the given path

**Parameters:**

- givenPath - Absolute path
- filepath (`string`)

**returns:** Promise<PATH_TYPE>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/patha/blob/master/CONTRIBUTING.md).
