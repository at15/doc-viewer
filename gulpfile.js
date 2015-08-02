/**
 * Created by at15 on 15-4-19.
 */

'use strict';

var fs = require('fs');
var childProcess = require('child_process');
var serverProcess = false;

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var _ = require('lodash');

var publicFolder = './public';
var scssFiles = [
    './views/assets/style/*.scss',
    './views/assets/style/**/*.scss'
];
var jsFiles = [
    './lib/*.js',
    './lib/**/*.js'
];

var frontScript = [
    './views/assets/javascript/*.js'
];

gulp.task('lint', function () {
    return gulp.src([
        '*.js',
        'lib/*.js',
        'test/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// TODO: add js build task
gulp.task('front-script', function () {
    gulp.src(frontScript)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(publicFolder + '/assets/script'));

});

gulp.task('style', function () {
    gulp.src(scssFiles)
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(publicFolder + '/assets/style'));
});

gulp.task('build', ['lint', 'style', 'front-script'], function () {
    console.log('Building...');
});

gulp.task('stop-server', function () {
    serverProcess.kill();
});

gulp.task('start-server', function () {
    serverProcess = childProcess.fork('./index');
    fs.writeFileSync('doc-viewer.pid', serverProcess.pid);
});

// kill child process when exit
process.on('exit', function () {
    if (serverProcess) {
        console.log('Kill child process ' + serverProcess.pid);
        serverProcess.kill();
    }
});

// TODO: (auto reload may also be a good thing)
gulp.task('watch', function () {
    gulp.watch(_.union(scssFiles, frontScript), ['build']).on('change', function (file) {
        console.log('Rebuilding because ' + file.path + ' has changed');
    });
    gulp.watch(jsFiles, ['stop-server', 'start-server']).on('change', function (file) {
        console.log('Restarting server because ' + file.path + ' has changed');
    });
});

gulp.task('test', ['lint'], function () {
    return gulp.src(
        'test/*.js'
    )
        .pipe(mocha());
});

gulp.task('dev', ['build', 'watch', 'start-server'], function () {

});

gulp.task('default', ['test'], function () {
    console.log('This is the default gulp task.');
});
