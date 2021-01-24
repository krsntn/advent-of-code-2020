const fs = require('fs');
const filename = 'src/day-22/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function runProgram(input) {
  let players = [],
    player1 = [],
    player2 = [];
  for (const iterator of input) {
    cards = iterator.split('\n');
    cards.shift();
    players.push(cards.map((x) => +x));
  }

  player1 = players[0];
  player2 = players[1];

  while (player1.length !== 0 && player2.length !== 0) {
    const player1Card = player1.shift();
    const player2Card = player2.shift();

    if (player1Card > player2Card) {
      player1.push(player1Card, player2Card);
    } else {
      player2.push(player2Card, player1Card);
    }
  }

  const result = player1.length ? player1 : player2;

  let ans = 0;
  for (let i = result.length - 1, j = 0; i >= 0; i--, j++) {
    ans += (j + 1) * result[i];
  }
  return ans;
}

// output answer
console.log(runProgram(input));
