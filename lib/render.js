/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';

var marked = require('marked');
var highlightjs = require('highlight.js');
//var rendererToc = new marked.Renderer();

function gfm(text) {
    return marked(text, {gfm: true});
}

function noGfm(text) {
    return marked(text, {gfm: false});
}

function highlight(text) {
    return marked(text, {
        gfm: true,
        highlight: function (code) {
            return highlightjs.highlightAuto(code).value;
        }
    });
}

module.exports = {
    gfm: gfm,
    noGfm: noGfm,
    highlight: highlight
};