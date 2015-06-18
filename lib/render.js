/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';

var marked = require('marked');
var highlightjs = require('highlight.js');
var toc = require('./toc');
var rendererToc = new marked.Renderer();

rendererToc.headingOld = rendererToc.heading;
rendererToc.heading = function (text, level) {
    toc.add(text, level);
    return '<h' + level + ' id="' + text + '">' + text + '</h' + level + '>';
};

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

function useToc(text) {
    toc.start();
    var s = marked(text, {
        gfm: true,
        renderer: rendererToc,
        highlight: function (code) {
            return highlightjs.highlightAuto(code).value;
        }
    });
    var ul = toc.render(toc.result());
    return ul + s;
}

module.exports = {
    gfm: gfm,
    noGfm: noGfm,
    highlight: highlight,
    useToc: useToc
};