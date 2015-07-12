/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';

var marked = require('marked');
var highlightjs = require('highlight.js');
var toc = require('./util/toc');
var rendererToc = new marked.Renderer();

rendererToc.headingOld = rendererToc.heading;
rendererToc.heading = function (text, level) {
    toc.add(text, level);
    return '<h' + level + ' id="' + text + '">' + text + '</h' + level + '>';
};

function highlightCode(code) {
    return highlightjs.highlightAuto(code).value;
}

function render(text, opt) {
    var optForMarked = {};
    if (opt.gfm) {
        optForMarked.gfm = true;
    } else {
        optForMarked.gfm = false;
    }
    if (opt.highlight) {
        optForMarked.highlight = highlightCode;
    }
    return marked(text, optForMarked);
}

function gfm(text) {
    return render(text, {gfm: true});
}

function noGfm(text) {
    return render(text, {gfm: false});
}

function highlight(text) {
    return render(text, {gfm: true, highlight: true});
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
    return {
        toc: ul,
        content: s
    };
}

module.exports = {
    gfm: gfm,
    noGfm: noGfm,
    highlight: highlight,
    useToc: useToc
};