/* tslint:disable:no-console */
// import { randomBytes } from 'crypto';
import { calculateAndSortPossibleHands } from './util/card-deck';
import { DECK, CARD_MAP } from './globals';
import { sortHand } from './util/hand';
import { calculateChance } from './mini-games/durchmarsch';
import chalk from 'chalk';
import { Card } from './classes/Card';

declare global {
    var MAX_RISK: number;
}
const args = process.argv.slice(2);
globalThis.MAX_RISK = args[0] ? parseInt(args[0], 10) / 100 : 0.8;

const hand = sortHand(DECK.slice(0, 10));
// const handMap = new Map(); ??
const possibleOpponentCards = DECK.slice(10);

const durchmarschChance = calculateChance(hand);

console.log(hand.printWholeHand());
console.log(`durchmarsch chance is ${chalk.cyan(durchmarschChance * 100)}%`);

console.log("Calculating opponent hands..");

console.time("calcSortPossibleHand");
const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);
console.timeEnd("calcSortPossibleHand");

let opponentDurchmarschChances = 0;

// const possibleHeuristics = new Map();

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

console.log(`opponent durchmarsch chance is ${chalk.cyan(opponentDurchmarschChances / possibleOpponentHands.length * 100)}%`);

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
