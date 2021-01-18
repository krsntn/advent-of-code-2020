const fs = require('fs');
const filename = 'src/day-17/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function getNeighbours(key) {
  let neighbours = new Set();
  const keys = key.split(',').map((x) => +x);

  for (let dx = keys[0] - 1; dx <= keys[0] + 1; dx++) {
    for (let dy = keys[1] - 1; dy <= keys[1] + 1; dy++) {
      for (let dz = keys[2] - 1; dz <= keys[2] + 1; dz++) {
        for (let dw = keys[3] - 1; dw <= keys[3] + 1; dw++) {
          if (`${dx},${dy},${dz},${dw}` !== key) {
            neighbours.add(`${dx},${dy},${dz},${dw}`);
          }
        }
      }
    }
  }

  return neighbours;
}

function runProgram(input) {
  let activeSet = new Set();

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      if (input[x][y] === '#') {
        activeSet.add(`${x},${y},0,0`);
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    let newSet = new Set();
    let potentialNodes = new Map();

    for (const key of activeSet) {
      const neighbours = getNeighbours(key);
      let activeNeighboursCount = 0;

      for (const neighbour of neighbours) {
        if (activeSet.has(neighbour)) {
          activeNeighboursCount++;
        } else {
          potentialNodes.set(
            neighbour,
            potentialNodes.get(neighbour) !== undefined
              ? potentialNodes.get(neighbour) + 1
              : 1
          );
        }
      }

      if ([2, 3].includes(activeNeighboursCount)) {
        newSet.add(key);
      }
    }

    for (const potential of potentialNodes) {
      if (potential[1] === 3) {
        newSet.add(potential[0]);
      }
    }

    activeSet = newSet;
  }
  return activeSet.size;
}

// output answer
console.log(runProgram(input));
