export interface WordscopeGame {
  guessHistory: Array<string>;
  crossedOutLetters: Array<string>;
}

export type WordscopeGames = { [gameId: string]: WordscopeGame };
