/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';

var marked = require('marked');
var highlightjs = require('highlight.js');
var toc = require('./util/toc');
var TocRenderer = require('./renderer/toc-renderer');

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
    if (opt.customRenderer) {
        optForMarked.renderer = opt.customRenderer;
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

function withToc(text) {
    // TODO:refactor the toc start.
    toc.start();
    var content = render(text,
        {gfm: true, highlight: true, customRenderer: new TocRenderer()}
    );
    var renderedToc = toc.render(toc.result());
    return {
        toc: renderedToc,
        content: content
    };
}

module.exports = {
    gfm: gfm,
    noGfm: noGfm,
    highlight: highlight,
    withToc: withToc
};