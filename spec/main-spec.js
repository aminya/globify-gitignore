"use babel"
import { globifyGitIgnoreFile } from "../dist/main"

describe("globify-gitignore", () => {
  describe("globifyGitIgnoreFile", () => {
    it("reads the gitignore and converts it to glob patterns", async () => {
      // current directory has a .gitignore file
      const dir = __dirname.replace(/\\/g, '/')
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
        `!${dir}/**/dist/**`
      ])
    })
  })
})
