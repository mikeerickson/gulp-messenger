var msg = require('./index');


var family = {
  surname:   'Erickson',
  father:    'Mike',
  mother:    'Kira',
  kids:      ['Joelle', 'Brady', 'Trevor', 'Bailey', 'Nate'],
  grandkids: ['Alaya', 'Baby Asoau'],
	all:       function () {
		return [].concat(this.father, this.mother, this.kids, this.grandkids )
	}
};

console.log('hello world!', family.all(), family);
msg.Log('hello world!', family.all(), family);

var cMsg = "Hello my name is %s and I am %d years old!";
console.log(cMsg, "Mike", 48);


msg.success('test');
