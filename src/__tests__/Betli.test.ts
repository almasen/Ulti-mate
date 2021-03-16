// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP } from '../globals';
import { Betli } from '../mini-games/classes/Betli';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const betli = new Betli();

test('invalid hand length should throw an appropriate error', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(() => {
        betli.calculateExpectedValue(hand);
    }).toThrow(new Error('Invalid hand length 11'));
});
