var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csswring     = require('csswring');
var sourcemaps   = require('gulp-sourcemaps');
var plumber      = require('gulp-plumber');
var webserver    = require('gulp-webserver');
var notify       = require('gulp-notify');


var AUTOPREFIXER_BROWSERS = [
  'last 2 version', 'Explorer >= 8', 'Android >= 2.3'
];


/* sass task */
gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
    }))
    .pipe(postcss([
      autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
      csswring({preserveHacks: true})
    ]))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dist/styles/'));
});


/* webserver task */
gulp.task('webserver', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8000,
      livereload: true,
      directoryListing: false,
      open: 'http://localhost:8000'
    }));
});


/* watch task */
gulp.task('watch', function() {
  gulp.watch(['src/styles/**/*.scss'], ['sass']);
});


/* compile task */
gulp.task('compile', ['sass']);


/* default task */
gulp.task('default', ['compile', 'webserver', 'watch']);