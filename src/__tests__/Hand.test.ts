// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP } from '../globals';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

test('hand insertion ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.length).toBe(10);

    expect(hand.hearts.length).toBe(8);
    expect(hand.bells.length).toBe(2);
    expect(hand.leaves.length).toBe(0);
    expect(hand.acorns.length).toBe(0);

    expect(hand.aces.length).toBe(2);
    expect(hand.kings.length).toBe(2);
    expect(hand.overs.length).toBe(1);
    expect(hand.unters.length).toBe(1);
    expect(hand.tens.length).toBe(1);
    expect(hand.nines.length).toBe(1);
    expect(hand.eights.length).toBe(1);
    expect(hand.sevens.length).toBe(1);
});

test('hand card removal ♥ K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.length).toBe(10);

    expect(hand.hearts.length).toBe(8);
    expect(hand.bells.length).toBe(2);
    expect(hand.leaves.length).toBe(0);
    expect(hand.acorns.length).toBe(0);

    expect(hand.aces.length).toBe(2);
    expect(hand.kings.length).toBe(2);
    expect(hand.overs.length).toBe(1);
    expect(hand.unters.length).toBe(1);
    expect(hand.tens.length).toBe(1);
    expect(hand.nines.length).toBe(1);
    expect(hand.eights.length).toBe(1);
    expect(hand.sevens.length).toBe(1);

    hand.removeCard(CARD_MAP.get(0));

    expect(hand.length).toBe(9);

    expect(hand.hearts.length).toBe(7);
    expect(hand.bells.length).toBe(2);
    expect(hand.leaves.length).toBe(0);
    expect(hand.acorns.length).toBe(0);

    expect(hand.aces.length).toBe(1);
    expect(hand.kings.length).toBe(2);
    expect(hand.overs.length).toBe(1);
    expect(hand.unters.length).toBe(1);
    expect(hand.tens.length).toBe(1);
    expect(hand.nines.length).toBe(1);
    expect(hand.eights.length).toBe(1);
    expect(hand.sevens.length).toBe(1);
});

test('hand printing ♦ O U X IX VIII VII ♠ A K O U', () => {
    const hand = new Hand();
    for (let i = 10; i < 20; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHand()).toBe('♦ O U X IX VIII VII ♠ A K O U');
});

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

test('hand set logging for player hand', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.logging).toBe(false);
    hand.setLogging(true);
    expect(hand.logging).toBe(true);
    hand.setLogging(false);
    expect(hand.logging).toBe(false);
});