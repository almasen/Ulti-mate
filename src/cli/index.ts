/* tslint:disable:no-console */
import { Card } from '../classes/Card';
import { Hand } from '../classes/Hand';
import { CARD_MAP, DECK } from '../globals';
import { sortHand } from '../util/hand';
import { Command, InvalidOptionArgumentError, Option } from 'commander';

const program = new Command();

program
    .addOption(new Option('-R, --max-risk <percentage>', 'Specify maximum risk in percentages').default(50, '50%'))
    .option('-H, --custom-hand <ids...>', 'Specify a custom hand via card IDs');

program.parse(process.argv);
const options = program.opts();

console.log(options);

/* set global MAX_RISK variable */

declare global {
    var MAX_RISK: number;
}
{
    const parsedValue = parseInt(options.maxRisk, 10);
    if (isNaN(parsedValue) || parsedValue > 100 || parsedValue < 0) {
        throw new InvalidOptionArgumentError('Maximum risk must be an integer between 0 and 100.');
    }
    globalThis.MAX_RISK = parsedValue / 100;
}

/* set up user and opponent hands according to params */

let hand: Hand;
let possibleOpponentCards: Card[];

if (options.customHand) {
    if (!Array.isArray(options.customHand) || options.customHand.length !== 10) {
        throw new InvalidOptionArgumentError('Custom hand must be a list of 10 integers between 0 and 31 (inclusive).');
    }
    const customHand: number[] = [];
    options.customHand.forEach((e) => {
        const parsedValue = parseInt(e, 10);
        if (isNaN(parsedValue) || parsedValue > 31 || parsedValue < 0) {
            throw new InvalidOptionArgumentError(
                'Custom hand must be a list of 10 integers between 0 and 31 (inclusive).',
            );
        }
        customHand.push(parsedValue);
    });
    hand = new Hand();
    possibleOpponentCards = [];
    const cards = new Map(CARD_MAP);
    customHand.forEach((id: number) => {
        const card = cards.get(id);
        if (card) {
            hand.addCard(card);
        }
        cards.delete(id);
    });
    cards.forEach((value, key) => {
        possibleOpponentCards.push(value);
    });
} else {
    hand = sortHand(DECK.slice(0, 10));
    possibleOpponentCards = DECK.slice(10);
}

const getHand = (): Hand => {
    return hand;
};

const getPossibleOpponentCards = (): Card[] => {
    return possibleOpponentCards;
};

export { getHand, getPossibleOpponentCards };
