/**
 * Created by at15 on 15-4-19.
 */

'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
//var watch = require('gulp-watch');
var sass = require('gulp-sass');

var publicFolder = './public';
var scssFiles = [
    './views/assets/style/*.scss',
    './views/assets/style/**/*.scss'
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

// TODO: contact script and watch. (auto reload may also be a good thing)

gulp.task('test', ['lint'], function () {
    return gulp.src(
        'test/*.js'
    )
        .pipe(mocha());
});

gulp.task('default', ['test'], function () {
    console.log('This is the default gulp task.');
});
