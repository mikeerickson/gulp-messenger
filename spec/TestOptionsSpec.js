var msg        = require('../index');
var expect     = require('chai').expect;
require('mocha-sinon');


var defMsgOpts = {
  lineLenght: 40,
  logToFile:  true,
  logPath:    'spec/logs',
  logFile:    'testOptions.log'
};

describe('test `setOptions` method', function () {
  beforeEach(function () {
    const log = msg.log;
    this.sinon.stub(msg, 'log', function () {
      return log.apply(log, arguments);
    });
    msg.init(defMsgOpts);
  });

  it('should override default line setting set in `beforeEach` block', function (done) {
    msg.setOptions({lineLength: 5});
    msg.log('**','test line');
    expect(msg.log.calledOnce).to.be.true;
    expect(msg.log.calledWith('**')).to.be.true;
    done();
  });


});
