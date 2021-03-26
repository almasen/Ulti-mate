/**
 * Freeze an ES6 map.
 * Courtesy of Tieme @ StackOverflow.
 * @param array
 */
const freezeMap = (map: Map<any, any>) => {
    if (map instanceof Map) {
        map.set = (key) => {
            throw new Error("Can't add property " + key + ', map is not extensible');
        };

        map.delete = (key) => {
            throw new Error("Can't delete property " + key + ', map is frozen');
        };

        map.clear = () => {
            throw new Error("Can't clear map, map is frozen");
        };
    }

    Object.freeze(map);
};

export { freezeMap };
