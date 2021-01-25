const fs = require('fs');
const filename = 'src/day-24/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function getNeighbour(map, curTile) {
  const arr = [
    [-2, 0],
    [-1, -1],
    [1, -1],
    [2, 0],
    [1, 1],
    [-1, 1],
  ];
  const [curX, curY] = curTile.split(',').map((x) => +x);
  let count = 0;
  for (const [dx, dy] of arr) {
    if (map.has(`${curX + dx},${curY + dy}`)) {
      count++;
    }
  }
  return count;
}

function runProgram(input) {
  let blackTiles = new Set();

  for (const line of input) {
    let x = 0,
      y = 0;
    for (let i = 0; i < line.length; i++) {
      switch (line[i]) {
        case 'n':
          i++;
          y += 1;
          x = line[i] === 'e' ? x + 1 : x - 1;
          break;
        case 's':
          i++;
          y -= 1;
          x = line[i] === 'e' ? x + 1 : x - 1;
          break;
        case 'e':
          x += 2;
          break;
        case 'w':
          x -= 2;
          break;
      }
    }

    const newTile = `${x},${y}`;
    if (blackTiles.has(newTile)) {
      blackTiles.delete(newTile);
    } else {
      blackTiles.add(newTile);
    }
  }

  for (let day = 0; day < 100; day++) {
    const newBlackTiles = new Set();
    const arr = Array.from(blackTiles).map((x) => x.split(','));
    let min_x = Math.min(...arr.map((x) => x[0])) - 1;
    let max_x = Math.max(...arr.map((x) => x[0])) + 1;
    let min_y = Math.min(...arr.map((x) => x[1])) - 1;
    let max_y = Math.max(...arr.map((x) => x[1])) + 1;

    for (let x = min_x; x <= max_x; x++) {
      for (let y = min_y; y <= max_y; y++) {
        const curTile = `${x},${y}`;
        const neighbourCount = getNeighbour(blackTiles, curTile);
        if (
          blackTiles.has(curTile)
            ? neighbourCount === 1 || neighbourCount === 2
            : neighbourCount === 2
        ) {
          newBlackTiles.add(curTile);
        }
      }
    }
    blackTiles = newBlackTiles;
  }

  return blackTiles.size;
}

// output answer
console.log(runProgram(input));
