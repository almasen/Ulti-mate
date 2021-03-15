import chalk from 'chalk';
import { Card } from '../classes/Card';
import { Hand } from "../classes/Hand";

abstract class MiniGame {
    rank: number;
    totalValue: number;
    name: string;

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

    abstract meetsPrerequisites(hand: Hand): boolean;

    abstract calculateChance(hand: Hand): boolean;

    abstract calculateExpectedValue(hand: Hand): boolean;
}