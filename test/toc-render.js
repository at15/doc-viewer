/**
 * Created by Pillar on 2015/6/18.
 */
'use strict';
var chai = require('chai');
var expect = chai.expect;
var toc = require('../lib/toc');
describe('toc render', function () {
    it('return rendered html', function () {
        toc.start();
        toc.add('jack', 1);
        var result = toc.result();
        var rendered = toc.render(result);
        expect(rendered).to.equal('<ul><li>jack</li></ul>');
    });
});
