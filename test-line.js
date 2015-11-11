var console = require('./index');
var bowser  = require('bowser');

console.dump(bowser)

console.log('test line');
console.line('#');

var family = {
  fname: 'Mike',
  lname: 'Erickson'
}
console.dump(family);
console.dump(family, {plain: true});

console.chalkline.green();
