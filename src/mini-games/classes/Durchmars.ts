/* tslint:disable:no-console */
import chalk from 'chalk';
import { MiniGame } from './MiniGame';
import { Hand } from '../../classes/Hand';
import { Card } from '../../classes/Card';

class Durchmars extends MiniGame {
    constructor(rank: number, totalValue: number, name: string, gameOfHearts: boolean, minChance?: number) {
        super(rank, totalValue, name, gameOfHearts, minChance);
    }

    meetsPrerequisites(hand: Hand): boolean {
        return hand.aces.length >= 2;
    }

    checkHoles(suit: Card[]): number {
        if (suit.length === 0) {
            return 1;
        }

        if (suit[0].rank.letter !== 'A') {
            this.logHoleIfApplicable(suit, 'Ace', 0);
            return 0;
        } else if (suit.length === 1) {
            this.logNoHolesIfApplicable(suit);
            return 1;
        }

        if (suit[1].rank.letter !== 'K') {
            switch (suit.length) {
                case 7:
                    this.logHoleIfApplicable(suit, 'King', 1, `but suit length is ${chalk.cyan(suit.length)}`);
                    return 1;

                case 6:
                    this.logHoleIfApplicable(suit, 'King', 1 / 2);
                    return 1 / 2;

                default:
                    this.logHoleIfApplicable(suit, 'King', 0);
                    return 0; // other chances are too low
            }
        } else if (suit.length === 2) {
            this.logNoHolesIfApplicable(suit);
            return 1;
        }

        if (suit[2].rank.letter !== 'O') {
            switch (suit.length) {
                case 7:
                case 6:
                    this.logHoleIfApplicable(suit, 'Over', 1, `but suit length is ${chalk.cyan(suit.length)}`);
                    return 1;

                case 5:
                    this.logHoleIfApplicable(suit, 'Over', 3 / 4);
                    return 3 / 4;

                default:
                    this.logHoleIfApplicable(suit, 'Over', 0);
                    return 0;
            }
        } else if (suit.length === 3) {
            this.logNoHolesIfApplicable(suit);
            return 1;
        }

        if (suit[3].rank.letter !== 'U') {
            switch (suit.length) {
                case 7:
                case 6:
                case 5:
                    this.logHoleIfApplicable(suit, 'Unter', 1, `but suit length is ${chalk.cyan(suit.length)}`);
                    return 1;

                case 4:
                    this.logHoleIfApplicable(suit, 'Unter', 7 / 8);
                    return 7 / 8;

                default:
                    throw new Error('Internal error');
            }
        } else {
            this.logNoHolesIfApplicable(suit);
            return 1;
        }
    }

    calculateChanceDetails(hand: Hand): number {
        let chance = 1;

        chance *= this.checkHoles(hand.hearts);
        chance *= this.checkHoles(hand.bells);
        chance *= this.checkHoles(hand.leaves);
        chance *= this.checkHoles(hand.acorns);

        return chance;
    }

    // == log detailed reasoning if applicable == //

    logNoHolesIfApplicable(suit: Card[]) {
        if (this.logReasons) {
            console.log(`${chalk.green('No')} holes found in ${chalk.cyan(suit[0].suit.name)}`);
        }
    }

    logHoleIfApplicable(suit: Card[], hole: string, chance: number, reason?: string) {
        if (this.logReasons) {
            console.log(
                `${chalk.yellow(hole)} hole found in ${chalk.cyan(suit[0].suit.name)} ${
                    reason ? `${reason} ` : ''
                }=> multiplying chance by ${chance === 1 ? chalk.green(chance) : chalk.yellow(chance)}`,
            );
        }
    }
}

export { Durchmars };
