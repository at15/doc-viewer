/**
 * Created by Pillar on 2015/6/27.
 */
'use strict';

// TODO: list files and folders in the requested folder
function listFile(req, res, next) {
    // TODO: we always get '/' instead of the real uri.
    // Because it is mounted on that route, so the path is always /
    // use baseUrl instead.
    console.log('req.path is ' + req.path);
    console.log('req.url is ' + req.url);
    console.log('req.baseUrl is ' + req.baseUrl);
    next();
}

module.exports = listFile;