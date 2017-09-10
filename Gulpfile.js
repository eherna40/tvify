var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var preset =  require('babel-preset-es2015');
var stylus = require('gulp-stylus');
var nib = require('nib');
var serve = require('gulp-serve');



gulp.task('scripts', function () {
  browserify('./src/index.js')
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./public'))
});


gulp.task('stylus', function () {
  return gulp.src('./src/app.styl')
    .pipe(stylus({ use: nib(), compress: false }))
    .pipe(gulp.dest('./src'))

});


gulp.task('assets', function(){
  gulp
    .src('src/app.css')
    .pipe(gulp.dest('public'));
  gulp
    .src('src/index.html')
    .pipe(gulp.dest('public'))
})
gulp.task('serve', serve('public'));

gulp.task('default', ['stylus','scripts','assets', 'serve']);