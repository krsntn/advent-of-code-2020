const fs = require('fs');
const filename = 'src/day-20/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function extractEdges(tile) {
  const result = [
    tile[0],
    tile[tile.length - 1],
    tile.map((x) => x[0]).join(''),
    tile.map((x) => x[x.length - 1]).join(''),
  ];
  return result.concat(result.map((x) => reverseString(x)));
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function getMatches(tile1, tile2) {
  for (let i = 0; i < tile1.length; i++) {
    for (let j = 0; j < tile2.length; j++) {
      if (tile1[i] === tile2[j]) {
        return tile1[i];
      }
    }
  }
  return false;
}

function runProgram(input) {
  const arr = [];
  for (const iterator of input) {
    let id = null;
    let tile = [];
    for (const line of iterator.split('\n')) {
      if (line === iterator.split('\n')[0]) {
        const [, tileId] = line.match(/Tile (\d+):/);
        id = +tileId;
      } else {
        tile.push(line);
      }
    }
    const obj = { id, tile, matches: [] };
    arr.push(obj);
  }

  for (const iterator of arr) {
    iterator.tile = extractEdges(iterator.tile);
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const edge = getMatches(arr[i].tile, arr[j].tile);
      if (edge) {
        arr[i].matches.push(edge);
        arr[j].matches.push(edge);
      }
    }
  }

  const corners = arr.filter((x) => x.matches.length === 2).map((x) => x.id);

  return corners.reduce((a, b) => a * b);
}

// output answer
console.log(runProgram(input));
