'use strict';

let msg    = require('../index');
let expect = require('chai').expect;
let sinon  = require('sinon');

require('mocha-sinon');

describe('Messenger Table Test', function (done) {

  let data = {};
  let table;
  beforeEach(function () {
    data = {
      fname: 'Mike',
      lname: 'Erickson',
    };

    table = sinon.spy(msg, 'table');
  });

  afterEach(function () {
    table.restore();
  });

  it('should simulate call to .table method', function () {
    msg.table(data);
    expect(msg.table.calledOnce).to.be.true;
    sinon.assert.calledOnce(table);
  });

  it('should msg.table method', function (){
    msg.table(data);
    sinon.assert.calledWith(table, data);
  });

  it('should msg.table method with valid data', function (){
    msg.table(data);
    expect(msg.table.calledWith(data)).to.be.true;
  });

});
