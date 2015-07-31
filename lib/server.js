/**
 * Created by Pillar on 2015/6/19.
 */
// the express server for the doc viewer.

/**
 * Created by Pillar on 2015/6/12.
 */

'use strict';
// node modules
var path = require('path');
var fs = require('fs');

var express = require('express');
var app = express();

// for log other util
var morgan = require('morgan');

var render = require('./render');
var folderUtil = require('./util/folder');
var regexpUtil = require('./util/regexp');

var middleware = require('./middleware/index');

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

    // use ejs, though we only have one js file.
    app.set('views', path.join(path.dirname(__filename), '../views'));
    app.set('view engine', 'ejs');

    // start log
    // TODO:disable log in global cli mode.
    app.use(morgan('tiny'));

    // static files are served first.
    app.use(express.static(path.join(path.dirname(__filename), '../public')));

    // TODO:split the route to files
    // the index page show the folder and the readme
    app.get('/', function (req, res) {
        res.render('folder', {
            dir: folderUtil.readDir(docRoot)
            // TODO: readme
        });
    });

    // match all url ends with md
    app.get(regexpUtil.mdFile, function (req, res) {
        var filePath = req.params[0];
        var fileName = path.basename(filePath);

        var fullFilePath = path.join(docRoot, filePath);
        // TODO:support folder
        // var readeMe = path.dirname(fileName) + '/README.md';
        if (!fs.existsSync(fullFilePath)) {
            res.status(404).send('file ' + fullFilePath + ' doesn\'t exist');
        } else {
            res.render('doc', {
                title: fileName,
                // TODO:render should return toc and markdown separately
                markdown: render.withToc(fs.readFileSync(fullFilePath, {encoding: 'UTF-8'}))
            });
        }
    });

    // must put this after route for markdown.
    app.use(express.static(docRoot));

    // get route for folder and show md
    app.use(regexpUtil.folder, middleware.listFile, function (req, res) {
        var folder = path.join(docRoot, req.params[0]);
        res.render('folder', {
            dir: folderUtil.readDir(folder)
            // TODO: readme
        });
    });

    app.listen(config.port);
    console.log('server init!');
};

module.exports = server;