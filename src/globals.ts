import { Suit } from './classes/Suit';
import { CardRank } from './classes/CardRank';

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

export { SUITS, RANKS };
