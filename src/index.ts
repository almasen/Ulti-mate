/* tslint:disable:no-console */
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import { getHand, getPossibleOpponentCards, calculateOpponentHands } from './cli';
import { calculateAndSortPossibleHands } from './util/card-deck';
import { sortHand } from './util/hand';
import { Card } from './classes/Card';
import { Hand } from './classes/Hand';
import { calculateHandPotential } from './mini-games';

const hand: Hand = getHand();
const possibleOpponentCards: Card[] = getPossibleOpponentCards();

const handPotential = calculateHandPotential(hand);

console.log(`expected value of hand is: ${chalk.cyan(handPotential.expectedValue)}`);
console.log(`expected rank of hand is: ${chalk.cyan(handPotential.bestMiniGame)}`);

if (calculateOpponentHands) {
    console.log('\nCalculating opponent hands..');

    console.time('calcOpponentHands');
    const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);
    console.timeEnd('calcOpponentHands');

    let opponentHandPotentials = 0;
    let greaterRankCount = 0;

    const progressBar = new cliProgress.SingleBar({
        format:
            'Progress |' + chalk.cyanBright('{bar}') + '| {percentage}% || ETA: {eta}s || {value}/{total} Opponents',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
        stopOnComplete: true,
        clearOnComplete: true,
    });
    progressBar.start(possibleOpponentHands.length, 0);

    // const possibleHeuristics = new Map();
    console.time('calcOpponentChances');
    for (let i = 0; i < possibleOpponentHands.length; i++) {
        progressBar.update(i);
        const opponentHand: Card[] = possibleOpponentHands[i];
        const sortedOpponentHand = sortHand(opponentHand);
        const opponentHandPotential = calculateHandPotential(sortedOpponentHand);
        opponentHandPotentials += opponentHandPotential.expectedValue;
        if (handPotential.bestMiniGame < opponentHandPotential.bestMiniGame) {
            ++greaterRankCount;
        }
    }
    progressBar.update(possibleOpponentHands.length);
    console.timeEnd('calcOpponentChances');

    console.log(`opponent hands total value: ${chalk.yellow(opponentHandPotentials)}`);
    console.log(
        `expected value of opponent hands is ${chalk.yellow(opponentHandPotentials / possibleOpponentHands.length)}`,
    );
    console.log(`greater ranking opponent hands are ${chalk.yellow(greaterRankCount)}/22C10`);
}

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
