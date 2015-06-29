'use strict';
var marked = require('marked');

function Renderer(){

}

Renderer.prototype.preRender = function(){
    return null;
};

Renderer.prototype.renderHook = function(){
    return null;
};

Renderer.prototype.postRender = function(){
    return null;
};

Renderer.prototype.getResult = function(){
    return null;
};

Renderer.prototype.create = function(){
    return new marked.Renderer();
};
module.exports = Renderer;