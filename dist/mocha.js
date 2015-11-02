/*global require*/
/*global process*/

'use strict';

var taskName = 'mocha';

var gulp   = require('gulp');
var config = require('./config');
var mocha  = require('gulp-mocha');
var mkdirp = require('mkdirp');
var run    = require('gulp-run');
var exists = require('path-exists');
var msg    = require('../index');

var args   = process.argv.slice(3);


// open the report after tests have completed
// pass --open as 'gulp test:report --open'
var openReport = args.indexOf('--open') >= 0 || (config.test.reporter.openReport);

mkdirp('spec/logs', function (err) {
	if (err) {msg.Error(err);}
});

gulp.task('test:mocha', function () {
	return gulp.src(config.test.spec, {read: false})
		.pipe(mocha());
});

// create awesome report and optionally open in browser
gulp.task('test:report', function () {
	if (exists.sync('mochawesome-reports')) {
		return gulp.src(config.test.spec, {read: false})
			.pipe(mocha({reporter: 'mochawesome'}))
			.once('end', function () {
				if (openReport) {
					run('open mochawesome-reports/mochawesome.html').exec();
				}
				process.exit();
			});
	} else {
		msg.Error(' *** Mochawesome reporter not installed! *** ');
		process.exit();
	}

});

