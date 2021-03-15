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

        for (let i = suit.length - 1; i >= 0; i++) {
            const element = suit[i];
            holes += i;
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

        let holes = 0;

        holes += this.countHoles(hand.hearts);
        holes += this.countHoles(hand.bells);
        holes += this.countHoles(hand.leaves);
        holes += this.countHoles(hand.acorns);

        const chance = 0;

        this.logChanceIfApplicable(hand, chance);

        return chance >= MAX_RISK ? chance : 0;
    }
}

export { Betli };
