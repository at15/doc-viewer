/**
 * Created by Pillar on 2015/6/27.
 */
'use strict';

var path = require('path');
var folderUtil = require('../util/folder');

function listFile(docRoot) {

    return function (req, res, next) {
        // TODO: we always get '/' instead of the real uri.
        // Because it is mounted on that route, so the path is always /
        // use baseUrl instead.
        //console.log('req.path is ' + req.path);
        //console.log('req.url is ' + req.url);
        //console.log('req.baseUrl is ' + req.baseUrl);
        var folder = path.join(docRoot, req.baseUrl);
        res.locals.dir = folderUtil.readDir(folder);
        next();
    };
}


module.exports = listFile;