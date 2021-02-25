import { Card } from './Card';

class Hand extends Array {
    hearts: Card[] = [];
    bells: Card[] = [];
    leaves: Card[] = [];
    acorns: Card[] = [];

    aces: Card[] = [];
    kings: Card[] = [];
    overs: Card[] = [];
    unters: Card[] = [];
    tens: Card[] = [];
    nines: Card[] = [];
    eights: Card[] = [];
    sevens: Card[] = [];

    addCard(card: Card) {
        switch (card.suit.letter) {
            case 'H':
                this.hearts.push(card);
                break;

            case 'B':
                this.bells.push(card);
                break;

            case 'L':
                this.leaves.push(card);
                break;

            case 'A':
                this.acorns.push(card);
                break;

            default:
                throw new Error('Invalid suit in hand');
                break;
        }

        switch (card.rank.letter) {
            case 'A':
                this.aces.push(card);
                break;

            case 'K':
                this.kings.push(card);
                break;

            case 'O':
                this.overs.push(card);
                break;

            case 'U':
                this.unters.push(card);
                break;

            case 'X':
                this.tens.push(card);
                break;

            case 'IX':
                this.nines.push(card);
                break;

            case 'VIII':
                this.eights.push(card);
                break;

            case 'VII':
                this.sevens.push(card);
                break;

            default:
                throw new Error('Invalid rank in hand');
                break;
        }

        this.push(card);
    }
}

export { Hand };
