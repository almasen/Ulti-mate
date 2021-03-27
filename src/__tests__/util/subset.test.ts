// @ts-nocheck
import { getAllSubsets } from '../../util/subset';

test('array subsets algorithm correctly constructs power set', () => {
    const array: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const subsets: number[][] = getAllSubsets(array);
    expect(subsets.length).toBe(2 ** array.length);
});
