import { Card } from './Card';
import { Suit } from './Suit';

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

    readonly allSuits: Card[][] = [this.hearts, this.bells, this.leaves, this.acorns];
    readonly allRanks: Card[][] = [
        this.aces,
        this.kings,
        this.overs,
        this.unters,
        this.tens,
        this.nines,
        this.eights,
        this.sevens,
    ];

    // suit heuristic values
    private heartsHeuristic: number = 0;
    private bellsHeuristic: number = 0;
    private leavesHeuristic: number = 0;
    private acornsHeuristic: number = 0;

    readonly marriageSuits: Suit[] = [];

    private suitDeficiencies: number = -1;

    logging: boolean = false; // TODO: private, getter

    addCard(card: Card) {
        switch (card.suit.letter) {
            case 'H':
                this.hearts.push(card);
                this.heartsHeuristic += card.rank.heuristicValue;
                break;

            case 'B':
                this.bells.push(card);
                this.bellsHeuristic += card.rank.heuristicValue;
                break;

            case 'L':
                this.leaves.push(card);
                this.leavesHeuristic += card.rank.heuristicValue;
                break;

            case 'A':
                this.acorns.push(card);
                this.acornsHeuristic += card.rank.heuristicValue;
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
                if (this.length > 0) {
                    const previousCard: Card = this[this.length - 1];
                    if (previousCard.rank.letter === 'K' && previousCard.suit.letter === card.suit.letter) {
                        this.marriageSuits.push(card.suit);
                    }
                }
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

    removeCard(card: Card) {
        switch (card.suit.letter) {
            case 'H':
                this.removeFromCardArray(this.hearts, card);
                break;

            case 'B':
                this.removeFromCardArray(this.bells, card);
                break;

            case 'L':
                this.removeFromCardArray(this.leaves, card);
                break;

            case 'A':
                this.removeFromCardArray(this.acorns, card);
                break;

            default:
                throw new Error('Invalid suit in hand');
                break;
        }

        switch (card.rank.letter) {
            case 'A':
                this.removeFromCardArray(this.aces, card);
                break;

            case 'K':
                this.removeFromCardArray(this.kings, card);
                break;

            case 'O':
                this.removeFromCardArray(this.overs, card);
                break;

            case 'U':
                this.removeFromCardArray(this.unters, card);
                break;

            case 'X':
                this.removeFromCardArray(this.tens, card);
                break;

            case 'IX':
                this.removeFromCardArray(this.nines, card);
                break;

            case 'VIII':
                this.removeFromCardArray(this.eights, card);
                break;

            case 'VII':
                this.removeFromCardArray(this.sevens, card);
                break;

            default:
                throw new Error('Invalid rank in hand');
                break;
        }

        this.removeFromCardArray(this, card);
    }

    private removeFromCardArray(arr: Card[], card: Card) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === card.id) {
                arr.splice(i, 1);
            }
        }
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
        return printString.trim();
    }

    getSuitDeficiencies(): number {
        if (this.suitDeficiencies === -1) {
            this.suitDeficiencies =
                (this.hearts.length ? 0 : 1) +
                (this.bells.length ? 0 : 1) +
                (this.leaves.length ? 0 : 1) +
                (this.acorns.length ? 0 : 1);
        }
        return this.suitDeficiencies;
    }

    setLogging(logging: boolean): void {
        this.logging = logging;
    }

    getHeartsHeuristic() : number {
        return this.heartsHeuristic;
    }

    getBellsHeuristic() : number {
        return this.bellsHeuristic;
    }

    getLeavesHeuristic() : number {
        return this.leavesHeuristic;
    }

    getAcornsHeuristic() : number {
        return this.acornsHeuristic;
    }
}

export { Hand };
