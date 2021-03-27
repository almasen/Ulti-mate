// @ts-nocheck
import { calculateAndSortPossibleHands } from '../../util/card-deck';
import { DECK } from '../../globals';

test('map freezer blocks changes to map as expected', () => {
    const opponentCards = DECK.slice(10);
    const opponentHands = calculateAndSortPossibleHands(opponentCards);
    expect(opponentHands.length).toBe(646646);
});
