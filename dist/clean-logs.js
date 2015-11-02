'use strict';

var taskName = 'clean-logs';

var gulp    = require('gulp');
var config  = require('./config');
var clean   = require('gulp-clean');
var msg     = require('../index');

gulp.task('clean:logs', function () {
	return gulp.src(config.logs.dir, {read: false})
		.pipe(clean())
		.pipe(msg.flush.success('*** Logs Cleared Successfully ***'));
});
