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
    // console.log(hand.printWholeHand());
    const trump = simple.chooseTrumpSuit(hand);
    expect(trump.letter === 'H' || trump.letter === 'B').toBe(true);
});
