const fs = require('fs');
const filename = 'src/day-13/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function runProgram(time, busIDs) {
  const arr = [];
  for (const id of busIDs) {
    const diff = +id - (time % +id);
    arr.push(diff);
  }

  const selectedBusID = busIDs[arr.indexOf(Math.min(...arr))];
  return selectedBusID * Math.min(...arr);
}

// output answer
console.log(runProgram(input[0], input[1].match(/\d+/g)));
