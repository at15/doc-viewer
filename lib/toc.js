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
    console.log('level is', level);
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
        console.log('parent level is ' + parent.level + ' insert level is ' + level);
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
    //console.log(node);
    for (var name in node) {
        //if (!node.hasOwnProperty(name)) {
        //    continue;
        //}
        removeParent(node[name]);
    }
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

module.exports = {
    start: start,
    add: add,
    result: result
};