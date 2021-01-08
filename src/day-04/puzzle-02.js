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
    if (item.byr < 1920 || item.byr > 2002) {
      return false;
    }

    if (item.iyr < 2010 || item.iyr > 2020) {
      return false;
    }

    if (item.eyr < 2020 || item.eyr > 2030) {
      return false;
    }

    if (!['cm', 'in'].includes(item.hgt.slice(-2))) {
      return false;
    }

    const height = item.hgt.slice(0, -2);
    if (item.hgt.slice(-2) === 'cm' && (height < 150 || height > 193)) {
      return false;
    }
    if (item.hgt.slice(-2) === 'in' && (height < 59 || height > 76)) {
      return false;
    }

    if (!item.hcl.match('#([a-f0-9]{6})')) {
      return false;
    }

    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(item.ecl)) {
      return false;
    }

    if (item.pid.length !== 9) {
      return false;
    }

    validPassword++;
  }
});

// output answer
console.log(validPassword);
