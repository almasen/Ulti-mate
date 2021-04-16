// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Simple } from '../../mini-games/classes/Simple';

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

const simple = new Simple(1, 1, 'Simple', false);
const simpleOfHearts = new Simple(2, 2, 'Simple of Hearts', true);

test('simple of hearts chance ♥ A K O U X IX VIII VII ♦ A ♠ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const chance = simpleOfHearts.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ X K O U IX VIII ♠ X K IX ♣ VII', () => {
    const hand = new Hand();
    hand.logging = true;
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(2));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(4));
    hand.addCard(CARD_MAP.get(5));
    hand.addCard(CARD_MAP.get(6));
    hand.addCard(CARD_MAP.get(17));
    hand.addCard(CARD_MAP.get(20));
    hand.addCard(CARD_MAP.get(21));
    hand.addCard(CARD_MAP.get(31));
    const chance = simpleOfHearts.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ A O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 11; i++) {
        if (i == 1) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const chance = simple.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ K O U X IX VIII VII ♦ A K ♠ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const chance = simple.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ A K O U X IX VIII VII ♦ A ♠ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const chance = simple.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple of hearts chance ♥ K O U X IX VIII VII ♦ A K ♠ A', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const chance = simpleOfHearts.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ K O U ♦ K O U ♠ K O U ♣ VII', () => {
    const hand = new Hand();
    hand.logging = true;
    hand.addCard(CARD_MAP.get(1));
    hand.addCard(CARD_MAP.get(2));
    hand.addCard(CARD_MAP.get(3));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(17));
    hand.addCard(CARD_MAP.get(18));
    hand.addCard(CARD_MAP.get(19));
    hand.addCard(CARD_MAP.get(31));
    const chance = simpleOfHearts.calculateChance(hand);
    expect(chance).toBe(0);
});

test('simple chance ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const chance = simple.calculateChance(hand);
    expect(chance).toBe(1);
});

test('simple chance ♥ K O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    hand.logging = true;
    for (let i = 0; i < 11; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const chance = simple.calculateChance(hand);
    expect(chance).toBe(1);
});


test('simple chance ♥ IX VIII VII ♦ IX VIII VII ♠ IX VIII VII ♣ IX', () => {
    const hand = new Hand();
    hand.logging = true;
    hand.addCard(CARD_MAP.get(5));
    hand.addCard(CARD_MAP.get(6));
    hand.addCard(CARD_MAP.get(7));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(14));
    hand.addCard(CARD_MAP.get(15));
    hand.addCard(CARD_MAP.get(21));
    hand.addCard(CARD_MAP.get(22));
    hand.addCard(CARD_MAP.get(23));
    hand.addCard(CARD_MAP.get(29));
    const chance = simpleOfHearts.calculateChance(hand);
    expect(chance).toBe(0);
});
