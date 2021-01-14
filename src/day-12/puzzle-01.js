const fs = require('fs');
const filename = 'src/day-12/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function move(pos, dir, unit) {
  if (['N', 'S'].includes(dir)) {
    return [pos[0], dir === 'N' ? pos[1] + unit : pos[1] - unit];
  } else if (['E', 'W'].includes(dir)) {
    return [dir === 'E' ? pos[0] + unit : pos[0] - unit, pos[1]];
  }
}

function rotate(face, dir, unit) {
  const arr = ['N', 'E', 'S', 'W'];
  const u = unit / 90;
  const facing = arr.indexOf(face);
  let cal = dir === 'R' ? facing + u : facing - u;
  const newIndex = ((cal % arr.length) + arr.length) % arr.length;
  return arr[newIndex];
}

function runProgram(input) {
  let pos = [0, 0];
  let face = 'E';

  for (const iterator of input) {
    const [, action, unit] = /(\D+)(\d+)/g.exec(iterator);
    if (['N', 'S', 'E', 'W', 'F'].includes(action)) {
      pos = move(pos, action === 'F' ? face : action, +unit);
    } else if (['R', 'L'].includes(action)) {
      face = rotate(face, action, +unit);
    }
  }

  return pos.reduce((a, b) => a + Math.abs(b));
}

// output answer
console.log(runProgram(input));
