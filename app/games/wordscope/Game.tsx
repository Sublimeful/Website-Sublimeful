"use client";

import { useEffect, useRef, useState } from "react";
import Keyboard from "./ui/Keyboard";
import validWordlist from "./validWordlist";
import wordlist from "./wordlist";
import styles from "./styles.module.css";
import { shuffleArrayWithSeed } from "./random";
import { WordscopeGames } from "./types";

const dayInMs = 1000 * 60 * 60 * 24;

interface GameProps {
  mode: "daily" | "unlimited";
}

export default function Game({ mode }: GameProps) {
  const [guess, setGuess] = useState<string>("");
  const [guessHistory, setGuessHistory] = useState<Array<string>>([]);
  const [crossedOutLetters, setCrossedOutLetters] = useState<Array<string>>([]);
  const [notifications, setNotifications] = useState<Array<string>>([]);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [winVisible, setWinVisible] = useState(false);
  const [smoothScrolling, setSmoothScrolling] = useState(false);
  const [state, setState] = useState<"idle" | "in progress" | "completed">(
    "idle",
  );
  const [wordId, setWordId] = useState(Math.floor(Date.now() / dayInMs));
  const secretWord = getWord(wordId * (mode === "daily" ? 1 : -1));
  const gameId = `${mode}::${wordId}`;
  const guessHistoryRef = useRef<HTMLDivElement>(null);
  const guessFeedbackRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  function getGuessFeedback(guess: string) {
    if (!guess || guess.length !== secretWord.length) return;

    const todaysWordCounter = {};
    const guessCounter = {};

    let rightLetters = 0;
    let rightPositions = 0;

    for (let i = 0; i < secretWord.length; i++) {
      if (guess[i] === secretWord[i]) {
        rightPositions++;
      }
      todaysWordCounter[secretWord[i]] =
        (todaysWordCounter[secretWord[i]] ?? 0) + 1;
      guessCounter[guess[i]] = (guessCounter[guess[i]] ?? 0) + 1;
    }

    for (const letter of Object.keys(todaysWordCounter)) {
      rightLetters += Math.min(
        todaysWordCounter[letter],
        guessCounter[letter] ?? 0,
      );
    }

    return [rightLetters, rightPositions];
  }

  function getWord(id: number) {
    const rotation = Math.floor(id / wordlist.length);
    const arrayOfIndices = [...wordlist.keys()];
    shuffleArrayWithSeed(arrayOfIndices, rotation);
    return wordlist[arrayOfIndices[Math.abs(id % wordlist.length)]];
  }

  function submitGuess() {
    if (guess.length !== secretWord.length) {
      setNotifications([...notifications, "Not enough letters"]);
      setTimeout(
        () =>
          setNotifications((prevNotifications) => prevNotifications.slice(1)),
        1000,
      );
      return;
    }
    if (guessHistory.includes(guess)) {
      setNotifications([...notifications, "Already guessed this word"]);
      setTimeout(
        () =>
          setNotifications((prevNotifications) => prevNotifications.slice(1)),
        1000,
      );
      return;
    }
    if (!validWordlist.includes(guess)) {
      setNotifications([...notifications, "Not in word list"]);
      setTimeout(
        () =>
          setNotifications((prevNotifications) => prevNotifications.slice(1)),
        1000,
      );
      return;
    }
    setGuessHistory([...guessHistory, guess]);
    // Clear guess input
    setGuess("");
  }

  // <{{ Attach key press events
  useEffect(() => {
    // Don't do anything if game is not in progress
    if (state !== "in progress") return;

    function onKeyDown(event: KeyboardEvent) {
      const key = event.key;
      switch (key) {
        case "Backspace":
          setGuess((prevGuess) => prevGuess.slice(0, -1));
          break;
      }
    }

    function onKeyPress(event: KeyboardEvent) {
      const key = event.key;
      switch (key) {
        case "Enter":
          submitGuess();
          break;
        default:
          if (key.match(/^[A-Z]$/i)) {
            setGuess((prevGuess) =>
              (prevGuess + key.toLowerCase()).slice(0, secretWord.length)
            );
          }
          break;
      }
    }

    addEventListener("keydown", onKeyDown);
    addEventListener("keypress", onKeyPress);
    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keypress", onKeyPress);
    };
  }, [instructionsVisible, state, guess, notifications]);
  // }}>

  // <{{ Sync up scrolling for guess history and feedback
  useEffect(() => {
    if (smoothScrolling) return;

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
      guessHistoryRef.current?.removeEventListener("scroll", syncScroll);
      guessFeedbackRef.current?.removeEventListener("scroll", syncScroll);
    };
  }, [smoothScrolling]);
  // }}>

  // <{{ Check if user has completed the game
  useEffect(() => {
    // Don't do anything if game is not in progress
    if (state !== "in progress") return;

    const lastGuess = guessHistory[guessHistory.length - 1];
    const lastGuessFeedback = getGuessFeedback(lastGuess);
    if (lastGuessFeedback && lastGuessFeedback[1] === secretWord.length) {
      setState("completed");
      setWinVisible(true);
    }
  }, [instructionsVisible, state, guessHistory]);
  // }}>

  // <{{ Auto scroll guess history when user guesses
  useEffect(() => {
    const guessesElements =
      guessHistoryRef.current.querySelector("div").children;
    const feedbackElements = guessFeedbackRef.current.children;
    const lastGuessElement = guessesElements[guessesElements.length - 1];
    const lastFeedbackElement = feedbackElements[feedbackElements.length - 1];
    if (!lastGuessElement || !lastFeedbackElement) return;
    setSmoothScrolling(true);
    lastGuessElement.scrollIntoView({ behavior: "smooth", block: "end" });
    lastFeedbackElement.scrollIntoView({ behavior: "smooth", block: "end" });
    guessHistoryRef.current.onscrollend = () => {
      setSmoothScrolling(false);
      guessHistoryRef.current.onscrollend = null;
    };
  }, [guessHistory]);
  // }}>

  // <{{ Initialize or get game state
  useEffect(() => {
    const games: WordscopeGames =
      JSON.parse(localStorage.getItem("wordscope::games")) ?? {};
    if (!(gameId in games)) {
      games[gameId] = { guessHistory: [], crossedOutLetters: [] };
    }
    const guessHistory = games[gameId].guessHistory;
    const crossedOutLetters = games[gameId].crossedOutLetters;
    if (guessHistory.length === 0 && crossedOutLetters.length === 0) {
      setInstructionsVisible(true);
    } else {
      // Set game state
      setGuessHistory(guessHistory);
      setCrossedOutLetters(crossedOutLetters);
      setState("in progress");
    }
  }, [wordId, mode]);
  // }}>

  // <{{ Update local storage when the guessHistory or crossedOutLetters states change
  useEffect(() => {
    console.log(guessHistory, crossedOutLetters);
    const games: WordscopeGames =
      JSON.parse(localStorage.getItem("wordscope::games")) ?? {};
    const gameState = games[gameId] ??
      { guessHistory: [], crossedOutLetters: [] };
    gameState.guessHistory = guessHistory;
    gameState.crossedOutLetters = crossedOutLetters;
    games[gameId] = gameState;
    localStorage.setItem("wordscope::games", JSON.stringify(games));
  }, [guessHistory, crossedOutLetters]);
  // }}>

  // <{{ Change the brightness of keys for those that are crossed out
  useEffect(() => {
    if (!keyboardRef.current) return;

    for (const key of keyboardRef.current.querySelectorAll("button")) {
      if (crossedOutLetters.includes(key.textContent)) {
        key.style.filter = "brightness(0.6)";
      } else {
        key.style.filter = "";
      }
    }
  }, [crossedOutLetters]);
  // }}>

  return (
    <div>
      {/* Notifications popup */}
      {notifications.map((content, index) => {
        return (
          <div
            key={index}
            className="fixed z-40 left-1/2 -translate-1/2 bg-white dark:bg-black w-56 h-max border-1 text-center"
            style={{ transform: `translate(0, ${140 * (index + 1)}%)` }}
          >
            {content}
          </div>
        );
      })}
      {/* Victory popup */}
      {winVisible && (
        <div className="fixed z-40 top-0 w-screen h-screen bg-[rgb(0,0,0,.8)]">
          <div className="fixed z-40 py-4 px-8 w-full sm:w-1/2 lg:w-96 h-[calc-size(calc-size(max-content,size),min(100vh,size))] top-1/2 left-1/2 -translate-1/2 bg-white dark:bg-black border-2 overflow-y-scroll">
            <h1 className="text-center font-bold text-3xl">Amazing!</h1>
            <br />
            <p>
              You found the secret word in {guessHistory.length}{" "}
              guesses! Come back tomorrow for a new word.
            </p>
            <br />
            <button
              type="button"
              onClick={() => setWinVisible(false)}
              className="cursor-pointer border-1 rounded-xl p-2"
            >
              See my guesses
            </button>
          </div>
        </div>
      )}
      {/* Instructions popup */}
      {instructionsVisible && (
        <div className="fixed z-40 top-0 w-screen h-screen bg-[rgb(0,0,0,.8)]">
          <div className="fixed z-40 py-4 px-8 w-full sm:w-3/4 md:w-1/2 h-[calc-size(calc-size(max-content,size),min(100vh,size))] top-1/2 left-1/2 -translate-1/2 bg-white dark:bg-black border-2 overflow-y-scroll">
            <h1 className="text-center font-bold text-3xl">Wordscope</h1>
            <br />
            <h2 className="font-bold text-2xl">How to play?</h2>
            <ul className="list-inside list-disc">
              <li>Find the secret word. You have unlimited guesses.</li>
              <li>
                Whenever you guess, you are given feedback in the form of 2
                numbers.
              </li>
              <li>
                The 1st number tells you how many letters you got correct
                (including duplicate letters), the 2nd number tells you how many
                letters are in the correct position.
              </li>
              <li>
                You can also click on each letter in the guess history to cross
                it out. This can be helpful for eliminating letters you know are
                not in the secret word.
              </li>
            </ul>
            <br />
            <button
              type="button"
              onClick={() => {
                setState("in progress");
                setInstructionsVisible(false);
              }}
              className="cursor-pointer border-1 rounded-xl p-2"
            >
              OK I got it shut up
            </button>
          </div>
        </div>
      )}
      <div className="my-4 m-auto w-full md:w-xl text-xl gap-y-4 grid grid-rows-[repeat(2,min-content)] grid-cols-[1fr_2px_1fr] place-items-center">
        {/* Guess */}
        <div className="row-start-1 col-start-1 flex flex-row">
          {guess
            .padEnd(secretWord.length, " ")
            .slice(0, secretWord.length)
            .split("")
            .map((letter, index) => (
              <div
                key={index}
                className="relative w-8 h-8 text-center select-none before:content-[''] before:absolute before:w-4 before:h-8 before:left-1/4 before:border-b-2"
              >
                {letter.toUpperCase()}
              </div>
            ))}
        </div>
        {/* Guess History */}
        <div
          ref={guessHistoryRef}
          className={`${
            styles["guess-history"]
          } w-full scale-x-[-1] row-start-2 col-start-1 h-64 overflow-y-scroll`}
        >
          <div className="scale-x-[-1] w-full flex flex-col items-center">
            {guessHistory.map((guess, guessIndex) => (
              <div key={guessIndex} className="flex flex-row">
                {guess.split("").map((letter, letterIndex) => (
                  <div
                    key={letterIndex}
                    onClick={() => {
                      const letterUpperCase = letter.toUpperCase();
                      if (crossedOutLetters.includes(letterUpperCase)) {
                        setCrossedOutLetters(
                          crossedOutLetters.filter(
                            (l) => l !== letterUpperCase,
                          ),
                        );
                      } else {
                        setCrossedOutLetters([
                          ...crossedOutLetters,
                          letterUpperCase,
                        ]);
                      }
                    }}
                    className="w-8 h-8 cursor-pointer"
                  >
                    <h1 className="relative w-8 h-8 text-center select-none">
                      {crossedOutLetters.includes(letter.toUpperCase()) && (
                        <div className="absolute w-full h-full -top-[0.65rem] text-red-600 font-semibold text-4xl pointer-events-none">
                          x
                        </div>
                      )}
                      {letter.toUpperCase()}
                    </h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Guess Feedback Legend */}
        <div className="row-start-1 col-start-3 flex flex-row w-full justify-evenly">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg" />
          <div className="w-8 h-8 bg-green-500 rounded-lg" />
        </div>
        {/* Guess Feedback */}
        <div
          ref={guessFeedbackRef}
          className={`${
            styles["guess-feedback"]
          } row-start-2 col-start-3 w-full h-64 overflow-y-scroll flex flex-col items-center`}
        >
          {guessHistory.map((guess, guessIndex) => {
            const feedback = getGuessFeedback(guess);

            if (!feedback) return null;

            return (
              <div
                key={guessIndex}
                className="flex flex-row w-full justify-evenly"
              >
                <h1 className="w-8 h-8 text-center select-none">
                  {feedback[0]}
                </h1>
                <h1 className="w-8 h-8 text-center select-none">
                  {feedback[1]}
                </h1>
              </div>
            );
          })}
        </div>
        {/* Divider */}
        <div className="row-start-1 col-start-2 row-span-2 w-full h-full bg-black dark:bg-white">
        </div>
      </div>
      <Keyboard
        ref={keyboardRef}
        onKeyPress={(key: string) => {
          // Don't do anything if game is not in progress
          if (state !== "in progress") return;

          switch (key) {
            case "Backspace":
              setGuess((prevGuess) => prevGuess.slice(0, -1));
              break;
            case "Enter":
              submitGuess();
              break;
            default:
              setGuess((prevGuess) =>
                (prevGuess + key.toLowerCase()).slice(0, secretWord.length)
              );
              break;
          }
        }}
        className="my-4 m-auto w-[calc(100%-1rem)] md:w-xl h-56"
      />
    </div>
  );
}
