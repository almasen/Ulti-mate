// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP } from '../globals';
import { Betli } from '../mini-games/classes/Betli';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const betli = new Betli();

test('betli remove worst ♥ A K O U X IX VIII VII ♦ K VII', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i==8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    expect(hand.length).toBe(10);
    expect(hand.bells.length).toBe(2);
    expect(hand.kings.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.bells.length).toBe(1);
    expect(hand.kings.length).toBe(1);
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ K ♠ VII', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i==8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(23));
    expect(hand.length).toBe(10);
    expect(hand.bells.length).toBe(1);
    expect(hand.kings.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.bells.length).toBe(0);
    expect(hand.kings.length).toBe(1);
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ VII ♠ X', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(20));

    expect(hand.length).toBe(10);
    expect(hand.leaves.length).toBe(1);
    expect(hand.tens.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.leaves.length).toBe(0);
    expect(hand.tens.length).toBe(1);
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ VII ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(16));
    expect(hand.length).toBe(10);
    expect(hand.bells.length).toBe(1);
    expect(hand.sevens.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.bells.length).toBe(0);
    expect(hand.sevens.length).toBe(1);
});

test('betli remove worst ♥ A ♦ A K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    for (let i = 8; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23));

    expect(hand.length).toBe(10);
    expect(hand.leaves.length).toBe(1);
    expect(hand.sevens.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.leaves.length).toBe(0);
    expect(hand.sevens.length).toBe(1);
});

test('betli remove worst ♥ A ♦ K O U X IX VIII VII ♠ VII ♣ A', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23))
    hand.addCard(CARD_MAP.get(24));

    expect(hand.length).toBe(10);
    expect(hand.leaves.length).toBe(1);
    expect(hand.sevens.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.leaves.length).toBe(0);
    expect(hand.sevens.length).toBe(1);
});

test('betli remove worst ♥ A K ♦ K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(23))

    expect(hand.length).toBe(10);
    expect(hand.hearts.length).toBe(2);
    expect(hand.kings.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.hearts.length).toBe(1);
    expect(hand.kings.length).toBe(1);
});

test('betli remove worst ♥ A K O U X IX VIII VII ♠ X VIII', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }

    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(22));

    expect(hand.length).toBe(10);
    expect(hand.leaves.length).toBe(2);
    expect(hand.tens.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.leaves.length).toBe(1);
    expect(hand.tens.length).toBe(1);
});

test('betli remove worst ♥ A K VIII ♦ K O U X IX VIII VII', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(6))

    expect(hand.length).toBe(10);
    expect(hand.hearts.length).toBe(3);
    expect(hand.kings.length).toBe(2);

    betli.removeWorstCard(hand);

    expect(hand.length).toBe(9);
    expect(hand.hearts.length).toBe(2);
    expect(hand.kings.length).toBe(1);
});