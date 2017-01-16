'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

// 編譯 SASS 檔案
gulp.task('sass', function() {
  return gulp.src("public/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*", "routes/*.js", "views/**/*.*"],
    browser: "google chrome",
    port: 7000,
  });
});
gulp.task('nodemon', function(cb) {
  gulp.watch("public/scss/*.scss", ['sass']);
  var started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('default', ['browser-sync'], function() {});
