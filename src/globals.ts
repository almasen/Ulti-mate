import { Suit } from './classes/Suit';
import { CardRank } from './classes/CardRank';
import { Card } from './classes/Card';
import { buildCardDeck } from './util/deck-builder';
import { freezeMap } from './util/freezer';
import { shuffle } from './util/card-deck';
import { cloneDeep } from 'lodash';

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
    { name: 'Ace', letter: 'A' },
    { name: 'King', letter: 'K' },
    { name: 'Over', letter: 'O' },
    { name: 'Unter', letter: 'U' },
    { name: 'Ten', letter: 'X' },
    { name: 'Nine', letter: 'IX' },
    { name: 'Eight', letter: 'VIII' },
    { name: 'Seven', letter: 'VII' },
];

const DECK: Card[] = [];
const CARD_MAP: Map<number, Card> = new Map();
buildCardDeck(SUITS, RANKS, DECK, CARD_MAP);
const DEFAULT_DECK: Card[] = cloneDeep(DECK);

shuffle(DECK);

Object.freeze(SUITS);
Object.freeze(RANKS);
Object.freeze(DECK);
Object.freeze(DEFAULT_DECK);
freezeMap(CARD_MAP);

export { SUITS, RANKS, DECK, DEFAULT_DECK, CARD_MAP };
