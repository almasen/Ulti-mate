class CardRank {
    readonly name: string;
    readonly letter: string;
    readonly heuristicValue: number;

    constructor(name: string, letter: string, heuristicValue: number) {
        this.name = name;
        this.letter = letter;
        this.heuristicValue = heuristicValue;
    }
}

export { CardRank };
