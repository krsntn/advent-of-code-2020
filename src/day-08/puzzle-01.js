const fs = require('fs');
const filename = 'src/day-08/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function generateInstructions(instructions) {
  const regex = /(\w+) ([+-]\d+)/;
  return instructions.map((line) => {
    const [, type, value] = regex.exec(line);
    return [type, Number(value)];
  });
}

function runProgram(input) {
  const instructions = generateInstructions(input);
  let accomulator = 0;
  let cur = 0;

  const executed = new Set();

  while (!executed.has(cur)) {
    executed.add(cur);

    const [type, value] = instructions[cur];

    switch (type) {
      case 'acc':
        accomulator += value;
        cur += 1;
        break;
      case 'jmp':
        cur += value;
        break;
      case 'nop':
        cur++;
      default:
        break;
    }
  }

  return accomulator;
}

// output answer
console.log(runProgram(input));
