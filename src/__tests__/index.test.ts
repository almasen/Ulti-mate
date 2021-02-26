// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP } from '../globals';
import {calculateExpectedValue} from '../mini-games/durchmarsch';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.80;

test('durchmarsch ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmarsch ♥ K O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmarsch ♥ A O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 1) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmarsch ♥ K O U X IX VIII VII ♦ A K ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmarsch ♥ A K O U X IX VIII VII ♦ A ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmarsch ♥ A K O U X IX VIII VII ♦ A O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 9) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
    console.log(hand.printWholeHand());
});
