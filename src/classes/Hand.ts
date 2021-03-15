import { Card } from './Card';

class Hand extends Array {
    readonly hearts: Card[] = [];
    readonly bells: Card[] = [];
    readonly leaves: Card[] = [];
    readonly acorns: Card[] = [];

    readonly aces: Card[] = [];
    readonly kings: Card[] = [];
    readonly overs: Card[] = [];
    readonly unters: Card[] = [];
    readonly tens: Card[] = [];
    readonly nines: Card[] = [];
    readonly eights: Card[] = [];
    readonly sevens: Card[] = [];

    logging: boolean = false;

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

    printWholeHand(): string {
        let printString = '';
        if (this.hearts.length > 0) {
            printString += this.hearts[0].suit.symbol + ' ';
            this.hearts.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.bells.length > 0) {
            printString += this.bells[0].suit.symbol + ' ';
            this.bells.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.leaves.length > 0) {
            printString += this.leaves[0].suit.symbol + ' ';
            this.leaves.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.acorns.length > 0) {
            printString += this.acorns[0].suit.symbol + ' ';
            this.acorns.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        return printString;
    }

    setLogging(logging: boolean): void {
        this.logging = logging;
    }
}

export { Hand };
