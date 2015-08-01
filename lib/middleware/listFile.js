/**
 * Created by Pillar on 2015/6/27.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var folderUtil = require('../util/folder');
var render = require('../render');

// TODO: maybe we can put docRoot in app.locals
function listFile(docRoot) {

    return function (req, res, next) {
        var folder = path.join(docRoot, req.baseUrl);
        if(!fs.existsSync(folder)){
            res.status(404).send('folder ' + folder + ' doesn\'t exist');
            return;
        }

        var markdown = {content: '', toc: ''};
        var dir = folderUtil.readDir(folder);

        if (dir.readMe) {
            markdown = render.withToc(fs.readFileSync(dir.readMe, {encoding: 'UTF-8'}));
        }
        res.locals.dir = dir.files;
        res.locals.markdown = markdown;

        next();
    };
}


module.exports = listFile;