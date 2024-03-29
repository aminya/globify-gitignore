/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { posixifyPathNormalized } from "../../src/main"
import { globSorter } from "../../src/utils"

// current directory has a .gitignore file
export const directory = posixifyPathNormalized(__dirname)

// change the current working directory to directory
// so that the relative directories are resolved correctly
process.chdir(directory)

export const input = `
/relative
/relative_directory/
/relative_directory_2
/relative_file
/relative_file_2

# OS metadata
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

export function expected(dirPrefixGiven: string = "") {
  let dirPrefix = dirPrefixGiven
  if (dirPrefix !== "") {
    dirPrefix = `${dirPrefix}/`
  }

  return [
    { included: false, glob: `${dirPrefix}relative` },
    { included: false, glob: `${dirPrefix}relative/**` },
    { included: false, glob: `${dirPrefix}relative_directory/**` },
    { included: false, glob: `${dirPrefix}relative_directory_2/**` },
    { included: false, glob: `${dirPrefix}relative_file` },
    { included: false, glob: `${dirPrefix}relative_file_2` },
    { included: false, glob: `${dirPrefix}relative_file_2/**` },
    { included: false, glob: `${dirPrefix}_infrastructure/tests/build/**` },
    { included: false, glob: `${dirPrefix}_infrastructure/tests/build` },
    { included: false, glob: `${dirPrefix}.settings/launch.json/**` },
    { included: false, glob: `${dirPrefix}.settings/launch.json` },
    { included: false, glob: `${dirPrefix}**/_Resharper.DefinitelyTyped/**` },
    { included: false, glob: `${dirPrefix}**/_Resharper.DefinitelyTyped` },
    { included: false, glob: `${dirPrefix}**/.DS_Store/**` },
    { included: false, glob: `${dirPrefix}**/.DS_Store` },
    { included: false, glob: `${dirPrefix}**/.history/**` },
    { included: false, glob: `${dirPrefix}**/.history` },
    { included: false, glob: `${dirPrefix}**/.idea/**` },
    { included: false, glob: `${dirPrefix}**/.idea` },
    { included: false, glob: `${dirPrefix}**/.sublimets/**` },
    { included: false, glob: `${dirPrefix}**/.sublimets` },
    { included: false, glob: `${dirPrefix}**/.vs/**` },
    { included: false, glob: `${dirPrefix}**/.vs` },
    { included: false, glob: `${dirPrefix}**/.vscode/**` },
    { included: false, glob: `${dirPrefix}**/.vscode` },
    { included: false, glob: `${dirPrefix}**/*.cache/**` },
    { included: false, glob: `${dirPrefix}**/*.cache` },
    { included: false, glob: `${dirPrefix}**/*.cmd/**` },
    { included: false, glob: `${dirPrefix}**/*.cmd` },
    { included: false, glob: `${dirPrefix}**/*.code-workspace/**` },
    { included: false, glob: `${dirPrefix}**/*.code-workspace` },
    { included: false, glob: `${dirPrefix}**/*.cs/**` },
    { included: false, glob: `${dirPrefix}**/*.cs` },
    { included: false, glob: `${dirPrefix}**/*.csproj/**` },
    { included: false, glob: `${dirPrefix}**/*.csproj` },
    { included: false, glob: `${dirPrefix}**/*.dll/**` },
    { included: false, glob: `${dirPrefix}**/*.dll` },
    { included: false, glob: `${dirPrefix}**/*.exe/**` },
    { included: false, glob: `${dirPrefix}**/*.exe` },
    { included: false, glob: `${dirPrefix}**/*.iml/**` },
    { included: false, glob: `${dirPrefix}**/*.iml` },
    { included: false, glob: `${dirPrefix}**/*.js.map/**` },
    { included: false, glob: `${dirPrefix}**/*.js.map` },
    { included: false, glob: `${dirPrefix}**/*.js/**` },
    { included: false, glob: `${dirPrefix}**/*.js` },
    { included: false, glob: `${dirPrefix}**/*.log/**` },
    { included: false, glob: `${dirPrefix}**/*.log` },
    { included: false, glob: `${dirPrefix}**/*.map/**` },
    { included: false, glob: `${dirPrefix}**/*.map` },
    { included: false, glob: `${dirPrefix}**/*.pdb/**` },
    { included: false, glob: `${dirPrefix}**/*.pdb` },
    { included: false, glob: `${dirPrefix}**/*.sln/**` },
    { included: false, glob: `${dirPrefix}**/*.sln` },
    { included: false, glob: `${dirPrefix}**/*.suo/**` },
    { included: false, glob: `${dirPrefix}**/*.suo` },
    { included: false, glob: `${dirPrefix}**/*.swp/**` },
    { included: false, glob: `${dirPrefix}**/*.swp` },
    { included: false, glob: `${dirPrefix}**/*.tgz/**` },
    { included: false, glob: `${dirPrefix}**/*.tgz` },
    { included: false, glob: `${dirPrefix}**/*.tsbuildinfo/**` },
    { included: false, glob: `${dirPrefix}**/*.tsbuildinfo` },
    { included: false, glob: `${dirPrefix}**/*.user/**` },
    { included: false, glob: `${dirPrefix}**/*.user` },
    { included: false, glob: `${dirPrefix}**/*~/**` },
    { included: false, glob: `${dirPrefix}**/*~` },
    { included: false, glob: `${dirPrefix}**/bin/**` },
    { included: false, glob: `${dirPrefix}**/bin` },
    { included: false, glob: `${dirPrefix}**/dist/**` },
    { included: false, glob: `${dirPrefix}**/dist` },
    { included: false, glob: `${dirPrefix}**/node_modules/**` },
    { included: false, glob: `${dirPrefix}**/node_modules` },
    { included: false, glob: `${dirPrefix}**/npm-debug.log/**` },
    { included: false, glob: `${dirPrefix}**/npm-debug.log` },
    { included: false, glob: `${dirPrefix}**/obj/**` },
    { included: false, glob: `${dirPrefix}**/obj` },
    { included: false, glob: `${dirPrefix}**/package-lock.json/**` },
    { included: false, glob: `${dirPrefix}**/package-lock.json` },
    { included: false, glob: `${dirPrefix}**/pnpm-debug.log/**` },
    { included: false, glob: `${dirPrefix}**/pnpm-debug.log` },
    { included: false, glob: `${dirPrefix}**/pnpm-lock.yaml/**` },
    { included: false, glob: `${dirPrefix}**/pnpm-lock.yaml` },
    { included: false, glob: `${dirPrefix}**/Properties/**` },
    { included: false, glob: `${dirPrefix}**/Properties` },
    { included: false, glob: `${dirPrefix}**/shrinkwrap.yaml/**` },
    { included: false, glob: `${dirPrefix}**/shrinkwrap.yaml` },
    { included: false, glob: `${dirPrefix}**/Thumbs.db/**` },
    { included: false, glob: `${dirPrefix}**/Thumbs.db` },
    { included: false, glob: `${dirPrefix}**/yarn.lock/**` },
    { included: false, glob: `${dirPrefix}**/yarn.lock` },
    { included: true, glob: `${dirPrefix}*.js/**` },
    { included: true, glob: `${dirPrefix}scripts/lint.js/**` },
    { included: true, glob: `${dirPrefix}scripts/lint.js` },
    { included: true, glob: `${dirPrefix}scripts/new-package.js/**` },
    { included: true, glob: `${dirPrefix}scripts/new-package.js` },
    { included: true, glob: `${dirPrefix}scripts/not-needed.js/**` },
    { included: true, glob: `${dirPrefix}scripts/not-needed.js` },
  ]
}

export const expectedAbsolute = expected(directory).sort(globSorter)
export const expectedRelative = expected().sort(globSorter)
