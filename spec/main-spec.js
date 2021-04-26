"use babel"
import { globifyGitIgnoreFile, globifyGitIgnore, posixifyPathNormalized } from "../dist/main"
import { join } from "path"
import { promises } from "fs"
const { writeFile } = promises

// current directory has a .gitignore file
const dir = posixifyPathNormalized(join(__dirname, "fixtures"))

const input = `# OS metadata
.DS_Store
Thumbs.db

# Node
node_modules
package-lock.json

# TypeScript
*.tsbuildinfo

# Build directories
dist

*.dll
*.exe
*.cmd
*.pdb
*.suo
*.js
*.user
*.cache
*.cs
*.sln
*.csproj
*.map
*.swp
*.code-workspace
*.log
.DS_Store

_Resharper.DefinitelyTyped
bin
obj
Properties

# VIM backup files
*~

# test folder
_infrastructure/tests/build

# IntelliJ based IDEs
.idea
*.iml

*.js.map
!*.js/
!scripts/new-package.js
!scripts/not-needed.js
!scripts/lint.js

# npm
node_modules
package-lock.json
npm-debug.log

# Sublime
.sublimets

# Visual Studio Code
.settings/launch.json
.vs
.vscode
.history

# yarn
yarn.lock

# pnpm
shrinkwrap.yaml
pnpm-lock.yaml
pnpm-debug.log

# Output of 'npm pack'
*.tgz
`

function output(givenDir) {
  let dirPrefix = ""
  if (typeof givenDir === "string") {
    dirPrefix = `${givenDir}/`
  }
  return [
    `!${dirPrefix}**/.DS_Store`,
    `!${dirPrefix}**/Thumbs.db`,
    `!${dirPrefix}**/node_modules`,
    `!${dirPrefix}**/package-lock.json`,
    `!${dirPrefix}**/*.tsbuildinfo`,
    `!${dirPrefix}**/dist`,
    `!${dirPrefix}**/*.dll`,
    `!${dirPrefix}**/*.exe`,
    `!${dirPrefix}**/*.cmd`,
    `!${dirPrefix}**/*.pdb`,
    `!${dirPrefix}**/*.suo`,
    `!${dirPrefix}**/*.js`,
    `!${dirPrefix}**/*.user`,
    `!${dirPrefix}**/*.cache`,
    `!${dirPrefix}**/*.cs`,
    `!${dirPrefix}**/*.sln`,
    `!${dirPrefix}**/*.csproj`,
    `!${dirPrefix}**/*.map`,
    `!${dirPrefix}**/*.swp`,
    `!${dirPrefix}**/*.code-workspace`,
    `!${dirPrefix}**/*.log`,
    `!${dirPrefix}**/_Resharper.DefinitelyTyped`,
    `!${dirPrefix}**/bin`,
    `!${dirPrefix}**/obj`,
    `!${dirPrefix}**/Properties`,
    `!${dirPrefix}**/*~`,
    `!${dirPrefix}_infrastructure/tests/build`,
    `!${dirPrefix}**/.idea`,
    `!${dirPrefix}**/*.iml`,
    `!${dirPrefix}**/*.js.map`,
    `${dirPrefix}*.js/**`,
    `${dirPrefix}scripts/new-package.js`,
    `${dirPrefix}scripts/not-needed.js`,
    `${dirPrefix}scripts/lint.js`,
    `!${dirPrefix}**/npm-debug.log`,
    `!${dirPrefix}**/.sublimets`,
    `!${dirPrefix}.settings/launch.json`,
    `!${dirPrefix}**/.vs`,
    `!${dirPrefix}**/.vscode`,
    `!${dirPrefix}**/.history`,
    `!${dirPrefix}**/yarn.lock`,
    `!${dirPrefix}**/shrinkwrap.yaml`,
    `!${dirPrefix}**/pnpm-lock.yaml`,
    `!${dirPrefix}**/pnpm-debug.log`,
    `!${dirPrefix}**/*.tgz`,
    `!${dirPrefix}**/.DS_Store/**`,
    `!${dirPrefix}**/Thumbs.db/**`,
    `!${dirPrefix}**/node_modules/**`,
    `!${dirPrefix}**/package-lock.json/**`,
    `!${dirPrefix}**/*.tsbuildinfo/**`,
    `!${dirPrefix}**/dist/**`,
    `!${dirPrefix}**/*.dll/**`,
    `!${dirPrefix}**/*.exe/**`,
    `!${dirPrefix}**/*.cmd/**`,
    `!${dirPrefix}**/*.pdb/**`,
    `!${dirPrefix}**/*.suo/**`,
    `!${dirPrefix}**/*.js/**`,
    `!${dirPrefix}**/*.user/**`,
    `!${dirPrefix}**/*.cache/**`,
    `!${dirPrefix}**/*.cs/**`,
    `!${dirPrefix}**/*.sln/**`,
    `!${dirPrefix}**/*.csproj/**`,
    `!${dirPrefix}**/*.map/**`,
    `!${dirPrefix}**/*.swp/**`,
    `!${dirPrefix}**/*.code-workspace/**`,
    `!${dirPrefix}**/*.log/**`,
    `!${dirPrefix}**/_Resharper.DefinitelyTyped/**`,
    `!${dirPrefix}**/bin/**`,
    `!${dirPrefix}**/obj/**`,
    `!${dirPrefix}**/Properties/**`,
    `!${dirPrefix}**/*~/**`,
    `!${dirPrefix}_infrastructure/tests/build/**`,
    `!${dirPrefix}**/.idea/**`,
    `!${dirPrefix}**/*.iml/**`,
    `!${dirPrefix}**/*.js.map/**`,
    `${dirPrefix}scripts/new-package.js/**`,
    `${dirPrefix}scripts/not-needed.js/**`,
    `${dirPrefix}scripts/lint.js/**`,
    `!${dirPrefix}**/npm-debug.log/**`,
    `!${dirPrefix}**/.sublimets/**`,
    `!${dirPrefix}.settings/launch.json/**`,
    `!${dirPrefix}**/.vs/**`,
    `!${dirPrefix}**/.vscode/**`,
    `!${dirPrefix}**/.history/**`,
    `!${dirPrefix}**/yarn.lock/**`,
    `!${dirPrefix}**/shrinkwrap.yaml/**`,
    `!${dirPrefix}**/pnpm-lock.yaml/**`,
    `!${dirPrefix}**/pnpm-debug.log/**`,
    `!${dirPrefix}**/*.tgz/**`,
  ]
}

describe("globify-gitignore", () => {
  describe("globifyGitIgnoreFile", () => {
    it("reads the gitignore and converts it to glob patterns", async () => {
      await writeFile(join(dir, ".gitignore"), input)
      const globPatterns = await globifyGitIgnoreFile(dir)
      expect(globPatterns).toEqual(output(dir))
    })
  })
  describe("globifyGitIgnore", () => {
    it("converts it to glob patterns", async () => {
      const globPatterns = await globifyGitIgnore(input, dir)
      expect(globPatterns).toEqual(output(dir))
    })
    it("uses no dir prefix if only the content is passed", async () => {
      await writeFile(join(dir, ".gitignore"), input)
      const globPatterns = await globifyGitIgnore(input)
      expect(globPatterns).toEqual(output())
    })
  })
})
