# doc-viewer

[![Build Status](https://travis-ci.org/at15/doc-viewer.svg?branch=master)](https://travis-ci.org/at15/doc-viewer)

View and edit your local markdown documentations in browser.

## Usage

- `npm install -g doc-viewer`
- run `doc-viewer` in the folder where you have your doc, it will start a server.
- `localhost:3000/fileName.md` to view rendered markdown
- it also works like the simple http server in python.

You can update current version using `npm update -g doc-viewer`

## Develop

- npm install NOTE: you have to run as admin in windows in order to install node-sass
- `node index.js` to start server
- `localhost:3000/README.md` and you will see the markdown in this projects `doc` folder

![screen](public/screen.PNG)

## RoadMap

- [x] simple render
- [ ] allow combine options, toc, highlight etc.
- [x] make links in markdown work.
- [ ] parse all markdown file and generate html and search.
- [x] a global command line. `npm install -g doc-viewer`, then you can use it like python's simple server
