const fs = require('fs');
const filename = 'src/day-06/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');
const inputList = input.map((x) => x.split('\n'));

function getResult(inputList) {
  const counts = [];
  inputList.forEach((group) => {
    let counter = [];
    group.forEach((people) => {
      counter = [...counter, ...people];
    });
    const filterCounter = new Set(counter);
    counts.push([...filterCounter].length);
  });
  return counts.reduce((a, b) => a + b);
}

// output answer
console.log(getResult(inputList));
