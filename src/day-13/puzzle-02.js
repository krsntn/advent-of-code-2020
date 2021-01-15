const fs = require('fs');
const filename = 'src/day-13/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

// prime number magic

function runProgram(busIDs) {
  let time = 0;
  let stepSize = +busIDs[0];

  for (let i = 1; i < busIDs.length; i++) {
    if (busIDs[i] === 'x') {
      continue;
    }

    const id = +busIDs[i];

    while ((time + i) % id !== 0) {
      time += stepSize;
    }
    stepSize *= id;
  }

  return time;
}

// output answer
console.log(runProgram(input[1].split(',')));
