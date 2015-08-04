'use strict';

var util = require('util');

var marked = require('marked');
var MarkedRenderer = marked.Renderer;

var toc = require('../util/toc');

function TocRenderer() {
    MarkedRenderer.apply(this, arguments);
}

util.inherits(TocRenderer, MarkedRenderer);

TocRenderer.prototype.heading = function (text, level) {
    toc.add(text, level);
    return '<h' + level + ' id="' + text + '">' + text + '</h' + level + '>';
};

// TODO: move the to do list render to another file
TocRenderer.prototype.listitem = function (text) {
    if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
            .replace(/^\s*\[ \]\s*/,
            '<input type="checkbox" class="task-list-item-checkbox" disabled>')
            .replace(/^\s*\[x\]\s*/,
            '<input type="checkbox" class="task-list-item-checkbox" checked disabled>');
        return '<li class="task-list-item">' + text + '</li>';
    } else {
        return '<li>' + text + '</li>';
    }
};

module.exports = TocRenderer;