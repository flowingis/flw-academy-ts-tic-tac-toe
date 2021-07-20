import { Player } from "./player";

export interface Square {
  readonly value: Player | undefined;
}

export interface Square {
  render(): Player | " ";
  hasValue(): boolean;
  isEquals(other: unknown): boolean;
}

abstract class BaseSquare implements Square {
  constructor(public readonly value: Player | undefined) {}

  render() {
    return this.value || " ";
  }

  abstract hasValue(): boolean;

  isEquals(square: unknown): boolean {
    return square instanceof BaseSquare && this.value === square.value;
  }

  // any stop typescript type check
  // unknown is better then any so you must check the type of your object
  // isEquals(square: any): boolean {
  //   return this.value === square.value;
  // }
}

class CrossSquare extends BaseSquare {
  constructor() {
    super("X");
  }

  hasValue(): boolean {
    return true;
  }
}

class CircleSquare extends BaseSquare {
  constructor() {
    super("O");
  }

  hasValue(): boolean {
    return true;
  }
}

class EmptySquare extends BaseSquare {
  constructor() {
    super(undefined);
  }

  hasValue(): boolean {
    return false;
  }
}

export function squareFactory(type: string | undefined): Square {
  switch (type) {
    case "X":
      return new CrossSquare();
    case "O":
      return new CircleSquare();
    default:
      return new EmptySquare();
  }
}
