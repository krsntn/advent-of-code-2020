const fs = require('fs');
const filename = './input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((text) => text);

let trees = 0;

function moveDown(input, pos) {
  const position = pos % input.length;

  if (input[position] === '#') {
    trees++;
  }
}

for (let index = 1; index < input.length; index++) {
  const element = input[index];
  moveDown(element, index * 3);
}

// output answer
console.log(trees);
