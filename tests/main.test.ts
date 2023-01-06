/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { globifyGitIgnoreFile, globifyGitIgnore } from "../src/main"
import { join } from "path"
import { writeFile } from "fs/promises"
import { directory as fixtureDirectory, expectedAbsolute, expectedRelative, input } from "./fixtures"

import { uniqueSortGlobs } from "../src/utils"

describe("globify-gitignore", () => {
  describe("globifyGitIgnoreFile", () => {
    it("reads the gitignore and converts it to absolute glob patterns", async () => {
      await writeFile(join(fixtureDirectory, ".gitignore"), input)
      const globPatterns = await globifyGitIgnoreFile(fixtureDirectory, true)
      expect(uniqueSortGlobs(globPatterns)).toEqual(expectedAbsolute)
    })
    it("reads the gitignore and converts it to relative glob patterns", async () => {
      await writeFile(join(fixtureDirectory, ".gitignore"), input)
      const globPatterns = await globifyGitIgnoreFile(fixtureDirectory)
      expect(uniqueSortGlobs(globPatterns)).toEqual(expectedRelative)
    })
  })
  describe("globifyGitIgnore", () => {
    it("converts to absolute glob patterns", async () => {
      const globPatterns = await globifyGitIgnore(input, fixtureDirectory, true)
      expect(uniqueSortGlobs(globPatterns)).toEqual(expectedAbsolute)
    })
    it("converts to relative glob patterns", async () => {
      await writeFile(join(fixtureDirectory, ".gitignore"), input)
      const globPatterns = await globifyGitIgnore(input)
      expect(uniqueSortGlobs(globPatterns)).toEqual(expectedRelative)
    })
  })
})
