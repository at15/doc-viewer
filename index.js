/**
 * Created by Pillar on 2015/6/12.
 */

// TODO: config
var docRoot = "./doc";
var port = 3000;

console.log(docRoot);

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(port);