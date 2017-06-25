'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    rename = require("gulp-rename"),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    child = require('child_process');

gulp.task('clean-css', function () {
  return gulp.src("./css", {read: false})
    .pipe(clean());
});

gulp.task('clean-js', function () {
  return gulp.src("./js", {read: false})
    .pipe(clean());
});

gulp.task('css', function () {
  return gulp.src('./_css/**/*.scss')
    .pipe(plumber({
      errorHandler (err) {
        gutil.log(err);
        this.emit('end')
      }
    }))
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./css'))
});

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  let b = browserify({
    entries: './_js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('bundle', [
    'exec',
    'jekyll',
    'serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('clean', ['clean-css', 'clean-js']);
gulp.task('build', ['clean', 'css', 'javascript']);
gulp.task('default', ['javascript', 'css', 'jekyll', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./_css/**/*.scss', ['css']);
  gulp.watch('./_js/**/*.js', ['javascript']);
});
