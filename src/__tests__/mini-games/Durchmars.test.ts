// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Durchmars } from '../../mini-games/classes/Durchmars';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const durchmars = new Durchmars(7, 6, 'Durchmars', false);

test('invalid hand length should throw an appropriate error', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(() => {
        hand.addCard(CARD_MAP.get(10));
    }).toThrow(new Error('Invalid operation: Hand is already full.'));
});

test('durchmars ♥ A K O U X IX VIII VII ♦ A K', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ K O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmars ♥ A O U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 1) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ K O U X IX VIII VII ♦ A K ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmars ♥ A K O U X IX VIII VII ♦ A ♠ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(16));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K O U X IX VIII VII ♦ A O', () => {
    const hand = new Hand();
    for (let i = 0; i < 11; i++) {
        if (i == 9) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmars ♥ A O U X IX VIII ♦ A K O U', () => {
    const hand = new Hand();
    for (let i = 0; i < 7; i++) {
        if (i == 1) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((1 / 2) * 6);
});

test('durchmars ♥ A O X IX VIII VII ♦ A K O U', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 1 || i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((1 / 2) * 6);
});

test('durchmars ♥ A K IX VIII VII ♦ A K O U X', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 2 || i == 3 || i == 4) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((3 / 4) * 6);
});

test('durchmars ♥ A K IX VIII VII ♦ A K U X IX', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 2 || i == 3 || i == 4) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((((3 / 4) * 3) / 4) * 6);
});

test('durchmars ♥ A K X IX VIII VII ♦ A K U X', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 2 || i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K U X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 2) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K U X ♦ A K O U X IX', () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
        if (i == 2) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(0);
});

test('durchmars ♥ A K O X IX VIII VII ♦ A K O', () => {
    const hand = new Hand();
    for (let i = 0; i < 8; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K O X IX VIII ♦ A K O U', () => {
    const hand = new Hand();
    for (let i = 0; i < 7; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K O X IX ♦ A K O U X', () => {
    const hand = new Hand();
    for (let i = 0; i < 6; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K O X ♦ A K O U X IX', () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((7 / 8) * 6);
});

test('durchmars ♥ A K O X ♦ A K U X IX ♣ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 5; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(24));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe((((7 / 8) * 3) / 4) * 6);
});

test('durchmars ♥ A K O ♦ A K O U X IX ♣ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 4; i++) {
        if (i == 3) {
            continue;
        }
        hand.addCard(CARD_MAP.get(i));
    }
    hand.addCard(CARD_MAP.get(8));
    hand.addCard(CARD_MAP.get(9));
    hand.addCard(CARD_MAP.get(10));
    hand.addCard(CARD_MAP.get(11));
    hand.addCard(CARD_MAP.get(12));
    hand.addCard(CARD_MAP.get(13));
    hand.addCard(CARD_MAP.get(24));
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♠ A K O U X IX VIII VII ♣ A K', () => {
    const hand = new Hand();
    for (let i = 16; i < 26; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
});

test('durchmars ♥ A K O ♦ A K O ♠ A K O ♣ A', () => {
    const hand = new Hand();
    for (let i = 0; i < 25; i++) {
        if (i % 8 === 0 || i % 8 === 1 || i % 8 === 2) {
            hand.addCard(CARD_MAP.get(i));
        }
    }
    const expectedValue = durchmars.calculateExpectedValue(hand);
    expect(expectedValue).toBe(6);
    // console.log(hand.printWholeHand());
});
