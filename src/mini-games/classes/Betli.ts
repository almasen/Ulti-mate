import { MiniGame } from './MiniGame';
import { Hand } from '../../classes/Hand';
import { Card } from '../../classes/Card';

class Betli extends MiniGame {
    constructor() {
        super(6, 5, 'betli');
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

    removeWorstCard(hand: Hand): Hand {
        // test with hand with two aces
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
        hand.removeCard(worstCard);
        return hand;
    }

    calculateChance(hand: Hand): number {
        this.validateHand(hand);
        if (!this.meetsPrerequisites(hand)) {
            return 0;
        }

        const best9Cards = this.removeWorstCard(hand);

        const heartsHoles = this.countHoles(best9Cards.hearts);
        const bellsHoles = this.countHoles(best9Cards.bells);
        const leavesHoles = this.countHoles(best9Cards.leaves);
        const acornsHoles = this.countHoles(best9Cards.acorns);

        // TODO: it ignores the dropped card!
        if (
            heartsHoles * 2 + hand.hearts.length > 8 ||
            bellsHoles * 2 + hand.bells.length > 8 ||
            leavesHoles * 2 + hand.leaves.length > 8 ||
            acornsHoles * 2 + hand.acorns.length > 8
        ) {
            return 0;
        }

        const totalHoles = heartsHoles + bellsHoles + leavesHoles + acornsHoles;
        const suitDeficiencies = best9Cards.getSuitDeficiencies();
        const chance = Math.min(1, 1 - 0.1 * totalHoles + 0.1 * suitDeficiencies);

        this.logChanceIfApplicable(best9Cards, chance);

        return chance >= MAX_RISK ? chance : 0;
    }
}

export { Betli };
