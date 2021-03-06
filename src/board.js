import { squareFactory } from "./square.js";

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function render() {
  console.log(" ", " ", "A", " ", "B", " ", "C");
  console.log();
  for (let r = 0; r < 3; r++) {
    let args = [r + 1, " "];
    for (let c = 0; c < 3; c++) {
      const index = r * 3 + c;
      const col = this.squares[index].render();
      args.push(col);
      if (c !== 2) args.push("|");
    }
    console.log(...args);
    if (r !== 2) console.log(" ", " ", "-", "✛", "-", "✛", "-");
  }
  console.log();
}

function validatePosition(position) {
  const pos = position.trim();
  const [colInput, rowInput] = pos.split("");
  let col = ["A", "B", "C"].indexOf(colInput.toUpperCase()),
    row = [1, 2, 3].indexOf(parseInt(rowInput, 10));

  if (pos.length === 2 && col !== -1 && row !== -1) return { col, row };

  throw new Error(
    "Invalid position, possible value A1,A2,A3,B1,B2,B3,C1,C2,C3"
  );
}

function makeMove(player, position) {
  if (this.getWinner()) throw new Error("Game is over");

  const { col, row } = validatePosition(position);
  const pos = row * 3 + col;
  const square = this.squares[pos];
  if (square.hasValue()) throw new Error("Position already occupied");
  this.squares[pos] = squareFactory(player);
}

function getWinner() {
  for (const [idx1, idx2, idx3] of winCombinations) {
    const square1 = this.squares[idx1],
      square2 = this.squares[idx2],
      square3 = this.squares[idx3];
    if (
      square1.hasValue() &&
      square1.isEquals(square2) &&
      square2.isEquals(square3)
    )
      return square1.value;
  }
}

export const board = () => {
  return {
    squares: Array(9).fill(squareFactory()),
    getWinner,
    makeMove,
    render,
  };
};
