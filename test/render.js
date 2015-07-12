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
    // TODO: what does gfm have?
    it('enable gfm when render', function () {
        // NOTE: This is a gfm feature?
        expect(render.gfm('#haha')).to.equal('<h1 id="haha">haha</h1>\n');
    });
});

describe('Test code highlight', function () {
    // TODO: highlight is really slow, 150ms....
    it('highlight js', function () {
        expect(render.highlight('````javascript\nvar s = 1\n````')).to.equal('<pre>' +
            '<code class="lang-javascript">' +
            '<span class="hljs-variable"><span class="hljs-keyword">var</span> s</span> = <span class="hljs-number">1</span>\n' +
            '</code></pre>\n');
    });
});

describe('Test toc', function () {
    it('return rendered toc and content at same time', function () {
        expect(render.withToc('#ha')).to.eql({
            toc: '<ul><li>ha</li></ul>',
            content: '<h1 id="ha">ha</h1>'
        });
    });
});