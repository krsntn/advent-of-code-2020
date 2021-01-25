const fs = require('fs');
const filename = 'src/day-24/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function runProgram(input) {
  const blackTiles = new Set();

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

  return blackTiles.size;
}

// output answer
console.log(runProgram(input));
