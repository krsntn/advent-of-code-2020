const fs = require('fs');
const filename = 'src/day-07/input.txt';
const input = fs.readFileSync(filename, 'utf8');

function generateTree(input) {
  const inputString = input.replace(/ bags?/g, '');
  const regex = /(\w.*)\scontain\s([\w\s,]*)/g;
  const tree = {};

  let regexResult;
  while ((regexResult = regex.exec(inputString))) {
    tree[regexResult[1]] = regexResult[2].split(', ');
  }

  return tree;
}

const regexDigit = /\d+/g;

function calcBagWithin(tree, bag) {
  let arr = [];
  function calcChildBags(childBags) {
    if (childBags.length === 1) {
      const count = childBags[0].match(regexDigit);
      if (count === null) {
        return 0;
      }
    }

    let result = 0;
    for (const element of childBags) {
      const count = Number(element.match(/\d+/g)[0]);
      const ele = element.replace(/\d+\s/g, '');

      if (tree[ele]) {
        result += count + count * calcChildBags(tree[ele]);
      }
    }
    return result;
  }

  return calcChildBags(tree[bag]);
}

// output answer
const bagTree = generateTree(input);
console.log(calcBagWithin(bagTree, 'shiny gold'));
