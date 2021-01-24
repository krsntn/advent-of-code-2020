const fs = require('fs');
const filename = 'src/day-22/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n\n');

function recursiveCombat(deck1, deck2) {
  const alreadyPlayed = new Set();

  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    const state = deck1.join(',') + '#' + deck2.join(',');
    if (alreadyPlayed.has(state)) {
      return { winner: 1, deck: deck1 };
    }
    alreadyPlayed.add(state);

    let winner = null;
    if (deck1.length >= card1 && deck2.length >= card2) {
      const { winner: player } = recursiveCombat(
        deck1.slice(0, card1),
        deck2.slice(0, card2)
      );
      winner = player;
    } else {
      winner = card1 > card2 ? 1 : 2;
    }

    if (winner === 1) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }

  return {
    winner: deck1.length > 0 ? 1 : 2,
    deck: deck1.length > 0 ? deck1 : deck2,
  };
}

function runProgram(input) {
  let players = [];
  for (const iterator of input) {
    cards = iterator.split('\n');
    cards.shift();
    players.push(cards.map((x) => +x));
  }

  const { deck } = recursiveCombat(players[0], players[1]);

  let ans = 0;
  for (let i = deck.length - 1, j = 0; i >= 0; i--, j++) {
    ans += (j + 1) * deck[i];
  }
  return ans;
}

// output answer
console.log(runProgram(input));
