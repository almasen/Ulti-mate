import chalk from 'chalk';
import { Card } from '../classes/Card';
import { Hand } from '../classes/Hand';

const TOTAL_VALUE: number = 6;
const MINI_GAME_RANK: number = 7;
const MINI_GAME_NAME: string = "durchmarsch";

const logChanceIfApplicable = (hand: Hand, chance: number) => {
    if (hand.logging) {
        console.log(`${MINI_GAME_NAME} chance: ${chalk.cyan(chance * 100)}%`);
    }
}

const meetsPrerequisites = (hand: Hand): boolean => {
    return hand.aces.length >= 2;
};

const checkHoles = (suit: Card[]): number => {
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
};

const calculateChance = (hand: Hand): number => {
    if (hand.length !== 10) {
        throw new Error(`Invalid hand length ${hand.length}`);
    }
    if (!meetsPrerequisites(hand)) {
        return 0;
    }
    let chance = 1;

    chance *= checkHoles(hand.hearts);
    chance *= checkHoles(hand.bells);
    chance *= checkHoles(hand.leaves);
    chance *= checkHoles(hand.acorns);

    logChanceIfApplicable(hand, chance);

    return chance >= MAX_RISK ? chance : 0;
};

const calculateExpectedValue = (hand: Hand): number => {
    return calculateChance(hand) * TOTAL_VALUE;
};

const getRank = (): number => {
    return MINI_GAME_RANK;
};

export { calculateChance, calculateExpectedValue, getRank };
