"use strict";

var taskName    = 'Lint';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var config      = require('./config');
var msg         = require('../index');

require('jshint-summary')
gulp.task('lint', function() {
	return gulp.src(config.lint.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-summary'))
		.pipe(msg.flush.success('*** Linting Completed Successfully ***'));

});

gulp.task('hint', ['lint']);
