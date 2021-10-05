import { join, normalize } from "path"
import { promises } from "fs"
const { readFile, stat } = promises
import isPath from "is-valid-path"
import { unique } from "./utils"
import dedent from "dedent"

/** Converts given path to Posix (replacing \\ with /)
 * @param {string} givenPath   Path to convert
 * @returns {string}          Converted filepath
 */
export function posixifyPath(givenPath: string): string {
  return normalize(givenPath).replace(/\\/g, "/")
}

/** Converts given path to Posix (replacing \\ with /) and removing ending slashes
 * @param {string} givenPath   Path to convert
 * @returns {string}          Converted filepath
 */
export function posixifyPathNormalized(givenPath: string): string {
  return posixifyPath(givenPath).replace(/\/$/, "")
}

/**
 * @param {string} givenPath The given path to be globified
 * @param {string} givenDirectory [process.cwd()]  The cwd to use to resolve relative path names
 * @returns {Promise<string | [string, string]>} The glob path or the file path itself
 */
export function globifyPath(
  givenPath: string,
  givenDirectory: string = process.cwd()
): Promise<string | [string, string]> {
  return globifyGitIgnoreEntry(posixifyPath(givenPath), givenDirectory)
}

/**
 * Globifies a directory
 * @param {string} givenDirectory The given directory to be globified
 */
export function globifyDirectory(givenDirectory: string) {
  return `${posixifyPathNormalized(givenDirectory)}/**`
}

/**
 * Parse and globy the `.gitingore` file that exists in a directory
 * @param {string} gitIgnoreDirectory The given directory that has the `.gitignore` file
 * @returns {Promise<Array<string>>} an array of glob patterns
 */
export async function globifyGitIgnoreFile(gitIgnoreDirectory: string): Promise<Array<string>> {
  return globifyGitIgnore(await readFile(join(gitIgnoreDirectory, ".gitignore"), "utf-8"), gitIgnoreDirectory)
}

/**
 * Read `.gitingore` file from a directory
 * @param {string} gitIgnoreContent the content of the gitignore file
 * @param {string | undefined} gitIgnoreDirectory the directory of gitignore
 * @returns {Promise<Array<string>>} an array of glob patterns
 */
export async function globifyGitIgnore(
  gitIgnoreContent: string,
  gitIgnoreDirectory: string | undefined = undefined
): Promise<Array<string>> {
  const gitIgnoreEntries = dedent(gitIgnoreContent)
    .split("\n") // Remove empty lines and comments.
    .filter((entry) => !(isWhitespace(entry) || isGitIgnoreComment(entry))) // Remove surrounding whitespace
    .map((entry) => trimWhiteSpace(entry))
  const gitIgnoreEntriesNum = gitIgnoreEntries.length
  const globEntries = new Array(gitIgnoreEntriesNum)

  for (let iEntry = 0; iEntry < gitIgnoreEntriesNum; iEntry++) {
    const globifyOutput = await globifyGitIgnoreEntry(gitIgnoreEntries[iEntry], gitIgnoreDirectory)

    // Check if `globifyGitIgnoreEntry` returns a pair or a string
    if (typeof globifyOutput === "string") {
      // string
      globEntries[iEntry] = globifyOutput // Place the entry in the output array
    } else {
      // pair
      globEntries[iEntry] = globifyOutput[0] // Place the entry in the output array

      globEntries.push(globifyOutput[1]) // Push the additional entry
    }
  }

  // unique in the end
  return unique(globEntries)
}

/**
 * @param {string} gitIgnoreEntry one git ignore entry (it expects a valid non-comment gitignore entry with no surrounding whitespace)
 * @param {string | undefined} gitIgnoreDirectory the directory of gitignore
 * @returns {Promise<string | [string, string]>} the equivalent glob
 */
