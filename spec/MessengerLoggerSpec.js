// MESSENGER LOGGER SPEC
// =============================================================================

/*global require*/


/*jshint node:true */
/*jslint node:true */
/*global require */
/*global describe */
/*global it */

'use strict';

var msg    = require('../index');
var expect = require('chai').expect;
var fs     = require('fs');
var chalk  = msg.chalk;

// customize desc and it headers
var db = chalk.cyan.underline;
var ib = chalk.yellow;

describe(db('Gulp Messenger Logger Spec'), function() {

  var logData = '';
  var msgOptions = {};

  beforeEach(function() {
    msgOptions = {
      logToFile: true,
      logPath:   'spec/logs',
      logFile:   'test-logger.log'
    }
    msg.init(msgOptions);

  });

  afterEach(function(){
    msg.log('\n'); // a little spacing between tests
  });

  it(ib('should log each of the Messenger methods which display message'), function(done){

    var data = '';

    msg.error  ('----- messenger: error');
    msg.success('----- messenger: success');
    msg.warn   ('----- messenger: warn');
    msg.warning('----- messenger: warning');
    msg.note   ('----- messenger: note');
    msg.debug  ('----- messenger: debug');
    msg.log    ('----- messenger: log');

    // read log file and confirm each message was correctly logged
    fs.readFile(msgOptions.logFilename, 'utf8', function (err,data) {
      if (err) {
        // this will occur when the log file is created initially, need to pause and try again
        setTimeout(function(){
          fs.readFile(msgOptions.logFilename, 'utf8', function (err,data) {
            if(err) {
              return msg.error('Error Reading Log: ', err);
            }
          });
        }, 2000);
      }

      expect(data).to.contain('error');
      expect(data).to.contain('success');
      expect(data).to.contain('warn');
      expect(data).to.contain('warning');
      expect(data).to.contain('note');

    });

    done();

  });

  it(ib('should not log output when logToFile option is false'), function(done){

    msg.setOptions({logToFile: false});

    msg.error('----- this error message should never appear in log');
    msg.log  ('----- this log message should never appear in log');


    fs.readFile(msgOptions.logFilename, 'utf8', function (err,data) {
      if (err) {
        // this will occur when the log file is created initially, need to pause and try again
        setTimeout(function(){
          fs.readFile(msgOptions.logFilename, 'utf8', function (err,data) {
            if(err) {
              return msg.error('Error Reading Log: ', err);
            }
          });
        }, 2000);
      }
      expect(data).to.not.contain('this error');
      expect(data).to.not.contain('this log');
    });

    done();
  });
});
