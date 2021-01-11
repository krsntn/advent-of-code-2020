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

  for (let index = 0; index < instructions.length; index++) {
    const modifiedIns = JSON.parse(JSON.stringify(instructions));

    if (modifiedIns[index][0] === 'nop') {
      modifiedIns[index][0] = 'jmp';
    } else if (modifiedIns[index][0] === 'jmp') {
      modifiedIns[index][0] = 'nop';
    } else {
      continue;
    }

    let accomulator = 0;
    let cur = 0;

    const executed = new Set();

    while (!executed.has(cur)) {
      executed.add(cur);

      const [type, value] = modifiedIns[cur];

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

      if (cur === instructions.length - 1) {
        return accomulator;
      }
    }
  }
}

// output answer
console.log(runProgram(input));
