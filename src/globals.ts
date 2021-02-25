import { Suit } from './classes/Suit';
import { CardRank } from './classes/CardRank';
import { Card } from './classes/Card';
import { buildCardDeck } from './deckbuilder';
import { freezeMap } from './freezer';

const SUITS: Suit[] = [
    {
        name: 'Hearts',
        letter: 'H',
        symbol: '♥',
    },
    {
        name: 'Bells',
        letter: 'B',
        symbol: '♦',
    },
    {
        name: 'Leaves',
        letter: 'L',
        symbol: '♠',
    },
    {
        name: 'Acorns',
        letter: 'A',
        symbol: '♣',
    },
];

const RANKS: CardRank[] = [
    { rank: 'A' },
    { rank: 'K' },
    { rank: 'O' },
    { rank: 'U' },
    { rank: 'X' },
    { rank: 'IX' },
    { rank: 'VIII' },
    { rank: 'VII' },
];

const DECK: Card[] = [];

const CARDMAP: Map<number, Card> = new Map();

buildCardDeck(SUITS, RANKS, DECK, CARDMAP);

Object.freeze(SUITS);
Object.freeze(RANKS);
Object.freeze(DECK);
freezeMap(CARDMAP);

export { SUITS, RANKS, DECK, CARDMAP };
