const fs = require('fs');
const filename = 'src/day-21/input.txt';
const input = fs.readFileSync(filename, 'utf8');

function runProgram(input) {
  const lines = input.split('\n');
  const allergenMap = {};

  lines.forEach((line) => {
    const regex = /(.+) \(contains (.+)\)/g;
    const [, ingredients, allergens] = regex.exec(line);
    allergens.split(', ').map((x) => {
      allergenMap[x] = [...(allergenMap[x] ?? ''), ...ingredients.split(' ')];
    });
  });

  const resultMap = {};
  for (const key of Object.keys(allergenMap).sort()) {
    const counts = allergenMap[key].reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );
    resultMap[key] = mostFrequent;
  }

  while (Object.values(resultMap).some((x) => x.length !== 1)) {
    const toDeleteWords = Object.values(resultMap).filter(
      (x) => x.length === 1
    );
    for (const key of Object.keys(resultMap)) {
      if (
        resultMap[key].length > 1 &&
        toDeleteWords.flat().some((w) => resultMap[key].includes(w))
      ) {
        resultMap[key] = resultMap[key].filter(
          (x) => !toDeleteWords.flat().includes(x)
        );
      }
    }
  }

  return Object.keys(resultMap)
    .sort()
    .map((x) => resultMap[x])
    .join(',');
}

// output answer
console.log(runProgram(input));
