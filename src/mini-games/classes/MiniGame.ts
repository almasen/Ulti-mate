/* tslint:disable:no-console */
import chalk from 'chalk';
import { throws } from 'node:assert';
import { Hand } from '../../classes/Hand';

abstract class MiniGame {
    readonly rank: number;
    readonly totalValue: number;
    readonly name: string;

    constructor(rank: number, totalValue: number, name: string) {
        this.rank = rank;
        this.totalValue = totalValue;
        this.name = name;
    }

    logChanceIfApplicable(hand: Hand, chance: number) {
        if (hand.logging) {
            console.log(`${this.name} chance: ${chalk.cyan(chance * 100)}%`);
        }
    }

    validateHand(hand: Hand) {
        if (hand.length !== 10) {
            throw new Error(`Invalid hand length ${hand.length}`);
        }
    }

    abstract meetsPrerequisites(hand: Hand): boolean;

    abstract calculateChance(hand: Hand): number;

    calculateExpectedValue(hand: Hand): number {
        return this.calculateChance(hand) * this.totalValue;
    }
}

export { MiniGame };
