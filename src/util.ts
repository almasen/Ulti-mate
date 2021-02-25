/**
 * Get all possible subsets of an array.
 * Courtesy of MennyMez @ StackOverflow.
 * @param array
 */
const getAllSubsets = (array: any[]) => {
    return array.reduce((subsets, value) => subsets.concat(subsets.map((set: any) => [value, ...set])), [[]]);
};

export { getAllSubsets };
