import { Player } from "./player";

type CrossSquare = Readonly<{
  kind: "cross";
}>;

type CircleSquare = Readonly<{
  kind: "circle";
}>;

type EmptySquare = Readonly<{
  kind: "empty";
}>;

export type Square = CrossSquare | CircleSquare | EmptySquare;

const createCrossSquare = (): CrossSquare => ({
  kind: "cross",
});
const createCircleSquare = (): CircleSquare => ({
  kind: "circle",
});
const createEmptySquare = (): EmptySquare => ({
  kind: "empty",
});

export function squareFactory(type: Player | undefined): Square {
  switch (type) {
    case "X":
      return createCrossSquare();
    case "O":
      return createCircleSquare();
    default:
      return createEmptySquare();
  }
}

export function render(square: Square): Player | " " {
  switch (square.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    default:
      return " ";
  }
}

export function getValue(square: Square): Player | undefined {
  switch (square.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    default:
      return undefined;
  }
}

export function hasValue(square: Square): boolean {
  switch (square.kind) {
    case "cross":
    case "circle":
      return true;
    default:
      return false;
  }
}

export function equals(...squares: Square[]): boolean {
  return squares.every(v => getValue(v) === getValue(squares[0]));
}
