/* tslint:disable:no-console */
import { Hand } from '../classes/Hand';
import { Simple } from './classes/Simple';
import { Betli } from './classes/Betli';
import { Durchmarsch } from './classes/Durchmarsch';
import { MiniGame } from './classes/MiniGame';

// TODO: params from global ruleset
const supportedMiniGames: MiniGame[] = [
    new Simple(1, 1, 'Simple', false),
    new Simple(2, 2, 'Simple of Hearts', true),
    new Betli(6, 5, 'Betli'),
    new Durchmarsch(7, 6, 'Durchmarsch', false),
];

type handPotential = {
    expectedValue: number;
    bestMiniGame: number;
};

const calculateHandPotential = (hand: Hand): handPotential => {
    let expectedHandValue: number = 0;
    let bestMiniGame: number = 0;
    if (hand.logging) {
        console.log(`\nCalculating chances for supported minigames:`);
    }
    supportedMiniGames.forEach(miniGame => {
        const expectedMiniGameValue = miniGame.calculateExpectedValue(hand);
        const miniGameRank = miniGame.rank;
        if (
            expectedMiniGameValue !== 0 &&
            (expectedMiniGameValue > expectedHandValue ||
                (expectedMiniGameValue === expectedHandValue && miniGameRank > bestMiniGame))
        ) {
            expectedHandValue = expectedMiniGameValue;
            bestMiniGame = miniGameRank;
        }
    });
    return {
        expectedValue: expectedHandValue,
        bestMiniGame,
    };
};

export { calculateHandPotential };
