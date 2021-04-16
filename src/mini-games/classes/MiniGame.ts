/* tslint:disable:no-console */
import chalk from 'chalk';
import { Hand } from '../../classes/Hand';
import { Suit } from '../../classes/Suit';
import { SUITS } from '../../globals';

abstract class MiniGame {
    readonly rank: number;
    readonly totalValue: number;
    readonly name: string;
    readonly gameOfHearts: boolean;
    readonly minChance?: number;

    protected trump: Suit | null = null;
    protected logReasons: boolean = false;

    constructor(rank: number, totalValue: number, name: string, gameOfHearts: boolean, minChance: number | undefined) {
        this.rank = rank;
        this.totalValue = totalValue;
        this.name = name;
        this.gameOfHearts = gameOfHearts;
        this.minChance = minChance;
        if (this.gameOfHearts) {
            this.trump = SUITS[0];
        }
    }

    logChanceIfApplicable(hand: Hand, chance: number) {
        if (hand.logging && (!this.minChance || this.minChance <= 0.5)) {
            let colour;
            switch (true) {
                case chance === 1:
                    colour = chalk.green;
                    break;

                case chance >= 0.75:
                    colour = chalk.greenBright;
                    break;

                case chance >= 0.5:
                    colour = chalk.yellowBright;
                    break;

                case chance > 0:
                    colour = chalk.yellow;
                    break;

                default:
                    colour = chalk.red;
                    break;
            }
            this.trump
                ? console.log(`${chalk.cyan(this.name)} chance: ${colour(chance * 100)}% (${this.trump.symbol})`)
                : console.log(`${chalk.cyan(this.name)} chance: ${colour(chance * 100)}%`);
        }
    }

    setLogReasons(hand: Hand) {
        this.logReasons = hand.logging && LOG_REASONING && !this.name.includes('Re') && !this.name.includes('Open');
    }

    logReasoningIfApplicable() {
        if (this.logReasons) {
            console.log(`\nCalculating ${chalk.cyan(this.name)} chance...`);
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
        this.setLogReasons(hand);
        this.logReasoningIfApplicable();
        if (!this.meetsPrerequisites(hand)) {
            this.logChanceIfApplicable(hand, 0);
            return 0;
        }

        const chance = this.calculateChanceDetails(hand);

        this.logChanceIfApplicable(hand, chance);

        return chance >= Math.max(MAX_RISK, this.minChance ? this.minChance : 0) ? chance : 0;
    }

    calculateExpectedValue(hand: Hand): number {
        return this.calculateChance(hand) * this.totalValue;
    }

    public getTrumpSuit(): Suit | null {
        return this.trump;
    }
}

export { MiniGame };
