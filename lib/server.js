/**
 * Created by Pillar on 2015/6/19.
 */
// the express server for the doc viewer.

/**
 * Created by Pillar on 2015/6/12.
 */

'use strict';
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var render = require('./render');

var server = {};
var config = {
    docRoot: './doc',
    port: 3000
};

server.setDocRoot = function (docRoot) {
    config.docRoot = docRoot;
};

server.setPort = function (port) {
    config.port = port;
};

server.start = function () {
    var docRoot = config.docRoot;

    // static files are served first.
    app.use(express.static(path.join(path.dirname(__filename), '../public')));

    // match all url ends with md
    app.get(/^\/(.*\.md)/, function (req, res) {
        var filePath = req.params[0];
        var fileName = path.basename(filePath);

        var fullFilePath = path.join(docRoot, filePath);
        //// TODO:support folder
        ////var readeMe = path.dirname(fileName) + '/README.md';
        if (!fs.existsSync(fullFilePath)) {
            res.status(404).send('file ' + fullFilePath + ' doesn\'t exist');
        } else {
            // TODO: use a template engine
            res.status(200).send(
                //render.highlight(fs.readFileSync(fileName, {encoding: 'UTF-8'}))
                '<html><head><title>' + fileName + '</title><link rel="stylesheet" href="default.css"/></head><body>' +
                render.useToc(fs.readFileSync(fullFilePath, {encoding: 'UTF-8'})) + '</body></html>'
            );
        }
    });

    // must put this after route for markdown.
    app.use(express.static(docRoot));

    app.listen(config.port);
    console.log('server init!');
};

module.exports = server;