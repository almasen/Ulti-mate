import { Card } from './classes/Card';
import { getAllSubsets } from './util';

const shuffle = (deck: Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

const calculatePossibleHands = (deck: any[]) => {
    const allSubsets = getAllSubsets(deck);
    const possibleHands: any[][] = [];
    allSubsets.forEach((subset: any[]) => {
        if (subset.length === 10) {
            possibleHands.push(subset);
        }
    });
    return possibleHands;
}

export { shuffle, calculatePossibleHands };
