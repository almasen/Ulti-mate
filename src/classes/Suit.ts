class Suit {
    readonly name: string;
    readonly letter: string;
    readonly symbol: string;

    constructor(name: string, letter: string, symbol: string) {
        this.name = name;
        this.letter = letter;
        this.symbol = symbol;
    }
}

export { Suit };
