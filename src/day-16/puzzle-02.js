const fs = require('fs');
const filename = 'src/day-16/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function parseA(input) {
  const rules = {};
  for (const iterator of input) {
    const regex = /(.+):.*?(\d+-\d+).*?(\d+-\d+)/;
    const values = regex.exec(iterator);
    const p1 = values[2].split('-').map((x) => +x);
    const p2 = values[3].split('-').map((x) => +x);

    rules[values[1]] = (num) => {
      return (num >= p1[0] && num <= p1[1]) || (num >= p2[0] && num <= p2[1]);
    };
  }
  return rules;
}

function transpose(input) {
  const inputGrid = input.map((x) => x.split(',').map((y) => +y));
  const newGrid = Array(inputGrid[0].length)
    .fill()
    .map((x) => []);
  for (let i = 0; i < inputGrid.length; i++) {
    for (let j = 0; j < inputGrid[i].length; j++) {
      newGrid[j][i] = inputGrid[i][j];
    }
  }
  return newGrid;
}

function runProgram(input) {
  const rules = parseA(input[0].split('\n'));
  const validTickets = input[2]
    .split('\n')
    .filter(
      (x) =>
        !x.startsWith('nearby') &&
        x
          .split(',')
          .every((value) => Object.values(rules).some((rule) => rule(+value)))
    );

  const transposed = transpose(validTickets);
  const possibles = [];

  for (let i = 0; i < transposed.length; i++) {
    const elements = transposed[i];
    const validClasses = Object.keys(rules).filter((x) =>
      elements.every((num) => rules[x](num))
    );
    possibles.push(validClasses);
  }

  const ans = {};
  while (Object.keys(ans).length < Object.keys(possibles).length) {
    for (let i = 0; i < possibles.length; i++) {
      if (possibles[i].length === 1) {
        ans[possibles[i][0]] = i;

        const classToRemove = possibles[i][0];
        for (let index = 0; index < possibles.length; index++) {
          possibles[index] = possibles[index].filter(
            (x) => x !== classToRemove
          );
        }
      }
    }
  }

  // calc my ticket
  const myTicketClasses = {};
  const myTicketNums = input[1].split('\n')[1].split(',');
  for (const iterator of Object.keys(ans)) {
    myTicketClasses[iterator] = +myTicketNums[ans[iterator]];
  }

  return Object.keys(myTicketClasses)
    .filter((x) => x.startsWith('departure'))
    .reduce((a, b) => a * +myTicketClasses[b], 1);
}

// output answer
console.log(runProgram(input));
