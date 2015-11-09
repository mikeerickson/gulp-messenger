var console = require('./index');

console.log('test line');
console.line('#');

var family = {
  fname: 'Mike',
  lname: 'Erickson'
}
console.dump(family);
console.dump(family, {plain: true});

console.chalkline.green();
