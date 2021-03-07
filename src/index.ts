/* tslint:disable:no-console */
// import { randomBytes } from 'crypto';
import { calculateAndSortPossibleHands } from './util/card-deck';
import { DECK, CARD_MAP } from './globals';
import { sortHand } from './util/hand';
import { calculateChance } from './mini-games/durchmarsch';
import chalk from 'chalk';
import { Card } from './classes/Card';
import { Hand } from './classes/Hand';

declare global {
    var MAX_RISK: number;
}
const args = process.argv.slice(2);
globalThis.MAX_RISK = args[0] ? parseInt(args[0], 10) / 100 : 0.5;
console.log(`Maximum risk is ${chalk.cyan(MAX_RISK * 100)}%`);

let hand: Hand;
let possibleOpponentCards: Card[];

if (args[1]) {
    const customHand = args[1].trim().split(',');
    hand = new Hand();
    possibleOpponentCards = [];
    const cards = new Map(CARD_MAP);
    customHand.forEach((e) => {
        const id = parseInt(e, 10);
        const card = cards.get(id);
        if (card) {
            hand.addCard(card);
        }
        cards.delete(id);
    });
    cards.forEach((value, key) => {
        possibleOpponentCards.push(value);
    });
} else {
    hand = sortHand(DECK.slice(0, 10));
    possibleOpponentCards = DECK.slice(10);
}

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
