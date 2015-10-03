'use strict';

var console = require('../index');
var expect  = require('chai').expect;
var chalk   = require('chalk');

var kids   = ['Joelle', 'Brady', 'Bailey', 'Trevor'];
var user   = {fname: 'Mike', lname: 'Erickson', kids: kids.join(', ')};


describe('Test Using Console Override', function(done) {

	it('should work with all messenger methods',function(done){

		console.log('log');
		console.log('test my conbsole');
		console.info('info');
		console.error('error');
		console.success('success');
		console.warning('warning');
		console.warn("using `warn` shorthand");
		console.note(chalk.magenta('note, color supplied by `Chalk` instance'));
		console.time('time');
		console.debug('debug');
		console.header('This should be underline');
		console.log(chalk.red.underline('You can perform any text customization with simple log and `chalk` library'));
		console.info('*','Bordered Output','=');
		console.warning('Testing interpolation by <%=fname %> <%=lname %>', {fname: 'Mike', lname: 'Erickson'});
		console.info({fname: 'Mike', lname: 'Erickson'});

		console.log('Erickson Kids', kids);
		console.log('Erickson Dogs', ['Gunner']);
		console.line();
		expect(true).to.be.equal(true);

		done();

	});


});