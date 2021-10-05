# globify-gitignore

Convert Gitignore to Glob patterns

![Build Status (Github Actions)](https://github.com/aminya/globify-gitignore/workflows/CI/badge.svg)

## Usage

```
npm install globify-gitignore
```

```ts
import { globifyGitIgnoreFile, globifyGitIgnore } from "globify-gitignore"

globifyGitIgnoreFile(".") // path to a directory that has a .gitignore
```

You can use `globifyGitIgnore` to pass the gitignore content directly

```ts
import { globifyGitIgnore } from "globify-gitignore"

async function main() {
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
}
main()
```

### API

```ts
/**
 * Parse and globy the `.gitingore` file that exists in a directory
 *
 * @param {string} gitIgnoreDirectory The given directory that has the `.gitignore` file
 * @returns {Promise<string[]>} An array of glob patterns
 */
export declare function globifyGitIgnoreFile(gitIgnoreDirectory: string): Promise<Array<string>>

/**
 * Read `.gitingore` file from a directory
 *
 * @param {string} gitIgnoreContent The content of the gitignore file
 * @param {string | undefined} gitIgnoreDirectory The directory of gitignore
 * @returns {Promise<string[]>} An array of glob patterns
 */
export declare function globifyGitIgnore(
  gitIgnoreContent: string,
  gitIgnoreDirectory?: string | undefined
): Promise<Array<string>>

/**
 * Converts given path to Posix (replacing \ with /)
 *
 * @param {string} givenPath Path to convert
 * @returns {string} Converted filepath
 */
export declare function posixifyPath(givenPath: string): string

/**
 * Converts given path to Posix (replacing \ with /) and removing ending slashes
 *
 * @param {string} givenPath Path to convert
 * @returns {string} Converted filepath
 */
export declare function posixifyPathNormalized(givenPath: string): string

/**
 * @param {string} givenPath The given path to be globified
 * @param {string} givenDirectory [process.cwd()] The cwd to use to resolve relative pathnames
 * @returns {Promise<string | [string, string]>} The glob path or the file path itself
 */
export declare function globifyPath(givenPath: string, givenDirectory?: string): Promise<string | [string, string]>

/**
 * Globifies a directory
 *
 * @param {string} givenDirectory The given directory to be globified
 */
export declare function globifyDirectory(givenDirectory: string): string
```

## Contributing

- Let me know if you encounter any bugs.
- Feature requests are always welcome.
