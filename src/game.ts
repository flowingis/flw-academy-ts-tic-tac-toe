import chalk from "chalk";

import { prompt } from "./prompt";
import { Board } from "./board";
import { Player } from "./player";

function isDefined<T>(
  obj: T | undefined | null,
  message?: string
): asserts obj is T {
  if (!obj) throw new Error(message || "Field is not defined");
}

export class Game {
  private player?: Player;
  private winner?: Player;

  private gameBoard = new Board();
  private gamePrompt = prompt();

  next(player: Player): Promise<void>;
  next(): Promise<void>;
  async next(player?: Player): Promise<void> {
    if (player && this.player) {
      throw new Error("Game already started");
    }

    if (player && !this.player) {
      this.player = player;
    }

    isDefined(this.player, "No player selected");

    this.gameBoard.render();
    const answer = await this.gamePrompt.question(
      chalk.blue(`Turn of the player ${this.player}. Insert your choice  `)
    );

    try {
      if (typeof answer !== "string")
        throw new Error("Invalid answer, answer must be a string");

      this.gameBoard.makeMove(this.player, answer);
      this.winner = this.gameBoard.getWinner();
      this.player = this.player === "X" ? "O" : "X";
      if (this.winner) {
        this.gameBoard.render();
        console.log(chalk.green(`Player ${this.winner} won!`));
        this.gamePrompt.close();
        return;
      }
      this.next();
    } catch (error) {
      console.log(chalk.red(error.message));
      this.next();
    }
  }
}
