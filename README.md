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
 * The result of a globified gitignore entry
 *
 * The glob pattern is in the `@property glob` property, and the `@property included` property tells if the pattern is
 * an included file or an excluded file
 */
export type GlobifiedEntry = {
  /** The glob pattern calculated from the gitignore pattern */
  glob: string
  /**
   * If `true`, this means that the pattern was prepended by `!` in the gitignore file, and so it is an included file
   * Otherwise, it is an excluded file
   */
  included: boolean
}

/**
 * Parse and globy the `.gitingore` file that exists in a directory
 *
 * @param {string} gitIgnoreDirectory The given directory that has the `.gitignore` file
 * @param {boolean} absolute [false] If true, the glob will be absolute
 * @returns {Promise<GlobifiedEntry[]>} An array of glob patterns
 */
export async function globifyGitIgnoreFile(
  gitIgnoreDirectory: string,
  absolute: boolean = false
): Promise<Array<GlobifiedEntry>>

/**
 * Globify the content of a gitignore string
 *
 * @param {string} gitIgnoreContent The content of the gitignore file
 * @param {string | undefined} gitIgnoreDirectory The directory of gitignore
 * @param {boolean} absolute [false] If true, the glob will be absolute
 * @returns {Promise<GlobifiedEntry[]>} An array of glob patterns
 */
export async function globifyGitIgnore(
  gitIgnoreContent: string,
  gitIgnoreDirectory: string | undefined = undefined,
  absolute: boolean = false
): Promise<Array<GlobifiedEntry>>

/**
 * @param {string} gitIgnoreEntry One git ignore entry (it expects a valid non-comment gitignore entry with no
 *   surrounding whitespace)
 * @param {string | undefined} gitIgnoreDirectory The directory of gitignore
 * @param {boolean} absolute [false] If true, the glob will be absolute
 * @returns {Promise<[GlobifiedEntry] | [GlobifiedEntry, GlobifiedEntry]>} The equivalent glob
 */
export async function globifyGitIgnoreEntry(
  gitIgnoreEntry: string,
  gitIgnoreDirectory: string | undefined,
  absolute: boolean
): Promise<[GlobifiedEntry] | [GlobifiedEntry, GlobifiedEntry]>

/**
 * @param {string} givenPath The given path to be globified
 * @param {string} givenDirectory [process.cwd()] The cwd to use to resolve relative path names
 * @param {boolean} absolute [false] If true, the glob will be absolute
 * @returns {Promise<GlobifiedEntry | [GlobifiedEntry, GlobifiedEntry]>} The glob path or the file path itself
 */
export function globifyPath(
  givenPath: string,
  givenDirectory: string = process.cwd(),
  absolute: boolean = false
): Promise<[GlobifiedEntry] | [GlobifiedEntry, GlobifiedEntry]>

/**
 * Globifies a directory
 *
 * @param {string} givenDirectory The given directory to be globified
 */
export declare function globifyDirectory(givenDirectory: string): string

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
```

## Contributing

- Let me know if you encounter any bugs.
- Feature requests are always welcome.
