const fs = require('fs');
const filename = 'src/day-23/input.txt';
const input = fs.readFileSync(filename, 'utf8');

function runProgram(input) {
  let curPos = 0;
  let cups = [...input].map((x) => +x);

  for (let move = 0; move < 100; move++) {
    const curCup = cups[curPos];
    const pickUp = [];

    for (let x = 1; x <= 3; x++) {
      const pickUpPos = (curPos + x) % cups.length;
      pickUp.push(cups[pickUpPos]);
    }

    for (let x = 0; x < 3; x++) {
      cups.splice(cups.indexOf(pickUp[x]), 1);
    }

    let des = curCup - 1;
    while (true) {
      if (cups.includes(des)) {
        cups.splice(cups.indexOf(des) + 1, 0, ...pickUp);
        break;
      }

      if (des > 0) {
        des--;
      } else {
        des = Math.max(...cups);
      }
    }

    curPos = (cups.indexOf(curCup) + 1) % cups.length;
  }

  const ans = [];
  let index = (cups.indexOf(1) + 1) % cups.length;
  while (ans.length < input.length - 1) {
    ans.push(cups[index]);
    index = (index + 1) % cups.length;
  }

  return ans.join('');
}

// output answer
console.log(runProgram(input));
