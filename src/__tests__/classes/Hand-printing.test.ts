// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

test('hand printing ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHand()).toBe('♥ A K O U X IX VIII VII ♦ A K');
});

test('hand printing ♦ O U X IX VIII VII ♠ A K O U', () => {
    const hand = new Hand();
    for (let i = 10; i < 20; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHand()).toBe('♦ O U X IX VIII VII ♠ A K O U');
});

test('hand printing ♠ X IX VIII VII ♣ A K O U X IX', () => {
    const hand = new Hand();
    for (let i = 20; i < 30; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHand()).toBe('♠ X IX VIII VII ♣ A K O U X IX');
});

test('hand printing ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHandInTrumpOrder()).toBe('♥ A X K O U IX VIII VII ♦ A K');
});

test('hand printing ♦ O U X IX VIII VII ♠ A K O U', () => {
    const hand = new Hand();
    for (let i = 10; i < 20; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHandInTrumpOrder()).toBe('♦ X O U IX VIII VII ♠ A K O U');
});

test('hand printing ♠ X IX VIII VII ♣ A K O U X IX', () => {
    const hand = new Hand();
    for (let i = 20; i < 30; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.printWholeHandInTrumpOrder()).toBe('♠ X IX VIII VII ♣ A X K O U IX');
});
