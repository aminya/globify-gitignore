import { join, normalize } from "path"
import { promises } from "fs"
const { readFile, stat } = promises
import isPath from "is-valid-path"
import { unique } from "./utils"

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
