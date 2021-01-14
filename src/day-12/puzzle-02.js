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

function rotate(pos, dir, unit) {
  const angle = (dir === 'L' ? unit : unit * -1) * (Math.PI / 180);
  const newX = pos[0] * Math.cos(angle) - pos[1] * Math.sin(angle);
  const newY = pos[1] * Math.cos(angle) + pos[0] * Math.sin(angle);
  return [Math.round(newX), Math.round(newY)];
}

function runProgram(input) {
  let pos = [0, 0];
  let wpos = [10, 1];

  for (const iterator of input) {
    const [, action, unit] = /(\D+)(\d+)/g.exec(iterator);
    if (['N', 'S', 'E', 'W'].includes(action)) {
      wpos = move(wpos, action, +unit);
    } else if (['R', 'L'].includes(action)) {
      wpos = rotate(wpos, action, +unit);
    } else if (action === 'F') {
      pos = [pos[0] + wpos[0] * +unit, pos[1] + wpos[1] * +unit];
    }
  }

  return pos.reduce((a, b) => a + Math.abs(b));
}

// output answer
console.log(runProgram(input));
