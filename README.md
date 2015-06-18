# doc-viewer

[![Build Status](https://travis-ci.org/at15/doc-viewer.svg?branch=master)](https://travis-ci.org/at15/doc-viewer)

View and edit your local markdown documentations in browser.

## Develop

- npm install
- `node index.js` to start server
- `localhost:3000/doc?f=README.md` and you will see a markdown doc with toc and code highlight.

## RoadMap

- [x] simple render
- [ ] allow combine options, toc, highlight etc.
- [ ] make links in markdown work.
- [ ] parse all markdown file and generate html and search.
- [ ] a global command line. `npm install -g doc-viewer`, then you can use it like python's simple server
