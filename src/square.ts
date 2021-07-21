import { Player } from "./player";

type SquareKind = "cross" | "circle" | "empty";

type BaseSquare<Kind extends SquareKind> = {
  kind: Kind;
  render: () => Player | " ";
  equals: (...squares: Square[]) => boolean;
};

type CrossSquare = BaseSquare<"cross"> & { value: "X" };

type CircleSquare = BaseSquare<"circle"> & { value: "O" };

type EmptySquare = BaseSquare<"empty">;

export type Square = CrossSquare | CircleSquare | EmptySquare;

type GetMarkedSquare<T> = T extends { kind: "cross" | "circle" } ? T : never;
type GetUnMarkedSquare<T> = T extends { kind: "empty" } ? T : never;

export type MarkedSquare = GetMarkedSquare<Square>;
export type UnMarkedSquare = GetUnMarkedSquare<Square>;

const createBaseSquare = <Kind extends SquareKind>(
  kind: Kind
): BaseSquare<Kind> => ({
  kind,
  render,
  equals,
});

const createCrossSquare = (): CrossSquare => ({
  ...createBaseSquare("cross"),
  value: "X",
});
const createCircleSquare = (): CircleSquare => ({
  ...createBaseSquare("circle"),
  value: "O",
});
const createEmptySquare = (): EmptySquare => createBaseSquare("empty");

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

function render(this: Square): Player | " " {
  switch (this.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    case "empty":
      return " ";
    default:
      const neverExecuted: never = this;
      return neverExecuted;
  }
}

function equals(this: Square, ...squares: Square[]): boolean {
  return squares.every(v => v.kind === this.kind);
}

export function isMarked(square: Square): square is MarkedSquare {
  switch (square.kind) {
    case "cross":
    case "circle":
      return true;
    case "empty":
      return false;
    default:
      const neverExecuted: never = square;
      return neverExecuted;
  }
}

export function isUnMarked(square: Square): square is UnMarkedSquare {
  switch (square.kind) {
    case "cross":
    case "circle":
      return false;
    case "empty":
      return true;
    default:
      const neverExecuted: never = square;
      return neverExecuted;
  }
}
