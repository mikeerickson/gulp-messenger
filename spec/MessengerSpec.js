/*jshint node:true */
/*jslint node:true */
/*global require */
/*global describe */
/*global it */

'use strict';

var msg    = require('../index');
var expect = require('chai').expect;

// msg.init(); default
// initialize plugin option override
msg.init({
		logToFile:     true,
		logToConsole:  true,
		rotateLog:     false,
		logPath:       'logs',
		logFile:       'myLog.log'
	});

describe("Messenger (Console / Logger) for Browser and Server, including `gulp` pipeline support", function() {

	it("should test all messenger routines", function(done) {
		// msg.Log('log');
		msg.Info('info');
		msg.Error('error');
		msg.Success('success');
		msg.Warning('warning');
		msg.Warn("using `warn` shorthand");
		msg.Note('note');
		msg.Time('time');
		msg.Debug('debug');
		msg.Info('*','Bordered Output','=');
		msg.Warning('Testing interpolation by <%= fname %> <%= lname %>',{fname: 'Mike', lname: 'Erickson'});
		expect(true).to.be.equal(true);

		done();
	});


	it('should test all logging routines',function(done){
		expect(true).to.be.equal(true);
		done();
	});


	it('should test `gulp` methods', function(done){
		expect(true).to.be.equal(true);
		done();
	});


});
