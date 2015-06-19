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
    // TODO: also make static folder configurable?
    app.use(express.static('public'));
    app.get('/doc', function (req, res) {
        var docRoot = config.docRoot;
        var fileName = path.join(docRoot, req.query.f);
        console.log('get request for file ', fileName);
        // TODO:support folder
        //var readeMe = path.dirname(fileName) + '/README.md';
        if (!fs.existsSync(fileName)) {
            res.status(404).send('file ' + fileName + ' doesn\'t exist');
        } else {
            res.status(200).send(
                //render.highlight(fs.readFileSync(fileName, {encoding: 'UTF-8'}))
                '<html><head><title>demo</title><link rel="stylesheet" href="default.css"/></head><body>' +
                render.useToc(fs.readFileSync(fileName, {encoding: 'UTF-8'})) + '</body></html>'
            );
        }
    });

    app.listen(config.port);
    console.log('server init!');
};

module.exports = server;