/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';
var tocCache = {level: 0};
var lastHeader = {};
var lastLevel = 1;
var resultCalled = false;

// TODO: in fact we should allow only one level 1 in the whole page.

function start() {
    tocCache = {};
    resultCalled = false;
}

function add(text, level) {
    //console.log('level is', level);
    if (level === 1) {
        tocCache[text] = {_parent: tocCache, level: level};
        lastHeader = tocCache[text];
        lastLevel = level;
        return;
    }
    // level value is reverse for heading level, larger value, deeper header
    if (level > lastLevel) {
        // TODO: if I got, 3,5,4. the toc would put 5 and 4 in same level.
        lastHeader[text] = {_parent: lastHeader, level: level};
        lastHeader = lastHeader[text];
        lastLevel = level;
        return;
    }
    if (level === lastLevel) {
        lastHeader._parent[text] = {_parent: lastHeader._parent, level: level};
        lastHeader = lastHeader._parent[text];
        lastLevel = level;
        return;
    }
    // level < lastLevel
    var t = true;
    var parent = lastHeader._parent;
    while (t) {
        // find the parent that match.
        //console.log('parent level is ' + parent.level + ' insert level is ' + level);
        if (parent.level < level) {
            parent[text] = {_parent: parent, level: level};
            lastHeader = parent[text];
            break;
        }
        parent = parent._parent;
        //console.log(parent);
    }
    lastLevel = level;
}

function removeParent(node) {
    //console.log(node);
    if (typeof node !== 'object') {
        return;
    }
    if (typeof node._parent !== 'undefined') {
        delete node._parent;
    }

    var hasChild = false;
    //console.log(node);
    for (var name in node) {
        if (!node.hasOwnProperty(name)) {
            continue;
        }
        if (name !== 'level') {
            //console.log('name should not be level ', name);
            // FIXME: add _hasChild is not related with the name removeParent. it's for rendering.
            hasChild = true;
            //node._name = name;
        }
        removeParent(node[name]);
    }
    // NOTE: must add _hasChild = false here, otherwise ... it will cause _hasChild to be true....
    node._hasChild = hasChild;
}

function result() {
    // remove the circular in object
    // TODO: in fact, call it twice seems to have no side effect...
    if (resultCalled) {
        throw new Error('You should not call result called more than once');
    }
    delete tocCache.level;
    removeParent(tocCache);
    resultCalled = true;
    return tocCache;
}

// TODO: add href
function renderNode(nodeName, node) {
    var s = '';
    // if it has child it would be a ul
    if (node._hasChild) {
        for (var name in node) {
            if (!node.hasOwnProperty(name) || name === 'level' || name === '_hasChild') {
                continue;
            }
            if(nodeName){
                s += '<li>' + renderNode(name, node[name]) + '</li>\n';
            }else{
                s += renderNode(name, node[name]);
            }
        }
        // because renderNode('', tocObject);
        if(nodeName){
            s = '<a href="#' + nodeName + '">' + nodeName + '</a>\n' + '<ul>\n' + s + '</ul>\n';
        }else{
            // this is the dummy nodeName, so it's the top level
            s = '' + s;
        }
    } else {
        s = '<a href="#' + nodeName + '">' + nodeName + '</a>';
    }
    return s;
}

function render(tocObject) {
    // do a dfs traverse
    // TODO: allow custom tags in the future.
    // TODO: store the top level name.
    return renderNode('', tocObject);
}

module.exports = {
    start: start,
    add: add,
    result: result,
    render: render
};