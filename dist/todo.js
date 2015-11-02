/* global require*/

'use strict';

var taskName = 'Todo';

var gulp     = require('gulp');
var config   = require('./config');
var todo     = require('gulp-todo');
var msg      = require('../index');


msg.init({timestamp: true, logToFile: false});
msg.line('green');

gulp.task('todo', function() {
	return gulp.src(config.todo.src)
		.pipe(todo())
		.pipe(gulp.dest('./'))
		.pipe(msg.flush.success('*** ./TODO.MD File Updated *** '));
});

gulp.task('todo:json', function () {
	gulp.src(config.todo.src)
		.pipe(todo({
			fileName: 'todo.json',
			reporter: 'json'
		}))
		.pipe(msg.flush.success('*** ./todo.json File Updated *** '))
		.pipe(gulp.dest('./'));
});

// TODO: Why is this task not creating the todo.json file as it should
// output once in markdown and then output a json file as well
gulp.task('todo:reporters', function() {
	gulp.src(config.todo.src)
		.pipe(todo())
		.pipe(gulp.dest('./'))
		.pipe(todo.reporter('json', {fileName: 'todo.json'}))
		.pipe(msg.flush.success('*** ./TODO.MD and ./todo.json Files Updated *** '))
		.pipe(gulp.dest('./'));
});
