var gulp = require('gulp');
var watch = require('gulp-watch');
var browsersync = require('browser-sync').create();
var webpack = require('webpack');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var css_vars = require('postcss-simple-vars');
var css_nested = require('postcss-nested');
var css_import = require('postcss-import');
var css_pxtorem = require('postcss-pxtorem');
var css_color = require('postcss-color-function');
var css_mixins = require('postcss-mixins');

var css_pxtorem_options = {
  propList: ['font', 'font-size', 'padding', 'margin'],
  mediaQuery: true,
};
var css_pxtorem = css_pxtorem(css_pxtorem_options);

gulp.task('html', function() {
  //
});

// TASK: "styles"
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/style.css')
    .pipe(postcss([css_import, css_mixins, css_vars, css_nested, css_pxtorem, css_color, autoprefixer]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});

// TASK: "scripts"
gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function() {
    callback();
  });
});

// TASK: "watch"
gulp.task('watch', function() {
  // init browsersync
  browsersync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  // reload browsersync on save
  watch('./app/index.html', function() {
    browsersync.reload();
  });
  // trigger "css-inject" on save of css file
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('css-inject');
  });
  // trigger "scripts" on save of js files
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });
});

// TASK: "css-inject"
gulp.task('css-inject', ['styles'], function() {
  return gulp.src('./app/temp/styles/style.css')
    .pipe(browsersync.stream());
});

// TASK: "scriptsRefresh"
// tell browsersync to reload page after webpack bundle is generated
gulp.task('scriptsRefresh', ['scripts'], function() {
  browsersync.reload();
});