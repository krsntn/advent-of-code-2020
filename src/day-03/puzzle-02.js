const fs = require('fs');
const filename = 'src/day-03/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((text) => text);

function meetTree(input, pos) {
  const position = pos % input.length;
  return input[position] === '#';
}

function go(right, down) {
  let trees = 0;
  for (let i = 1, index = down; index < input.length; i++, index += down) {
    const element = input[index];
    meetTree(element, i * right) && trees++;
  }
  return trees;
}

// input
const inputList = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const output = [];
inputList.forEach((item) => {
  output.push(go(item[0], item[1]));
});

// output answer
console.log(output.reduce((a, b) => a * b));
