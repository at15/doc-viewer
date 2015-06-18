/**
 * Created by Pillar on 2015/6/12.
 */

'use strict';
// TODO: config
var docRoot = './doc';
var port = 3000;

console.log(docRoot);

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var render = require('./lib/render');

app.use(express.static('public'));
app.get('/doc', function (req, res) {
    var fileName = path.join(docRoot, req.query.f);
    console.log('get request for file ', fileName);
    // TODO:support folder
    //var readeMe = path.dirname(fileName) + '/README.md';
    if (!fs.existsSync(fileName)) {
        res.status(404).send('file ' + fileName + 'doesn\'t exist');
    } else {
        res.status(200).send(
            //render.highlight(fs.readFileSync(fileName, {encoding: 'UTF-8'}))
            render.useToc(fs.readFileSync(fileName, {encoding: 'UTF-8'}))
        );
    }
});

app.listen(port);
console.log('server init!');