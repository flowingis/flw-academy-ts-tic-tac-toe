import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = query => new Promise(resolve => rl.question(query, resolve));

rl.on("close", function () {
  process.exit(0);
});

export const prompt = () => {
  return {
    close: () => {
      rl.close();
    },
    question,
  };
};
