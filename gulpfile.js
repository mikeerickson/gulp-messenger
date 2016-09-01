'use strict';

var gulp       = require('gulp');
var requireDir = require('require-dir');
var config     = require('./tasks/config');
var console    = require('./index');
var utils      = require('./tasks/utils/cd-utils');

// LOAD ALL TASKS
// *** you can execute task like `gulp <taskName>` ***
// =============================================================================
console.note('Loading Tasks and Watchers...');
requireDir('./tasks', { recurse: false });


// DEFINE TASKS
// =============================================================================
gulp.task('build', ['lint','test:mocha','todo'], function(){});

gulp.task('tdd', function(){
	gulp.watch(config.test.src, ['test:mocha']);
});


// WATCHERS
// =============================================================================
// if this gets too big, we will offload to its own task at that point

// script edits and lint them
gulp.task('watch', function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.test.src, ['test:mocha']);
	gulp.watch(config.todo.src, ['todo']);
});

gulp.task('watch:test', ['test:mocha'], function(){
  gulp.watch(config.test.src, ['test:mocha']);
});

gulp.task('watch:scripts', function(){
  gulp.watch(config.lint.src, ['lint']);
  gulp.watch(config.todo.src, ['todo']);
});


// DEFAULT
// =============================================================================
// this will be executed when `gulp` is executed from command line.
// See `gulp build` for task to run all tasks

gulp.task('default', function(){
	gulp.watch(config.lint.src, ['lint']);
	gulp.watch(config.test.src, ['test']);
	gulp.watch(config.todo.src, ['todo']);
});
