import { Card } from '../classes/Card';

const TOTAL_VALUE = 6;
const GAME_RANK = 7;

const meetsPrerequisites = (hand: Card[]): boolean => {
    let aceCount = 0;
    hand.forEach((card: Card) => {
        if (card.rank.name === 'A') {
            ++aceCount;
        }
    });
    return aceCount >= 2;
};

const calculateExpectedValue = (hand: Card[]) => {
    if (!meetsPrerequisites(hand)) {
        return 0;
    }
};

export { calculateExpectedValue };
