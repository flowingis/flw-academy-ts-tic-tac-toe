import { Player } from "./player";

type SquareKind = "cross" | "circle" | "empty";

type BaseSquare<Kind extends SquareKind> = {
  kind: Kind;
  render: () => Player | " ";
  getValue: () => Player | undefined;
  hasValue: () => boolean;
  equals: (...squares: Square[]) => boolean;
};

type CrossSquare = BaseSquare<"cross">;

type CircleSquare = BaseSquare<"circle">;

type EmptySquare = BaseSquare<"empty">;

export type Square = CrossSquare | CircleSquare | EmptySquare;

const createBaseSquare = <Kind extends SquareKind>(
  kind: Kind
): BaseSquare<Kind> => ({
  kind,
  render,
  getValue,
  hasValue,
  equals,
});

const createCrossSquare = (): CrossSquare => createBaseSquare("cross");
const createCircleSquare = (): CircleSquare => createBaseSquare("circle");
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

function getValue(this: Square): Player | undefined {
  switch (this.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    case "empty":
      return undefined;
    default:
      const neverExecuted: never = this;
      return neverExecuted;
  }
}

function hasValue(this: Square): boolean {
  switch (this.kind) {
    case "cross":
    case "circle":
      return true;
    case "empty":
      return false;
    default:
      const neverExecuted: never = this;
      return neverExecuted;
  }
}

function equals(this: Square, ...squares: Square[]): boolean {
  return squares.every(v => v.getValue() === this.getValue());
}
