/**
 * Created by Pillar on 2015/6/27.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var folderUtil = require('../util/folder');
var render = require('../render');

function listFile(docRoot) {

    return function (req, res, next) {
        var folder = path.join(docRoot, req.baseUrl);
        var markdown = {content: '', toc: ''};
        var dir = folderUtil.readDir(folder);

        res.locals.dir = dir.files;
        console.log('dir.readMe is ' + dir.readMe);
        if (dir.readMe) {
            markdown = render.withToc(fs.readFileSync(dir.readMe, {encoding: 'UTF-8'}));
        }
        res.locals.markdown = markdown;

        next();
    };
}


module.exports = listFile;