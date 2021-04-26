"use babel"
import { globifyGitIgnoreFile, globifyGitIgnore } from "../dist/main"
import { join } from "path"
import { promises } from "fs"
const { writeFile } = promises

// current directory has a .gitignore file
const dir = join(__dirname, "fixtures").replace(/\\/g, "/")

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

const output = [
  `!${dir}/**/.DS_Store`,
  `!${dir}/**/Thumbs.db`,
  `!${dir}/**/node_modules`,
  `!${dir}/**/package-lock.json`,
  `!${dir}/**/*.tsbuildinfo`,
  `!${dir}/**/dist`,
  `!${dir}/**/*.dll`,
  `!${dir}/**/*.exe`,
  `!${dir}/**/*.cmd`,
  `!${dir}/**/*.pdb`,
  `!${dir}/**/*.suo`,
  `!${dir}/**/*.js`,
  `!${dir}/**/*.user`,
  `!${dir}/**/*.cache`,
  `!${dir}/**/*.cs`,
  `!${dir}/**/*.sln`,
  `!${dir}/**/*.csproj`,
  `!${dir}/**/*.map`,
  `!${dir}/**/*.swp`,
  `!${dir}/**/*.code-workspace`,
  `!${dir}/**/*.log`,
  `!${dir}/**/_Resharper.DefinitelyTyped`,
  `!${dir}/**/bin`,
  `!${dir}/**/obj`,
  `!${dir}/**/Properties`,
  `!${dir}/**/*~`,
  `!${dir}/_infrastructure/tests/build`,
  `!${dir}/**/.idea`,
  `!${dir}/**/*.iml`,
  `!${dir}/**/*.js.map`,
  `${dir}/*.js/**`,
  `${dir}/scripts/new-package.js`,
  `${dir}/scripts/not-needed.js`,
  `${dir}/scripts/lint.js`,
  `!${dir}/**/npm-debug.log`,
  `!${dir}/**/.sublimets`,
  `!${dir}/.settings/launch.json`,
  `!${dir}/**/.vs`,
  `!${dir}/**/.vscode`,
  `!${dir}/**/.history`,
  `!${dir}/**/yarn.lock`,
  `!${dir}/**/shrinkwrap.yaml`,
  `!${dir}/**/pnpm-lock.yaml`,
  `!${dir}/**/pnpm-debug.log`,
  `!${dir}/**/*.tgz`,
  `!${dir}/**/.DS_Store/**`,
  `!${dir}/**/Thumbs.db/**`,
  `!${dir}/**/node_modules/**`,
  `!${dir}/**/package-lock.json/**`,
  `!${dir}/**/*.tsbuildinfo/**`,
  `!${dir}/**/dist/**`,
  `!${dir}/**/*.dll/**`,
  `!${dir}/**/*.exe/**`,
  `!${dir}/**/*.cmd/**`,
  `!${dir}/**/*.pdb/**`,
  `!${dir}/**/*.suo/**`,
  `!${dir}/**/*.js/**`,
  `!${dir}/**/*.user/**`,
  `!${dir}/**/*.cache/**`,
  `!${dir}/**/*.cs/**`,
  `!${dir}/**/*.sln/**`,
  `!${dir}/**/*.csproj/**`,
  `!${dir}/**/*.map/**`,
  `!${dir}/**/*.swp/**`,
  `!${dir}/**/*.code-workspace/**`,
  `!${dir}/**/*.log/**`,
  `!${dir}/**/_Resharper.DefinitelyTyped/**`,
  `!${dir}/**/bin/**`,
  `!${dir}/**/obj/**`,
  `!${dir}/**/Properties/**`,
  `!${dir}/**/*~/**`,
  `!${dir}/_infrastructure/tests/build/**`,
  `!${dir}/**/.idea/**`,
  `!${dir}/**/*.iml/**`,
  `!${dir}/**/*.js.map/**`,
  `${dir}/scripts/new-package.js/**`,
  `${dir}/scripts/not-needed.js/**`,
  `${dir}/scripts/lint.js/**`,
  `!${dir}/**/npm-debug.log/**`,
  `!${dir}/**/.sublimets/**`,
  `!${dir}/.settings/launch.json/**`,
  `!${dir}/**/.vs/**`,
  `!${dir}/**/.vscode/**`,
  `!${dir}/**/.history/**`,
  `!${dir}/**/yarn.lock/**`,
  `!${dir}/**/shrinkwrap.yaml/**`,
  `!${dir}/**/pnpm-lock.yaml/**`,
  `!${dir}/**/pnpm-debug.log/**`,
  `!${dir}/**/*.tgz/**`,
]

describe("globify-gitignore", () => {
  describe("globifyGitIgnoreFile", () => {
    it("reads the gitignore and converts it to glob patterns", async () => {
      await writeFile(join(dir, ".gitignore"), input)
      const globPatterns = await globifyGitIgnoreFile(dir)
      expect(globPatterns).toEqual(output)
    })
  })
  describe("globifyGitIgnore", () => {
    it("converts it to glob patterns", async () => {
      const globPatterns = await globifyGitIgnore(input, dir)
      expect(globPatterns).toEqual(output)
    })
  })
})
