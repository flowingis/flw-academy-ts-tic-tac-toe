export interface Square {
  value?: string;
}

export interface Square {
  render(): string;
  hasValue(): boolean;
  isEquals(other: unknown): boolean;
}

abstract class BaseSquare implements Square {
  constructor(public value?: string) {}

  render() {
    return this.value || " ";
  }

  abstract hasValue(): boolean;

  isEquals(square) {
    return square instanceof BaseSquare && this.value === square.value;
  }
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
    super();
  }

  hasValue(): boolean {
    return false;
  }
}

export function squareFactory(type?: string): Square {
  switch (type) {
    case "X":
      return new CrossSquare();
    case "O":
      return new CircleSquare();
    default:
      return new EmptySquare();
  }
}
