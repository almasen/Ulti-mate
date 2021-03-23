// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP, SUITS } from '../../globals';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

test('hand suit deficiencies ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.getSuitDeficiencies()).toBe(2);
});

test('hand suit deficiencies ♥ A K O U X IX VIII VII ♦ A ♠ X', () => {
    const hand = new Hand();
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(20));
    expect(hand.getSuitDeficiencies()).toBe(1);
});

test('hand suit deficiencies ♥ K O U X IX VIII VII ♦ A ♠ O ♣ K', () => {
    const hand = new Hand();
    for (let i = 1; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(18));
    hand.addCard(CARD_MAP.get(25));
    expect(hand.getSuitDeficiencies()).toBe(0);
});
