/*jshint node:true */
/*jslint node:true */
/*global require */
/*global describe */
/*global it */

'use strict';

var msg    = require('../index');
var expect = require('chai').expect;

describe("Messenger Library", function() {

	it("should test all message routines", function(done) {
		// msg.Log('log');
		msg.Info('info');
		msg.Error('error');
		msg.Success('success');
		msg.Warning('warning');
		msg.Note('note');
		msg.Time('time');
		msg.Debug('debug');
		expect(true).to.be.equal(true);

		done();
	});

});
