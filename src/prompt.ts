import * as readline from "readline";
import { MyReturnType } from "./utils/type.utils";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// type Question = (query: string) => Promise<unknown>;
const question = (query: string) =>
  new Promise(resolve => rl.question(query, resolve));

type Question = typeof question;

type QuestionResult = MyReturnType<Question>;

rl.on("close", function () {
  process.exit(0);
});

// type Prompt = {
//   close: () => void;
//   question: Question;
// };

export const prompt = () => {
  return {
    close: () => {
      rl.close();
    },
    question,
  };
};

type Prompt = ReturnType<typeof prompt>;
