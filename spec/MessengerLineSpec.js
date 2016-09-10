'use strict';

var msg    = require('../index');
var expect = require('chai').expect;
var chalk  = require('chalk');

describe('Messenger Line Test', function (done) {
  it('should test .line method with .color function', function (){

    msg.chalkline.red();
    msg.chalkline.green();
    msg.chalkline.blue();
    msg.chalkline.yellow();
    msg.chalkline.magenta();
    msg.chalkline.white();

  });
});
