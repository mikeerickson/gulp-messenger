var console = require('./index');

console.init({});
console.success('success');
console.warning('warning');
console.error('error');
console.success('success');
console.info('info');
console.info('debug');

var family = {
  fname: 'Mike',
  middle: 'Steven',
  lname: 'Erickson'
};

console.Dump(family, {plain: true});
console.Purdy(family);

var circularObj = { };
circularObj.a = circularObj;
console.Dump({
  integer: Date.now(),
  string: 'foo',
  anonymous: console.Purdy,
  defined: function Yes() {},
  nested: {hello: 'hapi'},
  error: new Error('bad'),
  null: null,
  undefined: undefined,
  regexp: new RegExp,
  falseBool: false,
  trueBool: true,
  emptyArr: [],
  circular: circularObj,
  date: new Date(),
  arrayWithVisibleIndex: [ 'one', 'two', 'three' ]
});


console.chalkline.red();
console.chalkline.green();
console.chalkline.blue();
console.chalkline.yellow();
console.chalkline.magenta();
console.chalkline.white();


console.line(); // default color, white

var temp = console.chalk.red('test');
console.log(temp);
console.chalkline.red();
console.line('*');