async function globifyGitIgnoreEntry(
  gitIgnoreEntry: string,
  gitIgnoreDirectory: string | undefined
): Promise<string | [string, string]> {
  // output glob entry
  let entry = gitIgnoreEntry
  // Process the entry beginning
  // '!' in .gitignore means to force include the pattern
  // remove "!" to allow the processing of the pattern and swap ! in the end of the loop
  let forceInclude = false

  if (entry[0] === "!") {
    entry = entry.substring(1)
    forceInclude = true
  }

  // If there is a separator at the beginning or middle (or both) of the pattern,
  // then the pattern is relative to the directory level of the particular .gitignore file itself
  // Process slash

  /** @type {PATH_TYPE.OTHER | PATH_TYPE.DIRECTORY | PATH_TYPE.FILE} */
  let pathType: PATH_TYPE.OTHER | PATH_TYPE.DIRECTORY | PATH_TYPE.FILE = PATH_TYPE.OTHER

  if (entry[0] === "/") {
    // Patterns starting with '/' in gitignore are considered relative to the project directory while glob
    // treats them as relative to the OS root directory.
    // So we trim the slash to make it relative to project folder from glob perspective.
    entry = entry.substring(1)

    // Check if it is a directory or file
    if (isPath(entry)) {
      pathType = await getPathType(gitIgnoreDirectory ? join(gitIgnoreDirectory, entry) : entry)
    }
  } else {
    const slashPlacement = entry.indexOf("/")

    if (slashPlacement === -1) {
      // Patterns that don't have `/` are '**/' from glob perspective (can match at any level)
      if (!entry.startsWith("**/")) {
        entry = `**/${entry}`
      }
    } else if (slashPlacement === entry.length - 1) {
      // If there is a separator at the end of the pattern then it only matches directories
      // slash is in the end
      pathType = PATH_TYPE.DIRECTORY
    } else {
      // has `/` in the middle so it is a relative path
      // Check if it is a directory or file
      if (isPath(entry)) {
        pathType = await getPathType(gitIgnoreDirectory ? join(gitIgnoreDirectory, entry) : entry)
      }
    }
  }

  // prepend the absolute root directory
  if (gitIgnoreDirectory) {
    entry = `${posixifyPath(gitIgnoreDirectory)}/${entry}`
  }

  // swap !
  entry = forceInclude ? entry : `!${entry}`

  // Process the entry ending
  if (pathType === PATH_TYPE.DIRECTORY) {
    // in glob this is equal to `directory/**`
    if (entry.endsWith("/")) {
      return `${entry}**`
    } else {
      return `${entry}/**`
    }
  } else if (pathType === PATH_TYPE.FILE) {
    // return as is for file
    return entry
  } else if (!entry.endsWith("/**")) {
    // the pattern can match both files and directories
    // so we should include both `entry` and `entry/**`
    return [entry, `${entry}/**`]
  } else {
    return entry
  }
}

function isWhitespace(str: string) {
  return /^\s*$/.test(str)
}

/**
 * A line starting with # serves as a comment.
 * Put a backslash ("\") in front of the first hash for patterns that begin with a hash.
 */
function isGitIgnoreComment(pattern: string) {
  return pattern[0] === "#"
}

/**
 * Trailing spaces should be removed unless they are quoted with backslash ("\ ").
 */
function trimTrailingWhitespace(str: string) {
  if (!/\\\s+$/.test(str)) {
    // No escaped trailing whitespace, remove
    return str.replace(/\s+$/, "")
  } else {
    // Trailing whitespace detected, remove only the backslash
    return str.replace(/\\(\s+)$/, "$1")
  }
}

/** Remove leading whitespace */
function trimLeadingWhiteSpace(str: string) {
  return str.replace(/^\s+/, "")
}

/** Remove whitespace from a gitignore entry */
function trimWhiteSpace(str: string) {
  return trimLeadingWhiteSpace(trimTrailingWhitespace(str))
}

/** Enum that specifies the path type. 1 for directory, 2 for file, 0 for others */
enum PATH_TYPE {
  OTHER,
  DIRECTORY,
  FILE,
}

/** Get the type of the given path
 * @param {string} givenPath absolute path
 * @returns {Promise<PATH_TYPE>}
 */
async function getPathType(filepath: string): Promise<PATH_TYPE> {
  let pathStat
  try {
    pathStat = await stat(filepath)
  } catch (error) {
    return PATH_TYPE.OTHER
  }
  if (pathStat.isDirectory()) {
    return PATH_TYPE.DIRECTORY
  } else if (pathStat.isFile()) {
    return PATH_TYPE.FILE
  }
  return PATH_TYPE.OTHER
}
