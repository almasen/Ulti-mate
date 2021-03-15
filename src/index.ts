/* tslint:disable:no-console */
import chalk from 'chalk';
import { getHand, getPossibleOpponentCards } from './cli';
import { calculateAndSortPossibleHands } from './util/card-deck';
import { sortHand } from './util/hand';
import { Card } from './classes/Card';
import { Hand } from './classes/Hand';
import { calculateHandPotential } from './mini-games';

const hand: Hand = getHand();
const possibleOpponentCards: Card[] = getPossibleOpponentCards();

const handPotential = calculateHandPotential(hand);

console.log(`expected value of hand is ${chalk.cyan(handPotential.expectedValue)}`);
console.log(`expected rank of hand is ${chalk.cyan(handPotential.bestMiniGame)}`);

console.log('Calculating opponent hands..');

console.time('calcOpponentHands');
const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);
console.timeEnd('calcOpponentHands');

let opponentHandPotentials = 0;
let greaterRankCount = 0;

// const possibleHeuristics = new Map();
console.time('calcOpponentChances');
possibleOpponentHands.forEach((opponentHand: Card[]) => {
    const sortedOpponentHand = sortHand(opponentHand);
    const opponentHandPotential = calculateHandPotential(sortedOpponentHand);
    opponentHandPotentials += opponentHandPotential.expectedValue;
    if (handPotential.bestMiniGame < opponentHandPotential.bestMiniGame) {
        ++greaterRankCount;
    }
});
console.timeEnd('calcOpponentChances');

console.log(`opponent hands total value: ${chalk.yellow(opponentHandPotentials)}`);
console.log(
    `expected value of opponent hands is ${chalk.yellow(opponentHandPotentials / possibleOpponentHands.length)}`,
);
console.log(`greater ranking opponent hands are ${chalk.yellow(greaterRankCount)}/22C10`);

// // graph bs
// const keys: number[] = [];
// let highestCount = 0;
// possibleHeuristics.forEach((value, key) => {
//     keys.push(key);
//     if (value > highestCount) {
//         highestCount = value;
//     }
// });
// keys.sort((a, b) => a - b);

// console.log('\n\n');
// // console.log(highestCount);

// keys.forEach(k => {
//     const relative = Math.round((possibleHeuristics.get(k) / highestCount) * 100);
//     k < 100
//         ? console.log(`${k}  ` + 'o'.repeat(relative))
//         : console.log(`${k} ` + 'o'.repeat(relative));
// });
// console.log(possibleHeuristics)
