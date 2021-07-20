import chalk from "chalk";

import { prompt } from "./prompt";
import { Board } from "./board";
import { Player } from "./player";

const gameBoard = new Board();
const gamePrompt = prompt();

async function next(this: Game): Promise<void> {
  gameBoard.render();
  const answer = await gamePrompt.question(
    chalk.blue(`Turn of the player ${this.player}. Insert your choice  `)
  );

  try {
    if (typeof answer !== "string")
      throw new Error("Invalid answer, answer must be a string");

    gameBoard.makeMove(this.player, answer);
    this.winner = gameBoard.getWinner();
    this.player = this.player === "X" ? "O" : "X";
    if (this.winner) {
      gameBoard.render();
      console.log(chalk.green(`Player ${this.winner} won!`));
      gamePrompt.close();
      return;
    }
    this.next();
  } catch (error) {
    console.log(chalk.red(error.message));
    this.next();
  }
}

type Game = {
  player: Player;
  winner?: Player;
  start: () => Promise<void>;
  next: () => Promise<void>;
};

const game = (): Game => {
  return {
    player: "X",
    winner: undefined,
    start: next,
    next,
  };
};

export default game;
