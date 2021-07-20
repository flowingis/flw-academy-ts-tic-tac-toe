import { Player } from "./player";

type BaseSquare = {
  render: () => Player | " ";
  getValue: () => Player | undefined;
  hasValue: () => boolean;
  equals: (...squares: Square[]) => boolean;
};

type CrossSquare = Readonly<{
  kind: "cross";
}> &
  BaseSquare;

type CircleSquare = Readonly<{
  kind: "circle";
}> &
  BaseSquare;

type EmptySquare = Readonly<{
  kind: "empty";
}> &
  BaseSquare;

export type Square = CrossSquare | CircleSquare | EmptySquare;

const createBaseSquare = (): BaseSquare => ({
  render,
  getValue,
  hasValue,
  equals,
});

const createCrossSquare = (): CrossSquare => ({
  ...createBaseSquare(),
  kind: "cross",
});
const createCircleSquare = (): CircleSquare => ({
  ...createBaseSquare(),
  kind: "circle",
});
const createEmptySquare = (): EmptySquare => ({
  ...createBaseSquare(),
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

function render(this: Square): Player | " " {
  switch (this.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    default:
      return " ";
  }
}

function getValue(this: Square): Player | undefined {
  switch (this.kind) {
    case "cross":
      return "X";
    case "circle":
      return "O";
    default:
      return undefined;
  }
}

function hasValue(this: Square): boolean {
  switch (this.kind) {
    case "cross":
    case "circle":
      return true;
    default:
      return false;
  }
}

function equals(this: Square, ...squares: Square[]): boolean {
  return squares.every(v => v.getValue() === this.getValue());
}
