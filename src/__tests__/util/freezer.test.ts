// @ts-nocheck
import { freezeMap } from '../../util/freezer';

test('map freezer blocks changes to map as expected', () => {
    const map = new Map<number, number>();
    map.set(1, 1);
    freezeMap(map);

    expect(() => {
        map.set(2,2);
    }).toThrow(new Error("Can't add property 2, map is not extensible"));

    expect(() => {
        map.delete(1);
    }).toThrow(new Error("Can't delete property 1, map is frozen"));

    expect(() => {
        map.clear();
    }).toThrow(new Error("Can't clear map, map is frozen"));
});
