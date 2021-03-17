// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP } from '../globals';
import { Betli } from '../mini-games/classes/Betli';
import { Card } from '../classes/Card';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const betli = new Betli();

test('betli remove worst ♥ A K O U X IX VIII VII ♦ K VII', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('K');
    expect(startingCard.suit.letter).toBe('B');
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ K ♠ VII', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(23));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('K');
    expect(startingCard.suit.letter).toBe('B');
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ VII ♠ X', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(20));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('X');
    expect(startingCard.suit.letter).toBe('L');
});

test('betli remove worst ♥ A K O U X IX VIII VII ♦ VII ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(16));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('VII');
    expect(startingCard.suit.letter).toBe('B');
});

test('betli remove worst ♥ A ♦ A K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    for (let i = 8; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('VII');
    expect(startingCard.suit.letter).toBe('L');
});

test('betli remove worst ♥ A ♦ K O U X IX VIII VII ♠ VII ♣ A', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(23));
    hand.addCard(CARD_MAP.get(24));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('VII');
    expect(startingCard.suit.letter).toBe('L');
});

test('betli remove worst ♥ A K ♦ K O U X IX VIII VII ♠ VII', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(23));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('K');
    expect(startingCard.suit.letter).toBe('H');
});

test('betli remove worst ♥ A K O U X IX VIII VII ♠ X VIII', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        hand.addCard(CARD_MAP.get(i));
    }

    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(22));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('X');
    expect(startingCard.suit.letter).toBe('L');
});

test('betli remove worst ♥ A K VIII ♦ K O U X IX VIII VII', () => {
    const hand = new Hand();
    for (let i = 9; i < 16; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(6));

    const startingCard: Card = betli.findStartingCard(hand);
    expect(startingCard.rank.letter).toBe('K');
    expect(startingCard.suit.letter).toBe('H');
});
