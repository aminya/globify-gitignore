<!-- Generated via running `pnpm run docs` -->

<h1 align="center"><%= projectName %></h1>
<p>
  <a href="https://github.com/aminya/patha/actions/workflows/CI.yml" target="_blank">
    <img alt="CI" src="https://github.com/aminya/patha/actions/workflows/CI.yml/badge.svg">
  </a>
<% if (isProjectOnNpm) { -%>
  <a href="https://www.npmjs.com/package/<%= projectName %>" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/<%= projectName %>.svg">
  </a>
<% } -%>
<% if (projectVersion && !isProjectOnNpm) { -%>
  <img alt="Version" src="https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000" />
<% } -%>
<% if (projectPrerequisites) { -%>
<% projectPrerequisites.map(({ name, value }) => { -%>
  <img src="https://img.shields.io/badge/<%= name %>-<%= encodeURIComponent(value) %>-blue.svg" />
<% }) -%>
<% } -%>
<% if (projectDocumentationUrl) { -%>
  <a href="<%= projectDocumentationUrl %>" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
<% } -%>
<% if (isGithubRepos) { -%>
  <a href="<%= repositoryUrl %>/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
<% } -%>
<% if (licenseName) { -%>
  <a href="<%= licenseUrl ? licenseUrl : '#' %>" target="_blank">
    <img alt="License: <%= licenseName %>" src="https://img.shields.io/<%= isGithubRepos ? `github/license/${authorGithubUsername}/${projectName}` : `badge/License-${licenseName}-yellow.svg` %>" />
  </a>
<% } -%>
<% if (authorTwitterUsername) { -%>
  <a href="https://twitter.com/<%= authorTwitterUsername %>" target="_blank">
    <img alt="Twitter: <%= authorTwitterUsername %>" src="https://img.shields.io/twitter/follow/<%= authorTwitterUsername %>.svg?style=social" />
  </a>
<% } -%>
</p>
<% if (projectDescription) { -%>

> <%= projectDescription %>
> <% } -%>

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [🤝 Contributing](#contributing)

<!-- /code_chunk_output -->

## Install

```sh
npm install --save <%= projectName %>
```

`globify-gitignore` is tiny and treeshakable.

## Usage

Use `globifyGitIgnoreFile` to pass the path to a directory that has a `.gitignore` file.

```ts
import { globifyGitIgnoreFile, globifyGitIgnore } from "globify-gitignore"

// ./ is the path that has a .gitignore
globifyGitIgnoreFile("./")
```

Use `globifyGitIgnore` to directly globify the gitignore content

```ts
import { globifyGitIgnore } from "globify-gitignore"

const gitignoreContent = `# OS metadata
.DS_Store
Thumbs.db

# Node
node_modules
package-lock.json

# TypeScript
*.tsbuildinfo

# Build directories
dist
`
const gitignoreDirectory = __dirname

const globPatterns = await globifyGitIgnore(gitignoreContent, gitignoreDirectory)
```

## API

<!-- INSERT GENERATED DOCS START -->

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/patha/blob/master/CONTRIBUTING.md).
