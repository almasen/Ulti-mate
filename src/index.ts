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

console.log(`Expected value of hand is: ${chalk.cyan(handPotential.expectedValue)}`);
console.log(`Expected rank of hand is: ${chalk.cyan(handPotential.bestMiniGame)}`);

if (calculateOpponentHands) {
    console.log('\nCalculating opponent hands..');

    const possibleOpponentHands = calculateAndSortPossibleHands(possibleOpponentCards);

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

    console.log(`Opponent hands total value: ${chalk.yellow(opponentHandPotentials)}`);
    console.log(
        `Expected value of opponent hands is ${chalk.yellow(opponentHandPotentials / possibleOpponentHands.length)}`,
    );
    console.log(`Greater ranking opponent hands are ${chalk.yellow(greaterRankCount)}/22C10`);
}
