const fs = require('fs');
const filename = 'src/day-14/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function parseOps(mask, value) {
  const binVal = value.toString(2).padStart(36, '0');
  let newValue = '';

  for (let i = 0; i < mask.length; i++) {
    newValue += mask[i] === 'X' ? binVal[i] : mask[i];
  }

  return parseInt(newValue, 2);
}

function runProgram(input) {
  const regex = /\[(\d+).*?(\d+)/;
  const memory = {};
  let mask = null;

  for (const line of input) {
    const isMem = regex.exec(line);
    if (isMem) {
      memory[isMem[1]] = parseOps(mask, +isMem[2]);
    } else {
      mask = line.split(' = ')[1];
    }
  }

  return Object.values(memory).reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
