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
