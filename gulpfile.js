/**********Gulp Cconfiguration file*************/
'use strict';
//create a gulp instance
var gulp = require('gulp');
//create browser-sync instance
var browserSync = require('browser-sync');
//create gulp-nodemon instance
var nodemon = require('gulp-nodemon');

//create and set default task
gulp.task('default', ['browser-sync'], function() {});

//create and set browser-sync task and inject nodemon task
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        //set express app url
        proxy: "http://localhost:4000",
        //files to watch
        files: ["public/**/*.*"],
        //set default browser
        //browser: "google chrome",
        //set port for gulp
        port: 7000,
    });
});

//create and set nodemon task
gulp.task('nodemon', function(cb) {
    var started = false;
    //set starting script of express app
    return nodemon({
        script: './bin/www'
    }).on('start', function() {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
