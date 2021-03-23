// @ts-nocheck
import { Hand } from '../classes/Hand';
import { DECK, CARD_MAP, SUITS } from '../globals';
import { cloneDeep } from 'lodash';

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

test('inserting invalid suit throws an appropriate error', () => {
    const hand = new Hand();
    const card = cloneDeep(CARD_MAP.get(0));
    card.suit.letter = 'invalid';
    expect(() => {
        hand.addCard(card);
    }).toThrow(new Error('Invalid suit in hand'));
});

test('inserting invalid rank throws an appropriate error', () => {
    const hand = new Hand();
    const card = cloneDeep(CARD_MAP.get(0));
    card.rank.letter = 'invalid';
    expect(() => {
        hand.addCard(card);
    }).toThrow(new Error('Invalid rank in hand'));
});

test('hand marriages ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 2) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(17));
    expect(hand.length).toBe(10);
    expect(hand.marriageSuits.length).toBe(0);
});

test('hand marriages ♥ A K U X IX VIII VII ♦ A K ♠ K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.length).toBe(10);
    expect(hand.marriageSuits.length).toBe(1);
    expect(hand.marriageSuits[0].letter).toBe('H');
});

test('hand marriages ♥ A K O U X IX VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 6) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.length).toBe(10);
    expect(hand.marriageSuits.length).toBe(2);
    expect(hand.marriageSuits[0].letter).toBe('H');
    expect(hand.marriageSuits[1].letter).toBe('B');
});

test('hand marriages ♥ A K O U X IX ♦ K O ♠ K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 6 || i == 7 || i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(17));
    hand.addCard(CARD_MAP.get(18));
    expect(hand.length).toBe(10);
    expect(hand.marriageSuits.length).toBe(3);
    expect(hand.marriageSuits[0].letter).toBe('H');
    expect(hand.marriageSuits[1].letter).toBe('B');
    expect(hand.marriageSuits[2].letter).toBe('L');
});

test('hand marriages ♥ A K O U ♦ K O ♠ K O ♣ K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 4 || i == 5 || i == 6 || i == 7 || i == 8) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(17));
    hand.addCard(CARD_MAP.get(18));
    hand.addCard(CARD_MAP.get(25));
    hand.addCard(CARD_MAP.get(26));
    expect(hand.length).toBe(10);
    expect(hand.marriageSuits.length).toBe(4);
    expect(hand.marriageSuits[0].letter).toBe('H');
    expect(hand.marriageSuits[1].letter).toBe('B');
    expect(hand.marriageSuits[2].letter).toBe('L');
    expect(hand.marriageSuits[3].letter).toBe('A');
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

test('hand suit heuristics ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.getHeartsHeuristic()).toBe(36);
    expect(hand.getBellsHeuristic()).toBe(14);
    expect(hand.getLeavesHeuristic()).toBe(0);
    expect(hand.getAcornsHeuristic()).toBe(0);
    expect(hand.getSuitHeurFromSuit(SUITS[0])).toBe(36);
    expect(hand.getSuitHeurFromSuit(SUITS[1])).toBe(14);
    expect(hand.getSuitHeurFromSuit(SUITS[2])).toBe(0);
    expect(hand.getSuitHeurFromSuit(SUITS[3])).toBe(0);
});

test('hand get suit lists ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(hand.getSuitListFromSuit(SUITS[0]).length).toBe(8);
    expect(hand.getSuitListFromSuit(SUITS[1]).length).toBe(2);
    expect(hand.getSuitListFromSuit(SUITS[2]).length).toBe(0);
    expect(hand.getSuitListFromSuit(SUITS[3]).length).toBe(0);
});
