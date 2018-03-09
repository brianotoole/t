var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var css_vars = require('postcss-simple-vars');
var css_nested = require('postcss-nested');
var css_import = require('postcss-import');
var css_pxtorem = require('postcss-pxtorem');

gulp.task('html', function() {
  //
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/style.css')
    .pipe(postcss([css_import, css_vars, css_nested, css_pxtorem, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {
  // trigger html on save of index
  watch('./app/index.html', function() {
    gulp.start('html');
  });
  // trigger styles on save of css
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });
});
