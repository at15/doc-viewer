/**
 * Created by Pillar on 2015/6/12.
 */

'use strict';
var chai = require('chai');
var expect = chai.expect;
var render = require('../lib/render');

describe('Test if gfm is working', function () {
    it('disable gfm render', function () {
        expect(render.noGfm('#haha')).to.equal('<h1 id="haha">haha</h1>\n');
    });
    // NOTE: #ha is not header in GFM, a space is needed # ha
    it('enable gfm when render', function () {
        expect(render.gfm('# haha')).to.equal('<h1 id="haha">haha</h1>\n');
    });
});

describe('Test code highlight', function () {
    // TODO: highlight is really slow, 150ms....
    it('highlight js', function () {
        expect(render.highlight('````javascript\nvar s = 1\n````')).to.equal(
            '<pre><code class="lang-javascript"><span class="hljs-selector-tag">var</span> s = <span class="hljs-number">1</span>\n</code></pre>\n'
        );
    });
});

describe('Test toc', function () {
    it('return rendered toc and content at same time', function () {
        expect(render.withToc('# ha')).to.eql({
            toc: '<a href="#ha">ha</a>',
            content: '<h1 id="ha">ha</h1>'
        });
    });
});