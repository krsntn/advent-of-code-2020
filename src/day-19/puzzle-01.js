const fs = require('fs');
const filename = 'src/day-19/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function solve(map, rules) {
  if (/".*?"/.test(rules)) {
    return rules.replace(/"/g, '');
  }

  let result = [];
  const rulePart = rules.split(' | ');
  for (let i = 0; i < rulePart.length; i++) {
    result.push(
      rulePart[i]
        .split(' ')
        .map((x) => solve(map, map.get(x)))
        .join('')
    );
  }

  return `(${result.join('|')})`;
}

function runProgram(input) {
  const arr = input[0].split('\n').map((x) => x.split(': '));
  const map = new Map();
  for (const [key, value] of arr) {
    map.set(key, value);
  }

  let regex = new RegExp(`^${solve(map, map.get('0'))}$`);
  return input[1].split('\n').filter((text) => regex.test(text)).length;
}

// output answer
console.log(runProgram(input));
