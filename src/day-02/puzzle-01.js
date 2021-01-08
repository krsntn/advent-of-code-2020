const fs = require('fs');
const filename = './input.txt';
const inputList = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((text) => text.split(' '));

function isValidPassword(policy, character, password) {
  const ch = character.replace(':', '');
  const pl = policy.split('-');

  const count = [...password].filter((x) => x === ch).length;

  return count >= pl[0] && count <= pl[1];
}

let validPasswordCount = 0;
inputList.forEach((item) => {
  if (isValidPassword(item[0], item[1], item[2])) {
    validPasswordCount++;
  }
});

// output answer
console.log(validPasswordCount);
