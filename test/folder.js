/**
 * Created by Pillar on 2015/7/12.
 */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var folder = require('../lib/util/folder');

describe('Traverse folder', function () {
    it('depth first', function () {
        // TODO:refactor, use filter to add the folder prefix
        var dfsResult = folder.dfs('./test/traverse-me');
        expect(dfsResult).to.eql(
            [
                './test/traverse-me/a/a.md',
                './test/traverse-me/c.md'
            ]
        );
    });

    it('read only one layer and return json', function () {
        var r = folder.readDir('./test/traverse-me');
        expect(r.files).to.eql(
            [
                {
                    dir: true,
                    path: 'a'
                },
                {
                    dir: false,
                    path: 'c.md'
                }
            ]
        );
    });

    // TODO: add test for readMe
});