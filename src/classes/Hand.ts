import { Card } from './Card';
import { Suit } from './Suit';

class Hand extends Array {
    readonly trumpOrder: Card[] = [];

    // nest these in to a suits Card[][]
    readonly hearts: Card[] = [];
    readonly bells: Card[] = [];
    readonly leaves: Card[] = [];
    readonly acorns: Card[] = [];

    readonly heartsTrumpOrder: Card[] = [];
    readonly bellsTrumpOrder: Card[] = [];
    readonly leavesTrumpOrder: Card[] = [];
    readonly acornsTrumpOrder: Card[] = [];

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
        if (this.length === 10) {
            throw new Error('Invalid operation: Hand is already full.');
        }

        switch (card.suit.letter) {
            case 'H':
                this.hearts.push(card);
                this.heartsTrumpOrder.push(card);
                this.heartsHeuristic += card.rank.heuristicValue;
                break;

            case 'B':
                this.bells.push(card);
                this.bellsTrumpOrder.push(card);
                this.bellsHeuristic += card.rank.heuristicValue;
                break;

            case 'L':
                this.leaves.push(card);
                this.leavesTrumpOrder.push(card);
                this.leavesHeuristic += card.rank.heuristicValue;
                break;

            case 'A':
                this.acorns.push(card);
                this.acornsTrumpOrder.push(card);
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
        this.trumpOrder.push(card);

        if (this.length === 10) {
            this.sortCardArrayToTrumpOrder(this.trumpOrder);
            this.sortCardArrayToTrumpOrder(this.heartsTrumpOrder);
            this.sortCardArrayToTrumpOrder(this.bellsTrumpOrder);
            this.sortCardArrayToTrumpOrder(this.leavesTrumpOrder);
            this.sortCardArrayToTrumpOrder(this.acornsTrumpOrder);
            // prevent accidental modifications
            this.finaliseProperties();
        }
    }

    private finaliseProperties() {
        this.allSuits.forEach((e) => {
            Object.freeze(e);
        });
        this.allRanks.forEach((e) => {
            Object.freeze(e);
        });
        Object.freeze(this.trumpOrder);
        Object.freeze(this.heartsTrumpOrder);
        Object.freeze(this.bellsTrumpOrder);
        Object.freeze(this.leavesTrumpOrder);
        Object.freeze(this.acornsTrumpOrder);
        Object.freeze(this.marriageSuits);
    }

    private sortCardArrayToTrumpOrder(arr: Card[]) {
        arr.sort((a: Card, b: Card) => {
            return a.rank.heuristicValue - b.rank.heuristicValue;
        });
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

    printWholeHandInTrumpOrder(): string {
        let printString = '';
        if (this.heartsTrumpOrder.length > 0) {
            printString += this.heartsTrumpOrder[0].suit.symbol + ' ';
            this.heartsTrumpOrder.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.bellsTrumpOrder.length > 0) {
            printString += this.bellsTrumpOrder[0].suit.symbol + ' ';
            this.bellsTrumpOrder.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.leavesTrumpOrder.length > 0) {
            printString += this.leavesTrumpOrder[0].suit.symbol + ' ';
            this.leavesTrumpOrder.forEach((e) => {
                printString += e.rank.letter + ' ';
            });
        }
        if (this.acornsTrumpOrder.length > 0) {
            printString += this.acornsTrumpOrder[0].suit.symbol + ' ';
            this.acornsTrumpOrder.forEach((e) => {
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

    getHeartsHeuristic(): number {
        return this.heartsHeuristic;
    }

    getBellsHeuristic(): number {
        return this.bellsHeuristic;
    }

    getLeavesHeuristic(): number {
        return this.leavesHeuristic;
    }

    getAcornsHeuristic(): number {
        return this.acornsHeuristic;
    }

    getSuitListFromSuit(suit: Suit): Card[] {
        switch (suit.letter) {
            case 'H':
                return this.hearts;

            case 'B':
                return this.bells;

            case 'L':
                return this.leaves;

            case 'A':
                return this.acorns;

            default:
                throw new Error(`Unsupported suit ${suit.letter}`);
        }
    }

    getSuitHeurFromSuit(suit: Suit): number {
        switch (suit.letter) {
            case 'H':
                return this.heartsHeuristic;

            case 'B':
                return this.bellsHeuristic;

            case 'L':
                return this.leavesHeuristic;

            case 'A':
                return this.acornsHeuristic;

            default:
                throw new Error(`Unsupported suit ${suit.letter}`);
        }
    }
}

export { Hand };
