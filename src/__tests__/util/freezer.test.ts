// @ts-nocheck
import { freezeMap } from '../../util/freezer';

test('map freezer blocks changes to map as expected', () => {
    const map = new Map<number, number>();
    map.set(1, 1);
    freezeMap(map);

    expect(() => {
        map.set(2, 2);
    }).toThrow(new Error("Can't add property 2, map is not extensible"));

    expect(() => {
        map.delete(1);
    }).toThrow(new Error("Can't delete property 1, map is frozen"));

    expect(() => {
        map.clear();
    }).toThrow(new Error("Can't clear map, map is frozen"));
});

test('map freezer treats non-map objects as expected', () => {
    const nonMap = {
        1: 'one',
        a: 'A',
    };
    freezeMap(nonMap);

    expect(() => {
        nonMap.a = 'B';
    }).toThrow(new Error("Cannot assign to read only property 'a' of object '#<Object>'"));

    expect(() => {
        nonMap.clear();
    }).toThrow(new Error('nonMap.clear is not a function'));
});
