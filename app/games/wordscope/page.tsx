"use client";

import { useEffect, useState } from "react";
import Keyboard from "./ui/Keyboard";
import wordlist from "./wordlist";

export default function Page() {
  const [guessHistory, setGuessHistory] = useState<Array<string>>([]);
  const [guess, setGuess] = useState<string>("");

  function submitGuess() {
    if (guessHistory.includes(guess) || !wordlist.includes(guess)) return;
    setGuessHistory([...guessHistory, guess]);
    // Clear guess input
    setGuess("");
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key;
      switch (key) {
        case "Backspace":
          setGuess((prevGuess) => prevGuess.slice(0, -1));
          break;
        case "Enter":
          submitGuess();
          break;
        default:
          if (key.match(/^[A-Z]$/i)) {
            setGuess((prevGuess) =>
              (prevGuess + key.toLowerCase()).slice(0, 5),
            );
          }
          break;
      }
    }

    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  });

  return (
    <main className="p-4 border-t-1">
      <div className="mb-4 m-auto w-min text-xl gap-y-4 grid grid-rows-[repeat(2,min-content)] grid-cols-[12rem_2px_12rem] place-items-center">
        {/* Guess */}
        <div className="row-start-1 col-start-1 flex flex-row gap-x-4">
          {guess
            .padEnd(5, " ")
            .slice(0, 5)
            .split("")
            .map((letter, index) => (
              <div key={index} className="w-4 h-8 border-b-2 text-center">
                {letter.toUpperCase()}
              </div>
            ))}
        </div>
        {/* Guess History */}
        <div className="row-start-2 col-start-1 flex flex-col">
          {guessHistory.map((word, wordIndex) => (
            <div key={wordIndex} className="flex flex-row gap-x-4">
              {word.split("").map((letter, letterIndex) => (
                <div key={letterIndex} className="w-4 h-8 text-center">
                  {letter.toUpperCase()}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="row-start-1 col-start-2 row-span-2 w-full h-full bg-black"></div>
      </div>
      <Keyboard
        onKeyPress={(key: string) => {
          switch (key) {
            case "Backspace":
              setGuess((prevGuess) => prevGuess.slice(0, -1));
              break;
            case "Enter":
              submitGuess();
              break;
            default:
              setGuess((prevGuess) =>
                (prevGuess + key.toLowerCase()).slice(0, 5),
              );
              break;
          }
        }}
      />
    </main>
  );
}
