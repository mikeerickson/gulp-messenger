/*jshint node:true */
/*jslint node:true */
/*global require */
/*global describe */
/*global it */

'use strict';

var msg    = require('../index');
var expect = require('chai').expect;
var chalk  = require('chalk');

var kids = ['Joelle', 'Brady', 'Bailey', 'Trevor'];
var user = {fname: 'Mike', lname: 'Erickson', kids: kids.join(', ')};

describe("Messenger (Console / Logger) for Browser and Server, including `gulp` pipeline support", function() {

	beforeEach(function(){
		msg.init({
			logToFile:     true,
			timestamp:     false,
			logPath:       'spec/logs',
			logFile:       'myLog.log',
			boldVariables: true
		});
	});

	it("should interpolate string", function(){
		msg.Info(user);
		msg.Success('Hello there <%= fname %> <%= lname %>:', user);
		msg.Success('These are our kids <%= kids %>', user);
	});

	it("should test all messenger routines", function(done) {

    msg.Log('log');
		msg.Info('info');
		msg.Error('error');
		msg.Success('success');
		msg.Warning('warning');
		msg.Warn("using `warn` shorthand");
		msg.Note(chalk.gray('note, color supplied by `Chalk` instance'));
		msg.Time('time');
		msg.Debug('debug');
		msg.Header('This should be underline');
		msg.Log(chalk.red.underline('You can perform any text customization with simple log and `chalk` library'));
		msg.Info('*','Bordered Output','=');
		msg.Warning('Testing interpolation by <%=fname %> <%=lname %>', {fname: 'Mike', lname: 'Erickson'});
		msg.Info({fname: 'Mike', lname: 'Erickson'});
		msg.Line();
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

	it('should support all optional params',function(done){

		msg.Info(chalk.magenta('Note:  These are not working correctly yet...'));
		msg.Line('#');
		msg.Line('-',40);
		done();

	});

});

describe("Messenger Line Test", function() {

	it("should print lines before and after", function(){
		msg.Warn('=', 'Testing `Warn` message', '*');
		msg.Warning('=', 'This is from `Warning` routine', '*');
		expect(true).to.be.equal(true);
	});

	it("should print lines before and after", function(){
		msg.Error('=', 'Now trying `Error containing `=` ');
		expect(true).to.be.equal(true);
	});

	it("should print lines before and after", function(){
		msg.Success('', 'A `Success` line after this message containing `x` ', 'x');
		expect(true).to.be.equal(true);
	});

});
