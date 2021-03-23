// @ts-nocheck
import { Card } from '../classes/Card';
import { SUITS, RANKS } from '../globals';

test('card to string conversion works as expected', () => {
    const card: Card = new Card(0, SUITS[0], RANKS[0]);
    expect(card.toString()).toBe('H-A');
});

test('card to string conversion works as expected', () => {
    const card: Card = new Card(0, SUITS[0], RANKS[0]);
    expect(card.getFullName()).toBe('Ace of Hearts');
});
