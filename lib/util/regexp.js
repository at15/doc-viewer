/**
 * Created by Pillar on 2015/7/13.
 */
// collection of regular expressions used in route
module.exports = {
    mdFile: /^\/(.*\.md)$/,
    // TODO: this regexp is causing trouble
    //folder: /^\/([^\.]+)$/
    folder: /^\/(.*)$/
};
