import { MiniGame } from './MiniGame';
import { Hand } from '../../classes/Hand';
import { Card } from '../../classes/Card';

class Betli extends MiniGame {
    private startingCard: Card | null = null;

    constructor(rank: number, totalValue: number, name: string) {
        super(rank, totalValue, name, false);
    }

    meetsPrerequisites(hand: Hand): boolean {
        return hand.aces.length < 3;
    }

    countHoles(suit: Card[]): number {
        if (suit.length === 0) {
            return 0;
        }
        let holes = 0;
        let expected = 7;

        for (let i = suit.length - 1; i >= 0; i--) {
            const card = suit[i];
            if (this.startingCard?.id === card.id) {
                continue;
            }
            const cardPosition = card.id % 8;
            if (cardPosition !== expected) {
                holes += expected - cardPosition;
                expected = cardPosition - 1;
            } else {
                --expected;
            }
        }
        return holes;
    }

    findStartingCard(hand: Hand): Card {
        let worstCard: Card = hand[0];
        let biggestHole: number = 0;
        for (const suit of hand.allSuits) {
            let holes: number;
            let largestCard: Card;
            let secondLargestCard: Card;
            if (suit.length > 0 && suit.length < 7) {
                largestCard = suit[0];
                if (suit.length === 1) {
                    if (largestCard.rank.letter === 'A') {
                        continue; // we can't remove an Ace
                    }
                    holes = 7 - (largestCard.id % 8);
                    // try to make a suit deficiency
                    if (holes >= 3) {
                        worstCard = largestCard;
                        break;
                    }
                } else {
                    if (largestCard.rank.letter === 'A') {
                        largestCard = suit[1];
                        if (suit.length === 2) {
                            holes = 7 - (largestCard.id % 8);
                        } else {
                            secondLargestCard = suit[2];
                            holes = secondLargestCard.id - largestCard.id - 1;
                        }
                    } else {
                        secondLargestCard = suit[1];
                        holes = secondLargestCard.id - largestCard.id - 1;
                    }
                }
                if (holes >= biggestHole) {
                    biggestHole = holes;
                    worstCard = largestCard;
                }
            }
        }
        return worstCard;
    }

    calculateChanceDetails(hand: Hand): number {
        // store original counts
        const heartsCount = hand.hearts.length;
        const bellsCount = hand.bells.length;
        const leavesCount = hand.leaves.length;
        const acornsCount = hand.acorns.length;

        // remove starting card from analytics
        this.startingCard = this.findStartingCard(hand);

        const heartsHoles = this.countHoles(hand.hearts);
        const bellsHoles = this.countHoles(hand.bells);
        const leavesHoles = this.countHoles(hand.leaves);
        const acornsHoles = this.countHoles(hand.acorns);

        if (
            heartsHoles * 2 + heartsCount > 8 ||
            bellsHoles * 2 + bellsCount > 8 ||
            leavesHoles * 2 + leavesCount > 8 ||
            acornsHoles * 2 + acornsCount > 8
        ) {
            return 0;
        }

        const totalHoles = heartsHoles + bellsHoles + leavesHoles + acornsHoles;
        const suitDeficiencies = hand.getSuitDeficiencies();
        return Math.min(1, 1 - 0.1 * totalHoles + 0.1 * suitDeficiencies);
    }
}

export { Betli };
