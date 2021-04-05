// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Betli } from '../../mini-games/classes/Betli';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const betli = new Betli(6, 5, 'Betli');

test('invalid hand length should throw an appropriate error', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(() => {
        hand.addCard(CARD_MAP.get(10));
    }).toThrow(new Error('Invalid operation: Hand is already full.'));
});

test('betli ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = betli.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('betli ♦ VII ♠ A K O U X IX VIII VII ♣ A', () => {
    const hand = new Hand();
    for (let i = 15; i < 25; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = betli.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('betli ♥ A K O U X IX VIII VII ♦ VII ♠ VIII', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(22));
    const expectedValue = betli.calculateExpectedValue(hand);
    expect(expectedValue).toBe(5);
});

