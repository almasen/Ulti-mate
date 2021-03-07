import { Card } from '../classes/Card';
import { Hand } from '../classes/Hand';
import { CARD_MAP, DECK } from '../globals';
import { sortHand } from '../util/hand';

declare global {
    var MAX_RISK: number;
}
const args = process.argv.slice(2);
globalThis.MAX_RISK = args[0] ? parseInt(args[0], 10) / 100 : 0.5;

let hand: Hand;
let possibleOpponentCards: Card[];

if (args[1]) {
    const customHand = args[1].trim().split(',');
    hand = new Hand();
    possibleOpponentCards = [];
    const cards = new Map(CARD_MAP);
    customHand.forEach((e) => {
        const id = parseInt(e, 10);
        const card = cards.get(id);
        if (card) {
            hand.addCard(card);
        }
        cards.delete(id);
    });
    cards.forEach((value, key) => {
        possibleOpponentCards.push(value);
    });
} else {
    hand = sortHand(DECK.slice(0, 10));
    possibleOpponentCards = DECK.slice(10);
}

const getHand = (): Hand => {
    return hand;
};

const getPossibleOpponentCards = (): Card[] => {
    return possibleOpponentCards;
};

export { getHand, getPossibleOpponentCards };
