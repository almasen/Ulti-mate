// @ts-nocheck
import { Hand } from '../../classes/Hand';
import { DECK, CARD_MAP } from '../../globals';
import { Simple } from '../../mini-games/classes/Simple';

declare global {
    var MAX_RISK: number;
}
globalThis.MAX_RISK = 0.5;

const simple = new Simple(1, 1, 'Simple', false);
const simpleOfHearts = new Simple(2, 2, 'Simple of Hearts', true);

test('simple prerequisites ♥ A K U ♦ A K U ♠ A K X ♣ VII', () => {
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
    const meetsPrerequisites = simple.meetsPrerequisites(hand);
    expect(meetsPrerequisites).toBe(true);
});

test('simple prerequisites ♥ X K O U IX VIII ♠ X K IX ♣ VII', () => {
    const hand = new Hand();
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
    const meetsPrerequisites = simpleOfHearts.meetsPrerequisites(hand);
    expect(meetsPrerequisites).toBe(true);
});

test('simple prerequisites ♥ K O U ♦ K O U ♠ K O U ♣ VII', () => {
    const hand = new Hand();
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
    const meetsPrerequisites = simple.meetsPrerequisites(hand);
    expect(meetsPrerequisites).toBe(true);
});

test('simple prerequisites ♥ IX VIII VII ♦ IX VIII VII ♠ IX VIII VII ♣ IX', () => {
    const hand = new Hand();
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
    const meetsPrerequisites = simple.meetsPrerequisites(hand);
    expect(meetsPrerequisites).toBe(false);
});
