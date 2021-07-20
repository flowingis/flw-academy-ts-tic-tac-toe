import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Question = (query: string) => Promise<unknown>;
const question: Question = query =>
  new Promise(resolve => rl.question(query, resolve));

rl.on("close", function () {
  process.exit(0);
});

type Prompt = {
  close: () => void;
  question: Question;
};

export const prompt = (): Prompt => {
  return {
    close: () => {
      rl.close();
    },
    question,
  };
};
