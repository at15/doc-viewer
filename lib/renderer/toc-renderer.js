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

module.exports = TocRenderer;