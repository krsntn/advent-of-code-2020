const fs = require('fs');
const filename = 'src/day-04/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n\n')
  .map((x) => x.split('\n').join(' '))
  .map((x) => x.split(' '));

const inputList = [];
input.map((x) => {
  const obj = {};
  x.map((y) => {
    const keyValue = y.split(':');
    obj[keyValue[0]] = keyValue[1];
  });
  inputList.push(obj);
});

let validPassword = 0;
inputList.forEach((item) => {
  if (
    ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every((key) =>
      Object.keys(item).includes(key)
    )
  ) {
    validPassword++;
  }
});

// output answer
console.log(validPassword);
