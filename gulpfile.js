/**
 * Created by at15 on 15-4-19.
 */

'use strict';

var childProcess = require('child_process');
var serverProcess = false;

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var publicFolder = './public';
var scssFiles = [
    './views/assets/style/*.scss',
    './views/assets/style/**/*.scss'
];
var jsFiles = [
    './lib/*.js',
    './lib/**/*.js'
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

gulp.task('style', function () {
    gulp.src(scssFiles)
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(publicFolder + '/assets/style'));
});

gulp.task('build', ['lint', 'style'], function () {
    console.log('Building...');
});

gulp.task('stop-server', function () {
    if (serverProcess) {
        //serverProcess.send({cmd: 'SIGTERM'});
        serverProcess.kill();
    }
    //serverProcess = childProcess.fork('./index');
    //// TODO:this won't work.
    //serverProcess.stdout.on('data', function (data) {
    //    console.log('stdout: ' + data);
    //});
    //require('./index');
});

gulp.task('start-server', function () {
    serverProcess = childProcess.fork('./index');
    console.log(serverProcess.pid);
});

// TODO: (auto reload may also be a good thing)
gulp.task('watch', function () {
    gulp.watch(scssFiles, ['build']).on('change', function (file) {
        console.log(file.path, ' changed');
    });
    gulp.watch(jsFiles, ['stop-server', 'start-server']).on('change', function (file) {
        console.log(file.path, ' changed ');
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
