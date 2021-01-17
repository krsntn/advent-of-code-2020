const fs = require('fs');
const filename = 'src/day-16/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function runProgram(input) {
  const req = [];
  const ans = [];

  for (const iterator of input[0].split('\n')) {
    const regex = /(\d+-\d+).*?(\d+-\d+)/;
    const values = regex.exec(iterator);

    const p1 = values[1].split('-').map((x) => +x);
    const p2 = values[2].split('-').map((x) => +x);
    req.push(p1);
    req.push(p2);
  }

  for (const iterator of input[2].split('\n')) {
    if (iterator.startsWith('nearby')) {
      continue;
    }

    const values = iterator.split(',').map((x) => +x);
    for (const value of values) {
      const valid = req.some((x) => value >= x[0] && value <= x[1]);
      if (!valid) {
        ans.push(value);
      }
    }
  }

  return ans.reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
