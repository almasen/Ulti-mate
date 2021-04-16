// @ts-nocheck
import { Card } from '../../classes/Card';
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Betli } from '../../mini-games/classes/Betli';

declare global {
    var MAX_RISK: number;
    var LOG_REASONING: boolean;
}
globalThis.MAX_RISK = 0.5;
globalThis.LOG_REASONING = true;

jest.spyOn(console, 'log').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

const betli = new Betli(6, 5, 'Betli');

test('betli log reasoning ♥ A K ♦ K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(23));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(8);
});

test('betli log reasoning ♥ A K O U X IX VIII VII ♠ X VIII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }

    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(22));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(7);
});

test('betli log reasoning ♥ A K VIII ♦ K O U X IX VIII VII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(6));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(7);
});

test('betli log reasoning ♥ A K O U X IX VIII VII ♦ VII ♠ X', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(20));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(8);
});

test('betli log reasoning ♥ A K O U X IX VIII VII ♦ VII ♠ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(16));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(8);
});

test('betli log reasoning ♥ A ♦ A K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 8; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(8);
});

test('betli log reasoning ♥ A K O U X IX VIII VII ♦ K VII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 10; i++) {
        if (i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(7);
});

test('betli log reasoning ♥ A K O U X IX VIII VII ♦ K ♠ VII', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 10; i++) {
        if (i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(23));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(8);
});

test('betli log reasoning ♥ A ♦ K O U X IX VIII VII ♠ VII ♣ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23));
    hand.addCard(CARD_MAP.get(24));

    betli.calculateChance(hand);
    expect(console.log.mock.calls.length).toBe(9);
});
