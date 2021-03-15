import { Suit } from './Suit';
import { CardRank } from './CardRank';

class Card {
    readonly id: number;
    readonly suit: Suit;
    readonly rank: CardRank;

    constructor(id: number, suit: Suit, rank: CardRank) {
        this.id = id;
        this.suit = suit;
        this.rank = rank;
    }

    toString(): string {
        return `${this.suit.letter}-${this.rank.letter}`;
    }

    getFullName(): string {
        return `${this.rank.name} of ${this.suit.name}`;
    }
}

export { Card };
