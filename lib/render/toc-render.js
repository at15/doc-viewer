var Renderer = require('./abstract-render');
var markedDefault = require('marked').Renderer;

function TocRenderer() {
    markedDefault.apply(this, arguments);
}

//modulex.exports = 