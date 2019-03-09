(function () {

  'use strict';

  var gulp    = require('gulp');
  var config  = require('./config');
  var ignore  = require('gulp-ignore');
  var rimraf  = require('gulp-rimraf');
  var msg     = require('../index');

  gulp.task('clean:logs', function () {
    return gulp.src(config.logs.dir, {read: false})
      .pipe(ignore('node_modules/**'))
      .pipe(rimraf())
      .pipe(msg.flush.success('*** Logs Cleared Successfully ***'));
  });

})();


