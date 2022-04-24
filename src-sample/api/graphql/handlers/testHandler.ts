/**
 * @packageDocumentation
 * @module API/GraphQL/Handlers/Test
 * Handles the tests queries.
 */

type ArgsType = Record<string, unknown>;

type NumbersResultType = {
  results: number[];
};

export const greetings = {
  /**
   * Handles the hello function.
   */
  hello: (args: ArgsType): string => {
    const name = <string>args.name || 'anonymous';
    return `Hello ${name}!`;
  },

  /**
   * Handles the goodbye function.
   */
  bye: (args: ArgsType): string => {
    const name = <string>args.name || 'anonymous';
    return `Good bye ${name}!`;
  },

  /**
   * Handles the numbers function.
   */
  randomNumbers: (args: ArgsType): NumbersResultType => {
    const count = <number>args.count;
    const numArray = Array(count).fill(0);
    const results = numArray.map(() => Math.floor(Math.random() * 500));
    return { results };
  },
};

export default greetings;
