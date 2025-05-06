"use client";

import { useEffect, useRef, useState } from "react";
import Keyboard from "./ui/Keyboard";
import wordlist from "./wordlist";
import styles from "./styles.module.css";
import { shuffleArrayWithSeed } from "./random";

export default function Page() {
  const [guessHistory, setGuessHistory] = useState<Array<string>>([]);
  const [guess, setGuess] = useState<string>("");
  const todaysWord = getTodaysWord();
  const guessHistoryRef = useRef<HTMLDivElement>(null);
  const guessFeedbackRef = useRef<HTMLDivElement>(null);

  function getGuessFeedback(guess: string) {
    const todaysWordCounter = {};
    const guessCounter = {};

    let rightLetters = 0;
    let rightPositions = 0;

    for (let i = 0; i < todaysWord.length; i++) {
      if (guess[i] == todaysWord[i]) {
        rightPositions++;
      }
      todaysWordCounter[todaysWord[i]] = todaysWordCounter[todaysWord[i]] ??
        0 + 1;
      guessCounter[guess[i]] = guessCounter[guess[i]] ?? 0 + 1;
    }

    for (const letter of Object.keys(todaysWordCounter)) {
      rightLetters += Math.min(
        todaysWordCounter[letter],
        guessCounter[letter] ?? 0,
      );
    }

    return [rightLetters, rightPositions];
  }

  function getTodaysWord(dayOffset: number = 0) {
    const dayInMs = 1000 * 60 * 60 * 24;
    const currentDay = Math.floor(Date.now() / dayInMs) + dayOffset;
    const currentRotation = Math.floor(currentDay / wordlist.length);
    const arrayOfIndices = [...wordlist.keys()];
    shuffleArrayWithSeed(arrayOfIndices, currentRotation);
    return wordlist[arrayOfIndices[Math.abs(currentDay % wordlist.length)]];
  }

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
              (prevGuess + key.toLowerCase()).slice(0, 5)
            );
          }
          break;
      }
    }

    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    function syncScroll(ev: Event) {
      if (ev.currentTarget === guessHistoryRef.current) {
        guessFeedbackRef.current.scrollTop = guessHistoryRef.current.scrollTop;
      } else {
        guessHistoryRef.current.scrollTop = guessFeedbackRef.current.scrollTop;
      }
    }

    guessHistoryRef.current.addEventListener("scroll", syncScroll);
    guessFeedbackRef.current.addEventListener("scroll", syncScroll);
    return () => {
      guessHistoryRef.current.removeEventListener("scroll", syncScroll);
      guessFeedbackRef.current.removeEventListener("scroll", syncScroll);
    };
  }, []);

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
        <div
          ref={guessHistoryRef}
          className={`${
            styles["guess-history"]
          } w-full scale-x-[-1] row-start-2 col-start-1 h-64 overflow-y-scroll flex flex-col`}
        >
          <div className="scale-x-[-1] w-full grid place-items-center">
            {guessHistory.map((guess, guessIndex) => (
              <div key={guessIndex} className="flex flex-row gap-x-4">
                {guess.split("").map((letter, letterIndex) => (
                  <div key={letterIndex} className="w-4 h-8 text-center">
                    {letter.toUpperCase()}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Guess Feedback */}
        <div
          ref={guessFeedbackRef}
          className={`${
            styles["guess-feedback"]
          } row-start-2 col-start-3 w-full h-64 pl-6 overflow-y-scroll flex flex-col`}
        >
          {guessHistory.map((guess, guessIndex) => {
            const feedback = getGuessFeedback(guess);

            return (
              <div key={guessIndex} className="flex flex-row gap-x-4">
                <h1 className="h-8">{feedback[0]}</h1>
                <h1 className="h-8">{feedback[1]}</h1>
              </div>
            );
          })}
        </div>
        {/* Divider */}
        <div className="row-start-1 col-start-2 row-span-2 w-full h-full bg-black">
        </div>
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
                (prevGuess + key.toLowerCase()).slice(0, 5)
              );
              break;
          }
        }}
      />
    </main>
  );
}
