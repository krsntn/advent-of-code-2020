const fs = require('fs');
const filename = 'src/day-21/input.txt';
const input = fs.readFileSync(filename, 'utf8');

function runProgram(input) {
  const lines = input.split('\n');
  const allergenMap = new Map();
  const ingredientSet = new Set();

  lines.forEach((line) => {
    const regex = /(.+) \(contains (.+)\)/g;
    const [, ingredients, allergens] = regex.exec(line);
    allergens.split(', ').map((x) => {
      allergenMap.set(x, [
        ...(allergenMap.get(x) || ''),
        ...ingredients.split(' '),
      ]);
    });
    ingredients.split(' ').map((x) => ingredientSet.add(x));
  });

  for (const key of allergenMap.keys()) {
    const counts = allergenMap.get(key).reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );
    mostFrequent.map((x) => ingredientSet.delete(x));
  }

  const regex = new RegExp(`(${Array.from(ingredientSet).join('|')})`, 'g');
  return input.match(regex).length;
}

// output answer
console.log(runProgram(input));
