// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Simple } from '../../mini-games/classes/Simple';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const simple = new Simple(1, 1, 'Simple', false);

test('simple marriage score ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const marriageScore = simple.calculateMarriageScore(hand);
    expect(marriageScore).toBe(2);
});

test('simple marriage score ♥ K O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const marriageScore = simple.calculateMarriageScore(hand);
    expect(marriageScore).toBe(4);
});

test('simple marriage score ♥ A O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 1) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const marriageScore = simple.calculateMarriageScore(hand);
    expect(marriageScore).toBe(2);
});

test('simple marriage score ♥ K O U X IX VIII VII ♦ A K ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const marriageScore = simple.calculateMarriageScore(hand);
    expect(marriageScore).toBe(2);
});

test('simple marriage score ♥ A K O U X IX VIII VII ♦ A ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const marriageScore = simple.calculateMarriageScore(hand);
    expect(marriageScore).toBe(2);
});
