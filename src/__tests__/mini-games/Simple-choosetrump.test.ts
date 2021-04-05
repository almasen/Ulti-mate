// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Simple } from '../../mini-games/classes/Simple';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const simple = new Simple(1, 1, 'Simple', false);

test('simple check trump suit ♥ A K U ♦ A K U ♠ A K X ♣ VII', () => {
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(16));
    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(21));
    hand.addCard(CARD_MAP.get(31));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('L');
});

test('simple check trump suit ♥ A X K O U ♦ A K O U IX', () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    for (let i = 8; i < 14; i++) {
        if (i == 12) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('H');
});

test('simple check trump suit ♥ A K O U X ♦ A K O U X', () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    for (let i = 8; i < 13; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter === 'H' || trump.letter === 'B').toBe(true);
});

test('simple check trump suit ♥ A O U X IX ♦ A O U X IX', () => {
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(2));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(4));
    hand.addCard(CARD_MAP.get(5));
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter === 'H' || trump.letter === 'B').toBe(true);
});

test('simple check trump suit ♥ A O U X IX VIII ♦ A O U X', () => {
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(2));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(4));
    hand.addCard(CARD_MAP.get(5));
    hand.addCard(CARD_MAP.get(6));
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('H');
});

test('simple check trump suit ♥ A X O U ♦ A X O IX VII ♠ VII', () => {
    // different suit length but same heur scores
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(2));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(4));
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(23));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('B');
});

test('simple check trump suit ♦ A X O IX VII ♠ A X O U ♣ VII', () => {
    // different suit length but same heur scores diff order
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(16));
    hand.addCard(CARD_MAP.get(18));
    hand.addCard(CARD_MAP.get(19));
    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(31));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('B');
});

test('simple check trump suit ♥ A K U ♦ A X IX ♠ A K U ♣ VII', () => {
    // same heur, length, different cards
    const hand = new Hand();
    hand.addCard(CARD_MAP.get(0));
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(16));
    hand.addCard(CARD_MAP.get(17));
    hand.addCard(CARD_MAP.get(19));
    hand.addCard(CARD_MAP.get(31));
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter).toBe('B');
});
