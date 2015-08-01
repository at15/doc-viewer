/**
 * Created by at15 on 15-8-1.
 */
'use strict';

module.exports = function (req, res) {
    res.render('doc', {
        title: 'TODO: title',
        dir: res.locals.dir,
        markdown: res.locals.markdown
    });
};