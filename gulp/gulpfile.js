/**
 * File: gulpfile.js
 *
 * Gulp task runner configuration
 */

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require('gulp-notify'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat');


// TASK: scripts
gulp.task('scripts', function (){
    gulp.src('js/src/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('js/dist/'))
        .pipe(notify({
          title: "JavaScript processed.",
          message: "Concatenated and uglified.",
          sound: "Blow"
        }));
});


// TASK: styles
gulp.task('styles', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({
            css: 'css',
            sass: 'sass',
            output: 'compressed'
        }))
        .on('error', notify.onError({
          title: "Sass compilation failed.",
          message: "<%= error.message %>",
          sound: "Basso"
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(notify({
          title: "Sass compiled.",
          message: "File: <%= file.relative %>",
          sound: "Pop"
        }));
});


// TASK: watch
gulp.task('watch', ['styles', 'scripts'], function (){
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch('./js/src/*.js', ['scripts']);
});


// TASK: default
gulp.task('default', ['watch']);
