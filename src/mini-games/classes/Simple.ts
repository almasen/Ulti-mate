import { randomInt } from 'crypto';
import { MiniGame } from './MiniGame';
import { Hand } from '../../classes/Hand';
import { Suit } from '../../classes/Suit';
import { Card } from '../../classes/Card';
import { SUITS } from '../../globals';

class Simple extends MiniGame {
    constructor(rank: number, totalValue: number, name: string, gameOfHearts: boolean) {
        super(rank, totalValue, name, gameOfHearts, undefined);
    }

    meetsPrerequisites(hand: Hand): boolean {
        return (
            (!this.gameOfHearts || hand.getSuitHeurFromSuit(SUITS[0]) > 15) &&
            (hand.aces.length > 0 || hand.tens.length > 0 || hand.marriageSuits.length > 0)
        );
    }

    chooseTrumpSuit(hand: Hand): Suit {
        let largestSuits: Card[][] = [];
        let largestHeurValue: number = 0;
        // if any suit's length is >= 5 and choose one of those
        let halfHandSuits: Card[][] = [];
        hand.allSuits.forEach((suit: Card[]) => {
            if (suit.length >= 5) {
                halfHandSuits.push(suit);
            }
        });
        // if multiple suits' length is 5 compare their heuristic value
        if (halfHandSuits.length > 1) {
            let largestHeurSuits: Card[][] = [];
            halfHandSuits.forEach((suit: Card[]) => {
                let suitHeuristicValue = suit.reduce((a, b) => a + b.rank.heuristicValue, 0);
                if (hand.marriageSuits.includes(suit[0].suit)) {
                    suitHeuristicValue += 5;
                }
                if (suitHeuristicValue >= largestHeurValue) {
                    if (suitHeuristicValue > largestHeurValue) {
                        largestHeurSuits = [];
                        largestHeurValue = suitHeuristicValue;
                    }
                    largestHeurSuits.push(suit);
                }
            });
            halfHandSuits = [];
            largestHeurSuits.length > 1
                ? halfHandSuits.push(largestHeurSuits[randomInt(0, 2)])
                : halfHandSuits.push(largestHeurSuits[0]);
        }
        // otherwise calculate each suit's heur value accounting for marriages
        largestHeurValue = 0;
        for (const suit of hand.allSuits) {
            if (suit.length === 0) {
                continue;
            }
            let suitHeuristicValue = suit.reduce((a, b) => a + b.rank.heuristicValue, 0);
            if (hand.marriageSuits.includes(suit[0].suit)) {
                suitHeuristicValue += 5;
            }
            if (suitHeuristicValue >= largestHeurValue) {
                if (suitHeuristicValue > largestHeurValue) {
                    largestSuits = [];
                    largestHeurValue = suitHeuristicValue;
                }
                largestSuits.push(suit);
            }
        }
        // in case of tie compare suit lengths
        if (largestSuits.length > 1) {
            let longestSuits: Card[][] = [];
            let longestSuit: number = 0;
            largestSuits.forEach((suit: Card[]) => {
                if (suit.length >= longestSuit) {
                    if (suit.length > longestSuit) {
                        longestSuits = [];
                        longestSuit = suit.length;
                    }
                    longestSuits.push(suit);
                }
            });
            largestSuits = longestSuits;
        }
        // in case of tie compare highest cards of suit
        if (largestSuits.length > 1) {
            let strongestSuits: Card[][] = [];
            let strongestCard: number = 0;
            for (let i = 0; i < largestSuits[0].length; i++) {
                strongestCard = 0;
                strongestSuits = [];
                largestSuits.forEach((suit: Card[]) => {
                    if (suit[i].rank.heuristicValue >= strongestCard) {
                        if (suit[i].rank.heuristicValue > strongestCard) {
                            strongestSuits = [];
                            strongestCard = suit[i].rank.heuristicValue;
                        }
                        strongestSuits.push(suit);
                    }
                });
                largestSuits = strongestSuits;
                if (largestSuits.length === 1) {
                    break;
                }
            }
        }
        // in case of tie, suits are completely equal so choose randomly
        if (largestSuits.length > 1) {
            return largestSuits[randomInt(0, largestSuits.length)][0].suit;
        }
        // if we reach here we are only left with 1 suit
        return largestSuits[0][0].suit;
    }

    calculateTrickCount(hand: Hand): number {
        let tricks: number = 0;
        tricks += hand.aces.length;
        // add tens that can be secured
        hand.tens.forEach((ten: Card) => {
            // ten + Ace or e.x. ten + over + 9
            if (hand.getSuitHeurFromSuit(ten.suit) >= 15) {
                ++tricks;
            }
        });
        // on avg a suit deficiency equals +1 trick with a 10
        tricks += hand.getSuitDeficiencies();
        return tricks;
    }

    calculateMarriageScore(hand: Hand): number {
        return this.trump && hand.marriageSuits.includes(this.trump)
            ? hand.marriageSuits.length * 2 + 2
            : hand.marriageSuits.length * 2;
    }

    calculateLastTrickScore(hand: Hand): number {
        return this.trump && hand.getSuitListFromSuit(this.trump).length >= 5 ? 1 : 0;
    }

    calculateChanceDetails(hand: Hand): number {
        // set trump suit if applicable
        this.trump = this.gameOfHearts ? SUITS[0] : this.chooseTrumpSuit(hand);

        const trickCount = this.calculateTrickCount(hand);
        const opponentTrickCount = 8 - trickCount;

        const expectedScore = trickCount + this.calculateMarriageScore(hand) + this.calculateLastTrickScore(hand);

        return expectedScore > opponentTrickCount ? 1 : 0;
    }
}

export { Simple };
