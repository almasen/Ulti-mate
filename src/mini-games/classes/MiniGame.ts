/* tslint:disable:no-console */
import chalk from 'chalk';
import { Hand } from '../../classes/Hand';
import { Suit } from '../../classes/Suit';

abstract class MiniGame {
    readonly rank: number;
    readonly totalValue: number;
    readonly name: string;
    readonly gameOfHearts: boolean;

    constructor(rank: number, totalValue: number, name: string, gameOfHearts: boolean) {
        this.rank = rank;
        this.totalValue = totalValue;
        this.name = name;
        this.gameOfHearts = gameOfHearts;
    }

    logChanceIfApplicable(hand: Hand, chance: number, trump?: Suit) {
        if (hand.logging) {
            let colour;
            switch (true) {
                case chance === 1:
                    colour = chalk.green;
                    break;

                case chance >= 0.75:
                    colour = chalk.greenBright;
                    break;

                case chance >= MAX_RISK:
                    colour = chalk.yellowBright;
                    break;

                case chance > 0:
                    colour = chalk.yellow;
                    break;

                default:
                    colour = chalk.red;
                    break;
            }
            trump
                ? console.log(`${this.name} chance: ${colour(chance * 100)}% (${trump.symbol})`)
                : console.log(`${this.name} chance: ${colour(chance * 100)}%`);
        }
    }

    validateHand(hand: Hand) {
        if (hand.length !== 10) {
            throw new Error(`Invalid hand length ${hand.length}`);
        }
    }

    abstract meetsPrerequisites(hand: Hand): boolean;

    abstract calculateChanceDetails(hand: Hand): number;

    calculateChance(hand: Hand): number {
        this.validateHand(hand);
        if (!this.meetsPrerequisites(hand)) {
            this.logChanceIfApplicable(hand, 0);
            return 0;
        }

        const chance = this.calculateChanceDetails(hand);

        this.logChanceIfApplicable(hand, chance);

        return chance >= MAX_RISK ? chance : 0;
    }

    calculateExpectedValue(hand: Hand): number {
        return this.calculateChance(hand) * this.totalValue;
    }
}

export { MiniGame };
