import { Player } from "./player";
import * as sqr from "./square";

type Position = { col: number; row: number };

export class Board {
  private winCombinations: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [3, 4, 6],
  ];
  private history: ReadonlyArray<ReadonlyArray<sqr.Square>>;

  constructor() {
    this.history = [Array(9).fill(sqr.squareFactory(undefined))];
  }

  get currentSquares(): ReadonlyArray<sqr.Square> {
    return this.history[this.history.length - 1];
  }

  render(): void {
    console.log(" ", " ", "A", " ", "B", " ", "C");
    console.log();
    for (let r = 0; r < 3; r++) {
      let args = [r + 1, " "];
      for (let c = 0; c < 3; c++) {
        const index = r * 3 + c;
        args.push(sqr.render(this.currentSquares[index]));
        if (c !== 2) args.push("|");
      }
      console.log(...args);
      if (r !== 2) console.log(" ", " ", "-", "✛", "-", "✛", "-");
    }
    console.log();
  }

  validatePosition(position: string): Position {
    const pos = position.trim();
    const [colInput, rowInput] = pos.split("");
    let col = ["A", "B", "C"].indexOf(colInput.toUpperCase()),
      row = [1, 2, 3].indexOf(parseInt(rowInput, 10));

    if (pos.length === 2 && col !== -1 && row !== -1) return { col, row };

    throw new Error(
      "Invalid position, possible value A1,A2,A3,B1,B2,B3,C1,C2,C3"
    );
  }

  makeMove(player: Player, position: string): void {
    if (this.getWinner()) throw new Error("Game is over");

    const { col, row } = this.validatePosition(position);
    const pos = row * 3 + col;
    const square = this.currentSquares[pos];
    if (sqr.hasValue(square)) throw new Error("Position already occupied");

    this.history = this.history.concat([
      [
        ...this.currentSquares.slice(0, pos),
        sqr.squareFactory(player),
        ...this.currentSquares.slice(pos + 1),
      ],
    ]);
  }

  getWinner(): Player | undefined {
    for (const [idx1, idx2, idx3] of this.winCombinations) {
      const square1 = this.currentSquares[idx1];
      if (
        sqr.hasValue(square1) &&
        sqr.equals(
          square1,
          this.currentSquares[idx2],
          this.currentSquares[idx3]
        )
      )
        return sqr.getValue(square1);
    }
  }
}
