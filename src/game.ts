import chalk from "chalk";

import { prompt } from "./prompt";
import { board } from "./board";

const gameBoard = board();
const gamePrompt = prompt();

async function next(): Promise<void> {
  gameBoard.render();
  const answer = await gamePrompt.question(
    chalk.blue(`Turn of the player ${this.player}. Insert your choice  `)
  );

  try {
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
  player: string;
  winner?: string;
  start: () => void;
  next: () => void;
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
