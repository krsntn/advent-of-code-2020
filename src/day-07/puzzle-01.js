const fs = require('fs');
const filename = 'src/day-07/input.txt';
const input = fs.readFileSync(filename, 'utf8');

function generateTree(input) {
  const inputString = input.replace(/ bags?|\d /g, '');
  const regex = /(\w.*)\scontain\s([\w\s,]*)/g;
  const tree = {};

  let regexResult;
  while ((regexResult = regex.exec(inputString))) {
    tree[regexResult[1]] = regexResult[2].split(', ');
  }

  return tree;
}

function getContainBags(tree, bagToFind) {
  function containToFindBag(childBags, bag) {
    if (childBags.includes(bag)) {
      return true;
    }

    let result = false;
    childBags.forEach((element) => {
      if (tree[element] && !result) {
        result = containToFindBag(tree[element], bagToFind);
      }
    });

    return result;
  }

  let count = 0;
  Object.keys(tree).forEach((key) => {
    containToFindBag(tree[key], bagToFind) && count++;
  });
  return count;
}

// output answer
const bagTree = generateTree(input);
console.log(getContainBags(bagTree, 'shiny gold'));
