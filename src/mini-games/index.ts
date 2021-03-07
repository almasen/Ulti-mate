import { Hand } from '../classes/Hand';
import * as durchmarsch from './durchmarsch';

const supportedMiniGames = [durchmarsch];

type handPotential = {
    expectedValue: number;
    bestMiniGame: number;
};

const calculateHandPotential = (hand: Hand): handPotential => {
    let expectedHandValue: number = 0;
    let bestMiniGame: number = 0;
    supportedMiniGames.forEach((miniGame) => {
        const expectedMiniGameValue = miniGame.calculateExpectedValue(hand);
        const miniGameRank = miniGame.getRank();
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
