/**
 * Created by Pillar on 2015/6/12.
 */
'use strict';
var chai = require('chai');
var expect = chai.expect;
var toc = require('../lib/toc');

describe('Generate toc from markdown header', function () {
    it('add h1 to first level', function () {
        toc.start();
        toc.add('jack', 1);
        var result = toc.result();
        //console.log('toc result is' + result);
        //console.log(JSON.parse(toc.result()));
        expect(result).to.eql({jack: {level: 1}});
    });
    it('add h2 to the next level', function () {
        toc.start();
        toc.add('jack', 1);
        toc.add('jack dog', 2);
        expect(toc.result()).to.eql({jack: {level: 1, 'jack dog': {level: 2}}});
    });
    it('add h2 after a h3, should add a new h2', function () {
        toc.start();
        toc.add('main title', 1);
        toc.add('chap1', 2);
        toc.add('chap1.1', 3);
        toc.add('chap2', 2);
        toc.add('chap2.1', 3);
        expect(toc.result()).to.eql(
            {
                'main title': {
                    level: 1,
                    chap1: {
                        level: 2,
                        'chap1.1': {
                            level: 3
                        }
                    },
                    chap2: {
                        level: 2,
                        'chap2.1': {
                            level: 3
                        }
                    }
                }
            }
        );
    });
});