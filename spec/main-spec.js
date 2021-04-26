"use babel"
import { globifyGitIgnoreFile, globifyGitIgnore } from "../dist/main"
import dedent from "dedent"

describe("globify-gitignore", () => {
  describe("globifyGitIgnoreFile", () => {
    it("reads the gitignore and converts it to glob patterns", async () => {
      // current directory has a .gitignore file
      const dir = __dirname.replace(/\\/g, "/")
      const globPatterns = await globifyGitIgnoreFile(dir)
      expect(globPatterns).toEqual([
        `!${dir}/**/.DS_Store`,
        `!${dir}/**/Thumbs.db`,
        `!${dir}/**/node_modules`,
        `!${dir}/**/package-lock.json`,
        `!${dir}/**/*.tsbuildinfo`,
        `!${dir}/**/dist`,
        `!${dir}/**/.DS_Store/**`,
        `!${dir}/**/Thumbs.db/**`,
        `!${dir}/**/node_modules/**`,
        `!${dir}/**/package-lock.json/**`,
        `!${dir}/**/*.tsbuildinfo/**`,
        `!${dir}/**/dist/**`,
      ])
    })
  })
  describe("globifyGitIgnore", () => {
    it("converts it to glob patterns", async () => {
      // current directory has a .gitignore file
      const dir = __dirname.replace(/\\/g, "/")
      const globPatterns = await globifyGitIgnore(
        dedent`# OS metadata
        .DS_Store
        Thumbs.db

        # Node
        node_modules
        package-lock.json

        # TypeScript
        *.tsbuildinfo

        # Build directories
        dist
        `,
        __dirname
      )
      expect(globPatterns).toEqual([
        `!${dir}/**/.DS_Store`,
        `!${dir}/**/Thumbs.db`,
        `!${dir}/**/node_modules`,
        `!${dir}/**/package-lock.json`,
        `!${dir}/**/*.tsbuildinfo`,
        `!${dir}/**/dist`,
        `!${dir}/**/.DS_Store/**`,
        `!${dir}/**/Thumbs.db/**`,
        `!${dir}/**/node_modules/**`,
        `!${dir}/**/package-lock.json/**`,
        `!${dir}/**/*.tsbuildinfo/**`,
        `!${dir}/**/dist/**`,
      ])
    })
  })
})
