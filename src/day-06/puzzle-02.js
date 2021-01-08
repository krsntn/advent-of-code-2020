const fs = require('fs');
const filename = 'src/day-06/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');
const inputList = input.map((x) => x.split('\n'));

function getOccurrence(arr, value) {
  let count = 0;
  arr.forEach((char) => char === value && count++);
  return count;
}

function getResult(inputList) {
  const counts = [];
  inputList.forEach((group) => {
    let counter = [];
    group.forEach((people) => {
      counter = [...counter, ...people];
    });

    const uniqueSet = new Set(counter);

    let total = 0;
    [...uniqueSet].forEach((char) => {
      if (getOccurrence(counter, char) === group.length) {
        total++;
      }
    });
    counts.push(total);
  });

  return counts.reduce((a, b) => a + b);
}

// output answer
console.log(getResult(inputList));
