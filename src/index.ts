/* tslint:disable:no-console */
import chalk from 'chalk';
import { getHand, getPossibleOpponentCards } from './cli';
import { calculateAndSortPossibleHands } from './util/card-deck';
import { sortHand } from './util/hand';
import { calculateChance } from './mini-games/durchmarsch';
import { Card } from './classes/Card';
import { Hand } from './classes/Hand';

console.log(`Maximum risk is ${chalk.cyan(MAX_RISK * 100)}%`);

const hand: Hand = getHand();
const possibleOpponentCards: Card[] = getPossibleOpponentCards();

const durchmarschChance = calculateChance(hand);

console.log(hand.printWholeHand());
console.log(`durchmarsch chance is ${chalk.cyan(durchmarschChance * 100)}%`);

console.log('Calculating opponent hands..');

console.time('calcOpponentHands');
const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);
console.timeEnd('calcOpponentHands');

let opponentDurchmarschChances = 0;

// const possibleHeuristics = new Map();
console.time('calcOpponentChances');
possibleOpponentHands.forEach((opponentHand: Card[]) => {
    const sortedOpponentHand = sortHand(opponentHand);
    const oppDurchmarschChance = calculateChance(sortedOpponentHand);
    opponentDurchmarschChances += oppDurchmarschChance;

    // if (possibleHeuristics.has(oppDurchmarschChance)) {
    //     possibleHeuristics.set(oppDurchmarschChance, possibleHeuristics.get(oppDurchmarschChance) + 1);
    // } else {
    //     possibleHeuristics.set(oppDurchmarschChance, 1);
    // }
});
console.timeEnd('calcOpponentChances');

console.log(opponentDurchmarschChances);
console.log(
    `opponent durchmarsch chance is ${chalk.cyan((opponentDurchmarschChances / possibleOpponentHands.length) * 100)}%`,
);

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
