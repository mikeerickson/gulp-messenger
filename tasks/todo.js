/* global require*/

'use strict';

var taskName = 'Todo';

var gulp     = require('gulp');
var config   = require('./config');
var todo     = require('gulp-todo');
var msg      = require('../index');

var family = [
  {
    fname: 'Mike',
    lname: 'Erickson',
    dob:   new Date('1966-10-15'),
    children: [
      {
        fname: 'Joelle',
        lname: 'Asoau',
        dob: new Date('1993-07-12'),
        children: [{
          fname: 'Alaya',
          lname: 'Asoau',
          dob: new Date('2013-11-21')
        }]
      },{
        fname: 'Brady',
        lname: 'Erickson',
        dob: new Date('1995-02-28')
      },{
        fname: 'Trevor',
        lname: 'Erickson',
        dob: new Date('1997-04-07')
      }]
  }
]

msg.init({timestamp: true, logToFile: false});
msg.chalkline.green();

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
