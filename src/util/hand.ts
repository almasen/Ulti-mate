import { Card } from '../classes/card';
import { Hand } from '../classes/hand';

const sortHand = (hand: Card[]): Hand => {
    const sortedHand = new Hand();
    hand.sort((a, b) => {
        return a.id - b.id;
    });
    hand.forEach((card: Card) => {
        sortedHand.addCard(card);
    });
    return sortedHand;
};

export { sortHand };
