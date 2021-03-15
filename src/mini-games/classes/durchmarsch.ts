import { MiniGame } from './mini-game';
import { Hand } from '../../classes/hand';
import { Card } from '../../classes/card';

class Durchmarsch extends MiniGame {
    constructor() {
        super(7, 6, 'durchmarsch'); // TODO: move params to globals
    }

    meetsPrerequisites(hand: Hand): boolean {
        return hand.aces.length >= 2;
    }

    checkHoles(suit: Card[]): number {
        if (suit.length === 0) {
            return 1;
        }

        if (suit[0].rank.letter !== 'A') {
            return 0;
        } else if (suit.length === 1) {
            return 1;
        }

        if (suit[1].rank.letter !== 'K') {
            switch (suit.length) {
                case 7:
                    return 1;

                case 6:
                    return 1 / 2;

                default:
                    return 0; // other chances are too low
            }
        } else if (suit.length === 2) {
            return 1;
        }

        if (suit[2].rank.letter !== 'O') {
            switch (suit.length) {
                case 7:
                case 6:
                    return 1;

                case 5:
                    return 3 / 4;

                default:
                    return 0;
            }
        } else if (suit.length === 3) {
            return 1;
        }

        if (suit[3].rank.letter !== 'U') {
            switch (suit.length) {
                case 7:
                case 6:
                case 5:
                    return 1;

                case 4:
                    return 7 / 8;

                default:
                    throw new Error('Internal error');
            }
        } else {
            return 1;
        }
    }

    calculateChance(hand: Hand): number {
        this.validateHand(hand);
        if (!this.meetsPrerequisites(hand)) {
            return 0;
        }
        let chance = 1;

        chance *= this.checkHoles(hand.hearts);
        chance *= this.checkHoles(hand.bells);
        chance *= this.checkHoles(hand.leaves);
        chance *= this.checkHoles(hand.acorns);

        this.logChanceIfApplicable(hand, chance);

        return chance >= MAX_RISK ? chance : 0;
    }
}

export { Durchmarsch };
