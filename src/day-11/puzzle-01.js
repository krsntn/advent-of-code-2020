const fs = require('fs');
const filename = 'src/day-11/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((x) => x.split(''));

function isOccupied(input) {
  return input === '#';
}

function runProgram(input, round) {
  const newSeats = JSON.parse(JSON.stringify(input));
  let seats = [];
  while (JSON.stringify(newSeats) !== JSON.stringify(seats)) {
    seats = JSON.parse(JSON.stringify(newSeats));

    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[row].length; col++) {
        const pointer = seats[row][col];
        if (pointer === '.') continue;
        let adOccupied = 0;

        adOccupied += seats[row - 1]
          ? seats[row - 1].filter(
              (x, i) => i >= col - 1 && i <= col + 1 && isOccupied(x)
            ).length
          : 0;
        adOccupied += seats[row].filter(
          (x, i) => (i === col - 1 || i === col + 1) && isOccupied(x)
        ).length;
        adOccupied += seats[row + 1]
          ? seats[row + 1].filter(
              (x, i) => i >= col - 1 && i <= col + 1 && isOccupied(x)
            ).length
          : 0;

        if (pointer === 'L' && adOccupied === 0) {
          newSeats[row][col] = '#';
        } else if (pointer === '#' && adOccupied >= 4) {
          newSeats[row][col] = 'L';
        }
      }
    }
  }

  return newSeats
    .map((x) => x.filter((y) => isOccupied(y)).length)
    .reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
