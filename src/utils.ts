import { byString, byValue } from "sort-es"
import unique from "make-unique"
import { GlobifiedEntry } from "./main"

export function getGlob(g: GlobifiedEntry) {
  return g.glob
}
export const globSorter = byValue(getGlob, byString())

export function uniqueMatcher(a: GlobifiedEntry, b: GlobifiedEntry) {
  return a.glob === b.glob
}

export function uniqueGlobs(globs: GlobifiedEntry[]) {
  return unique(globs, uniqueMatcher)
}

export function uniqueSortGlobs(globs: GlobifiedEntry[]) {
  return uniqueGlobs(globs).sort(globSorter)
}
