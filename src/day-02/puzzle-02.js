const fs = require('fs');
const filename = 'src/day-02/input.txt';
const inputList = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((text) => text.split(' '));

function isValidPassword(policy, character, password) {
  const ch = character.replace(':', '');
  const pl = policy.split('-');

  return (
    (password[pl[0] - 1] === ch && password[pl[1] - 1] !== ch) ||
    (password[pl[0] - 1] !== ch && password[pl[1] - 1] === ch)
  );
}

let validPasswordCount = 0;
inputList.forEach((item) => {
  if (isValidPassword(item[0], item[1], item[2])) {
    validPasswordCount++;
  }
});

// output answer
console.log(validPasswordCount);
