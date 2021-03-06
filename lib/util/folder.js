/**
 * Created by Pillar on 2015/6/20.
 */
// a util to traverse folder and filter files
'use strict';
var fs = require('fs');
var path = require('path');

// read one layer
// TODO:add readme.md
function readDir(dir) {
    var files = [];
    var root = fs.readdirSync(dir);
    var readMe = false;
    for (var i = 0; i < root.length; i++) {
        var filePath = dir + '/' + root[i];
        var stat = fs.statSync(filePath);
        //console.log(filePath,dir);
        filePath = path.relative(dir, filePath);
        if (stat && stat.isDirectory()) {
            files.push({
                dir: true,
                path: filePath
            });
        } else {
            files.push({
                dir: false,
                path: filePath
            });
        }

        // check if it is readme
        if(root[i].toLowerCase() === 'readme.md'){
            readMe = dir + '/' + root[i];
        }
    }
    return {
        files: files,
        readMe : readMe
    };
}

// do a bfs search to certain folder with ceratin depth
function bfs() {
    // TODO:
}

function dfs(dir) {
    var result = [];
    var root = fs.readdirSync(dir);
    for (var i = 0; i < root.length; i++) {
        var filePath = dir + '/' + root[i];
        var stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            result = result.concat(dfs(filePath));
        } else {
            result.push(filePath);
        }
    }
    return result;
}

module.exports = {
    bfs: bfs,
    dfs: dfs,
    readDir: readDir
};