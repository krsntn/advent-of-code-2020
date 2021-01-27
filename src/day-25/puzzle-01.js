const fs = require('fs');
const filename = 'src/day-25/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function getLoopSize(publicKey) {
  const subjectNum = 7;
  let value = 7;
  let i = 1;
  while (value !== publicKey) {
    value *= subjectNum;
    value = value % 20201227;
    i++;
  }
  return i;
}

function getEncryptionKey(publicKey, loopSize) {
  const subjectNum = publicKey;
  let value = 1;
  let i = 1;
  while (i <= loopSize) {
    value *= subjectNum;
    value = value % 20201227;
    i++;
  }
  return value;
}

function runProgram(input) {
  const cardPublicKey = +input[0];
  const doorPublicKey = +input[1];

  const cardLoopSize = getLoopSize(cardPublicKey);

  return getEncryptionKey(doorPublicKey, cardLoopSize);
}

// output answer
console.log(runProgram(input));
