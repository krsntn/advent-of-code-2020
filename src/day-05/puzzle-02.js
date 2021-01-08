const fs = require('fs');
const filename = 'src/day-05/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function getResult(rowInput, lowerHalf, upperHalf, lowerOption) {
  const half = (upperHalf - lowerHalf + 1) / 2;
  const flag = rowInput.charAt(0);
  if (flag === lowerOption) {
    upperHalf -= half;
  } else {
    lowerHalf += half;
  }

  if (rowInput.length > 1) {
    return getResult(rowInput.slice(1), lowerHalf, upperHalf, lowerOption);
  } else if (lowerHalf === upperHalf) {
    return lowerHalf;
  }
}

const answers = [];
input.forEach((item) => {
  const rowInput = item.slice(0, -3);
  const colInput = item.slice(-3);

  const seatRow = getResult(rowInput, 0, 127, 'F');
  const seatCol = getResult(colInput, 0, 7, 'L');

  answers.push(seatRow * 8 + seatCol);
});

function findMySeatID(seatIDs) {
  for (let id = Math.min(...seatIDs); id <= Math.max(...seatIDs); id++) {
    if (!seatIDs.includes(id)) {
      return id;
    }
  }
}

// output answer
console.log(findMySeatID(answers));
