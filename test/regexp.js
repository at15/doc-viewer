/**
 * Created by Pillar on 2015/7/13.
 */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var regexp = require('../lib/util/regexp');

describe('Regexp match routes', function () {
    it('match md files', function () {
        var mdPattern = regexp.mdFile;
        var shouldMatch = '/foo/bar.md';
        var shouldNotMatch = '/foo/bar.md/bar.txt';
        expect(shouldMatch.match(mdPattern)[1]).to.equal('foo/bar.md');
        expect(shouldNotMatch.match(mdPattern)).to.equal(null);
    });

    it('match non file routes', function () {
        var folderPattern = regexp.folder;
        var shouldMatch = '/foo/bar'; // TODO:what if someone has a folder called bar.css
        var shouldAlsoMatch = '/foo/bar/';
        expect(shouldMatch.match(folderPattern)[1]).to.equal('foo/bar');
        // TODO: should improve the regexp so they all return string without the trailing slash
        expect(shouldAlsoMatch.match(folderPattern)[1]).to.equal('foo/bar/');
    });
});