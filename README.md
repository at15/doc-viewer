# doc-viewer

[![Build Status](https://travis-ci.org/at15/doc-viewer.svg?branch=master)](https://travis-ci.org/at15/doc-viewer)

![logo](public/doc-viewer.PNG)

View and edit your local markdown documentations in browser.

## Usage

- `npm install -g doc-viewer`
- run `doc-viewer` in the folder where you have your doc, it will start a server.
- `localhost:3000/fileName.md` to view rendered markdown
- it also works like the simple http server in python.

You can update current version using `npm update -g doc-viewer`

## Develop

- npm install NOTE: you have to run as admin in windows in order to install node-sass
- `gulp dev` to start server and enable watch, the express server will reload when file change, but you have
to hit f5 to refresh the client.

![screen](public/screen.PNG)

## RoadMap

- [x] simple render
- [x] a global command line. `npm install -g doc-viewer`, then you can use it like python's simple server
- [x] make links in markdown work.
- [x] toc support
- [ ] allow combine options, toc, highlight etc.
- [ ] parse all markdown file and generate html and search.
