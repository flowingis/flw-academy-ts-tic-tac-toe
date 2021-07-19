class Square {
  constructor(value) {
    this.value = value;
  }

  render() {
    return this.value;
  }

  hasValue() {
    throw new Error("Not implemented");
  }

  isEquals(square) {
    return square instanceof Square && this.value === square.value;
  }
}

class CrossSquare extends Square {
  constructor() {
    super("X");
  }

  hasValue() {
    return true;
  }
}

class CircleSquare extends Square {
  constructor() {
    super("O");
  }

  hasValue() {
    return true;
  }
}

class EmptySquare extends Square {
  constructor() {
    super(" ");
  }

  hasValue() {
    return false;
  }
}

export function squareFactory(type) {
  switch (type) {
    case "X":
      return new CrossSquare();
    case "O":
      return new CircleSquare();
    default:
      return new EmptySquare();
  }
}
