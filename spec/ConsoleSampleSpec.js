'use strict';

var console = require('../index');
var expect  = require('chai').expect;
var chalk   = require('chalk');

var kids   = ['Joelle', 'Brady', 'Bailey', 'Trevor'];
var user   = {fname: 'Mike', lname: 'Erickson', kids: kids.join(', ')};


describe('Test Enhanced Formatting', function (done) {

	it('should contain a header and some additional messages',function (done){

		console.header('This is the header message');
		console.log('Here is first logged message');
		console.success('Something good happened');
		console.error('Then something bad happened');
		console.log('Ericksons Kids', kids);
		done();

	});

});
