/**
 * Created by at15 on 15-8-1.
 */
'use strict';

module.exports = function (req, res) {
    res.render('folder', {
        dir: res.locals.dir
    });
};