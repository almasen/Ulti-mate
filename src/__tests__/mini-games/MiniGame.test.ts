// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Simple } from '../../mini-games/classes/Simple';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

jest.spyOn(console, 'log').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

const simple = new Simple(1, 1, 'Simple', false);
const simpleOfHearts = new Simple(1, 1, 'Simple of Hearts', true);

test('test hand logging', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    simple.logChanceIfApplicable(hand, 1);
    expect(console.log.mock.calls.length).toBe(0);

    hand.setLogging(true);

    simple.logChanceIfApplicable(hand, 1);
    expect(console.log.mock.calls.length).toBe(1);
    simple.logChanceIfApplicable(hand, 0.8);
    expect(console.log.mock.calls.length).toBe(2);
    simple.logChanceIfApplicable(hand, 0.6);
    expect(console.log.mock.calls.length).toBe(3);
    simple.logChanceIfApplicable(hand, 0.3);
    expect(console.log.mock.calls.length).toBe(4);
    simple.logChanceIfApplicable(hand, 0);
    expect(console.log.mock.calls.length).toBe(5);
});

test('test hand logging with trump suit', () => {
    const hand = new Hand();
    for (let i = 0; i < 10; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    simpleOfHearts.logChanceIfApplicable(hand, 1);
    expect(console.log.mock.calls.length).toBe(0);

    hand.setLogging(true);

    simpleOfHearts.logChanceIfApplicable(hand, 1);
    expect(console.log.mock.calls.length).toBe(1);
    simpleOfHearts.logChanceIfApplicable(hand, 0.8);
    expect(console.log.mock.calls.length).toBe(2);
    simpleOfHearts.logChanceIfApplicable(hand, 0.6);
    expect(console.log.mock.calls.length).toBe(3);
    simpleOfHearts.logChanceIfApplicable(hand, 0.3);
    expect(console.log.mock.calls.length).toBe(4);
    simpleOfHearts.logChanceIfApplicable(hand, 0);
    expect(console.log.mock.calls.length).toBe(5);
});

test('test hand validation', () => {
    const hand = new Hand();
    for (let i = 0; i < 9; i++) {
        hand.addCard(CARD_MAP.get(i));
    }
    expect(() => {
        simpleOfHearts.validateHand(hand);
    }).toThrow(new Error('Invalid hand length 9'));
});

test('get trump suit returns Hearts if Game of Hearts', () => {
    expect(simpleOfHearts.getTrumpSuit().letter).toBe('H');
});

test('get trump suit returns null by default', () => {
    expect(simple.getTrumpSuit()).toBe(null);
});
