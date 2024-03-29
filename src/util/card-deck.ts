import { Card } from '../classes/Card';
import { Hand } from '../classes/Hand';
import { sortHand } from './hand';
import { getAllSubsets } from './subset';

/**
 * Durstenfeld shuffle an array.
 * JS implementation courtesy of Laurens Holst @ StackOverflow.
 * @param array
 */
const shuffle = (deck: Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

const calculateAndSortPossibleHands = (deck: Card[]): Card[][] => {
    const allSubsets = getAllSubsets(deck);
    const possibleHands: Card[][] = [];
    allSubsets.forEach((subset: any[]) => {
        if (subset.length === 10) {
            possibleHands.push(subset);
        }
    });
    return possibleHands;
};

export { shuffle, calculateAndSortPossibleHands };
