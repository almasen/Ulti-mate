/* tslint:disable:no-console */
import { randomBytes } from 'crypto';
import { calculateAndSortPossibleHands } from './card-deck';
import { SUITS, RANKS, DECK, DEFAULT_DECK, CARD_MAP } from './globals';
import { sortHand } from './hand';
import { calculateExpectedValue } from './mini-games/durchmarsch';

const args = process.argv.slice(2);
const MAX_RISK = args[0] ? parseInt(args[0], 10) : 80;

const hand = sortHand(DECK.slice(0, 10));
// const handMap = new Map(); ??
const possibleOpponentCards = DECK.slice(10);
const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);

// const durchmarschChance = calculateExpectedValue(hand);

console.log(possibleOpponentHands.length);
console.log(possibleOpponentHands[0]);
// console.log(hand[0]);

// let handHeuristic = 0;

// hand.forEach(card => {
//     handHeuristic += card.id;
//     handMap.set(card.id, card);
// });

// let opponentWorstCaseHeuristic = 0;

// console.log('hand');
// console.log(handMap);
// console.log('\n');

// let topCount = 0;
// for (let h = 31; topCount < 10; h--) {
//     if (!handMap.has(h)) {
//         // console.log(`hand map doesn't have ${h}`)
//         opponentWorstCaseHeuristic += h;
//         ++topCount;
//     }
// }

// console.log('hand heur: ' + handHeuristic);
// console.log('opp worst case heur: ' + opponentWorstCaseHeuristic);
// console.log('\n\nStarting simulation...\n');

// console.log('Step 1) Getting all subsets...');
// console.time('gettingSubsets');
// const subsets = getAllSubsets(possibleOpponentCards);
// console.timeEnd('gettingSubsets');
// console.log(`Found ${subsets.length} subsets. Done.\n`);

// console.log('Step 2) Sorting out subsets of valid length (10) for a hand');

// console.time('sortingHands');
// const possibleHands = [];
// subsets.forEach(e => {
//     if (e.length === 10) {
//         possibleHands.push(e);
//     }
// });
// console.timeEnd('sortingHands');

// console.log(`Found ${possibleHands.length} subsets of length 10.\n`);

// console.log('Step 3) Validating count of possible hands');

// if (646646 === possibleHands.length) {
//     console.log(`Possible hands is indeed 22C10.\n`);
// } else {
//     console.err(`Possible hands is not 22C10.`);
//     throw new Error('Possible hands is not 22C10');
// }

// console.log('Step 4) Calculating heuristic values of each possible hand...');

// // let progress = 0;
// const possibleHeuristics = new Map();

// // const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
// // bar1.start(possibleHands.length, 0);
// console.time('possibleHeurs');
// possibleHands.forEach(e => {
//     let handHeur = 0;
//     e.forEach(card => {
//         handHeur += card.id;
//     });
//     if (possibleHeuristics.has(handHeur)) {
//         possibleHeuristics.set(handHeur, possibleHeuristics.get(handHeur) + 1);
//     } else {
//         possibleHeuristics.set(handHeur, 1);
//     }

//     // ++progress;

//     // bar1.update(progress);
// });

// // bar1.stop();
// console.timeEnd('possibleHeurs');
// console.log('Calculating heuristic values is finished.\n');

// // console.log(possibleHeuristics);

// console.log('Step 5) Calculating expected heuristic value of an opponent hand.');

// let expectedHeur = 0;
// let totalHeur = 0;
// let count = 0;

// possibleHeuristics.forEach((value, key) => {
//     count += value;
//     totalHeur += key * value;
// });

// console.log(`Total heur is ${totalHeur}`);
// console.log(`Total count is ${count}`);

// expectedHeur = totalHeur / count;

// console.log(`Expected heuristic value is: ${expectedHeur}\n`);

// console.timeEnd('total');

// console.log(`\n======= Overall =======`);
// console.log('hand heuristic: ' + handHeuristic);
// console.log('opponent expected heur: ' + expectedHeur);
// console.log(
//     `hand heur is ${handHeuristic > expectedHeur ? 'GREATER' : 'LOWER'} than exp. opponent heur\n`,
// );
// console.log('opp best case heur: ' + opponentWorstCaseHeuristic);

// // console.log(possibleHands)con

// if (!args.includes('--curve')) {
//     return;
// }

// // graph bs
// const keys = [];
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
// // console.log(possibleHeuristics)
