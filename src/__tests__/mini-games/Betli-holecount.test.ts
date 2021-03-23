// @ts-nocheck
import { Card } from '../../classes/Card';
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Betli } from '../../mini-games/classes/Betli';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const betli = new Betli(6, 5, 'Betli');

test('betli holes on empty suit', () => {
    const suit: Card[] = [];
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(0);
});

test('betli holes ♣ VII VIII IX X U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(0);
});

test('betli holes ♣ VIII IX X U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 31) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII IX X U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 30) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII X U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 29) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII IX U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 28) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII IX X O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 27) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII IX X U K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 26) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII IX X U O A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 25) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(1);
});

test('betli holes ♣ VII VIII IX X U O K', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 24) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(0);
});

test('betli holes ♣ IX X U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 30 || i == 31) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(2);
});

test('betli holes ♣ U O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 28 || i == 29 || i == 30 || i == 31) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(4);
});

test('betli holes ♣ VIII IX X O K A', () => {
    const suit: Card[] = [];
    for (let i = 24; i < 32; i++) {
        if (i == 27 || i == 31) {
            continue;
        }
        suit.push(CARD_MAP.get(i));
    }
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(2);
});

test('betli holes ♣ VIII U', () => {
    const suit: Card[] = [];
    suit.push(CARD_MAP.get(27));
    suit.push(CARD_MAP.get(30));
    const expectedValue = betli.countHoles(suit);
    expect(expectedValue).toBe(3);
});
