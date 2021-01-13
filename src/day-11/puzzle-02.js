const fs = require('fs');
const filename = 'src/day-11/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((x) => x.split(''));

function isOccupied(seats, row, col, horizontal, vertical) {
  let h = horizontal;
  let v = vertical;

  while (seats[row + v] && seats[row + v][col + h]) {
    if (seats[row + v][col + h] === '#') {
      return true;
    } else if (seats[row + v][col + h] === 'L') {
      return false;
    }

    h += horizontal;
    v += vertical;
  }
  return false;
}

function runProgram(input) {
  const newSeats = JSON.parse(JSON.stringify(input));
  let seats = [];
  while (JSON.stringify(newSeats) !== JSON.stringify(seats)) {
    seats = JSON.parse(JSON.stringify(newSeats));

    for (let row = 0; row < seats.length; row++) {
      for (let col = 0; col < seats[row].length; col++) {
        const pointer = seats[row][col];
        if (pointer === '.') continue;
        let adOccupied = 0;

        adOccupied += isOccupied(seats, row, col, -1, -1);
        adOccupied += isOccupied(seats, row, col, 0, -1);
        adOccupied += isOccupied(seats, row, col, 1, -1);

        adOccupied += isOccupied(seats, row, col, -1, 0);
        adOccupied += isOccupied(seats, row, col, 1, 0);

        adOccupied += isOccupied(seats, row, col, -1, 1);
        adOccupied += isOccupied(seats, row, col, 0, 1);
        adOccupied += isOccupied(seats, row, col, 1, 1);

        if (pointer === 'L' && adOccupied === 0) {
          newSeats[row][col] = '#';
        } else if (pointer === '#' && adOccupied >= 5) {
          newSeats[row][col] = 'L';
        }
      }
    }
  }

  return newSeats
    .map((x) => x.filter((y) => y === '#').length)
    .reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
