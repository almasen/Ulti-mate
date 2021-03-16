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

    findWorstCard(hand: Hand): number {
        return 3;
    }

    calculateChance(hand: Hand): number {
        this.validateHand(hand);
        if (!this.meetsPrerequisites(hand)) {
            return 0;
        }

        const heartsHoles = this.countHoles(hand.hearts);
        const bellsHoles = this.countHoles(hand.bells);
        const leavesHoles = this.countHoles(hand.leaves);
        const acornsHoles = this.countHoles(hand.acorns);

        if (
            heartsHoles * 2 + hand.hearts.length > 8 ||
            bellsHoles * 2 + hand.bells.length > 8 ||
            leavesHoles * 2 + hand.leaves.length > 8 ||
            acornsHoles * 2 + hand.acorns.length > 8
        ) {
            return 0;
        }

        const totalHoles = heartsHoles + bellsHoles + leavesHoles + acornsHoles;

        const chance = 0;

        this.logChanceIfApplicable(hand, chance);

        return chance >= MAX_RISK ? chance : 0;
    }
}

export { Betli };
