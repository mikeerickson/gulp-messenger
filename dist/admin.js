/*global require*/

'use strict';

var taskName = 'admin';

var gulp    = require('gulp');
var config  = require('./config');
var clean   = require('gulp-clean');
var msg     = require('../index');


// ADMIN
// =============================================================================
// miscellaneous admin tasks for operations like clearing logs (build)

// prepare for deployment
gulp.task('clean', function(){
	return gulp.src(config.clean.src, {read: false})
		.pipe(clean())
		.pipe(msg.flush.success('*** Ready For Deployment ***'));
});

// clear log files
gulp.task('clean:logs', function () {
	return gulp.src(config.logs.dir, {read: false})
		.pipe(clean())
		.pipe(msg.flush.success('*** Logs Cleared Successfully ***'));
});

// remove todo files
gulp.task('clean:todo', function () {
	return gulp.src(config.todo.dest, {read: false})
		.pipe(clean())
		.pipe(msg.flush.success('*** TODO Files Cleared Successfully ***'));
});
