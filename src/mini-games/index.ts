/* tslint:disable:no-console */
import chalk from 'chalk';
import { Hand } from '../classes/Hand';
import { Simple } from './classes/Simple';
import { Betli } from './classes/Betli';
import { Durchmars } from './classes/Durchmars';
import { MiniGame } from './classes/MiniGame';

// TODO: params from global ruleset
const supportedMiniGames: MiniGame[] = [
    new Simple(1, 1, 'Simple', false),
    new Simple(2, 2, 'Simple of Hearts', true),
    new Betli(6, 5, 'Betli', 0.5),
    new Durchmars(7, 6, 'Plain Durchmars', false, 0.5),
    new Betli(15, 10, 'Rebetli', 0.75),
    new Durchmars(19, 12, 'Plain Redurchmars', false, 0.75),
    new Betli(29, 20, 'Open Betli', 0.9),
    new Durchmars(34, 24, 'Plain Open Durchmars', false, 0.9),
];

type handPotential = {
    expectedValue: number;
    bestMiniGame: number;
};

const calculateHandPotential = (hand: Hand): handPotential => {
    let expectedHandValue: number = 0;
    let bestMiniGame: MiniGame | any = null;
    let bestRank: number = 0;
    if (hand.logging) {
        console.log(`\nCalculating chances for supported minigames:`);
    }
    supportedMiniGames.forEach((miniGame) => {
        const expectedMiniGameValue = miniGame.calculateExpectedValue(hand);
        const miniGameRank = miniGame.rank;
        if (
            expectedMiniGameValue !== 0 &&
            (expectedMiniGameValue > expectedHandValue ||
                (expectedMiniGameValue === expectedHandValue && (!bestMiniGame || miniGameRank > bestMiniGame.rank)))
        ) {
            expectedHandValue = expectedMiniGameValue;
            bestMiniGame = miniGame;
            bestRank = miniGame.rank;
        }
    });
    if (hand.logging) {
        console.log(`\nBest minigame to play is: ${bestMiniGame ? chalk.green(bestMiniGame.name) : chalk.red('none')}`);
    }
    return {
        expectedValue: expectedHandValue,
        bestMiniGame: bestRank,
    };
};

export { calculateHandPotential };
