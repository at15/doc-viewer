/**
 * Created by Pillar on 2015/6/18.
 */
'use strict';
var chai = require('chai');
var expect = chai.expect;
var toc = require('../lib/util/toc');
describe('toc render', function () {
    it('return rendered html', function () {
        toc.start();
        toc.add('jack', 1);
        var result = toc.result();
        var rendered = toc.render(result);
        expect(rendered).to.equal('<a href="#jack">jack</a>');
    });
    it('render level 2', function () {
        toc.start();
        toc.add('jack', 1);
        toc.add('jack house', 2);
        var result = toc.result();
        var rendered = toc.render(result);
        expect(rendered).to.equal('<a href="#jack">jack</a>\n' +
            '<ul>\n' +
            '<li><a href="#jack house">jack house</a></li>\n</ul>\n');
    });
});
