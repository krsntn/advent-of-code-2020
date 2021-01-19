const fs = require('fs');
const filename = 'src/day-18/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function calc(input) {
  let expressions = input.split(' ');
  let sum = 0;

  while (expressions.length > 1) {
    if (expressions.includes('+')) {
      const plusIndex = expressions.indexOf('+');
      sum = eval(
        `${expressions[plusIndex - 1]} ${expressions[plusIndex]} ${
          expressions[plusIndex + 1]
        }`
      );
      expressions.splice(plusIndex - 1, 3, sum);
    } else {
      sum = eval(`${expressions[0]} ${expressions[1]} ${expressions[2]}`);
      expressions.splice(0, 3);
      expressions.unshift(sum);
    }
  }

  return expressions.pop();
}

function runProgram(input) {
  const results = [];
  for (const iterator of input) {
    let expression = iterator;

    while (expression.indexOf('(') > -1) {
      let target = expression.match(/(\([\d\s+*]+\))/);
      expression = expression.replace(target[0], calc(target[0].slice(1, -1)));
    }

    results.push(calc(expression));
  }
  return results.reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
