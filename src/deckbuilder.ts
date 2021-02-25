import { Card } from './classes/Card';

const buildCardDeck = (
    SUITS: any[],
    RANKS: any[],
    DECK: Card[],
    CARDMAP: { set: (arg0: number, arg1: Card) => void },
) => {
    let id = 0;
    SUITS.forEach((suit) => {
        RANKS.forEach((rank) => {
            const card = new Card(id, suit, rank);
            DECK.push(card);
            CARDMAP.set(id, card);
            ++id;
        });
    });
};

export { buildCardDeck };
