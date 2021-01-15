const fs = require('fs');
const filename = 'src/day-14/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function calcAddresses(addr) {
  if (addr.length === 0) {
    return [''];
  }

  const firstChar = addr[0];
  const partialAddr = calcAddresses(addr.slice(1));

  if (firstChar === 'X') {
    return [
      ...partialAddr.map((x) => '0' + x),
      ...partialAddr.map((x) => '1' + x),
    ];
  }

  return partialAddr.map((x) => firstChar + x);
}

function parseOps(mask, value) {
  const binVal = value.toString(2).padStart(36, '0');
  let newValue = '';

  for (let i = 0; i < mask.length; i++) {
    newValue += mask[i] === '0' ? binVal[i] : mask[i];
  }

  const memArr = calcAddresses(newValue);
  return memArr.map((x) => parseInt(x, 2));
}

function runProgram(input) {
  const regex = /\[(\d+).*?(\d+)/;
  const memory = {};
  let mask = null;

  for (const line of input) {
    const isMem = regex.exec(line);
    if (isMem) {
      const memArr = parseOps(mask, +isMem[1]);
      for (const mem of memArr) {
        memory[mem] = +isMem[2];
      }
    } else {
      mask = line.split(' = ')[1];
    }
  }

  return Object.values(memory).reduce((a, b) => a + b);
}

// output answer
console.log(runProgram(input));
