var util = require('util');

var marked = require('marked');
var MarkedRenderer = marked.Renderer;

var toc = require('./render/toc');

function TocRenderer() {
    MarkedRenderer.apply(this, arguments);
}

util.inherit(TocRenderer, MarkedRenderer);

TocRenderer.prototype.heading = function (text, level) {
    toc.add(text, level);
    return '<h' + level + ' id="' + text + '">' + text + '</h' + level + '>';
};