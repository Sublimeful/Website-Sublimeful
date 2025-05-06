import { MouseEventHandler } from "react";

interface KeyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}
function Key({ onClick, children, className }: KeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer w-8 md:w-12 h-12 text-xs rounded-md bg-gray-300 dark:bg-gray-600 ${className}`}
    >
      {children}
    </button>
  );
}

interface KeyboardProps {
  onKeyPress(key: string): void;
}

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-y-1 items-center">
      <div className="flex flex-row gap-x-1">
        <Key onClick={() => onKeyPress("q")}>Q</Key>
        <Key onClick={() => onKeyPress("w")}>W</Key>
        <Key onClick={() => onKeyPress("e")}>E</Key>
        <Key onClick={() => onKeyPress("r")}>R</Key>
        <Key onClick={() => onKeyPress("t")}>T</Key>
        <Key onClick={() => onKeyPress("y")}>Y</Key>
        <Key onClick={() => onKeyPress("u")}>U</Key>
        <Key onClick={() => onKeyPress("i")}>I</Key>
        <Key onClick={() => onKeyPress("o")}>O</Key>
        <Key onClick={() => onKeyPress("p")}>P</Key>
      </div>
      <div className="flex flex-row gap-x-1">
        <Key onClick={() => onKeyPress("a")}>A</Key>
        <Key onClick={() => onKeyPress("s")}>S</Key>
        <Key onClick={() => onKeyPress("d")}>D</Key>
        <Key onClick={() => onKeyPress("f")}>F</Key>
        <Key onClick={() => onKeyPress("g")}>G</Key>
        <Key onClick={() => onKeyPress("h")}>H</Key>
        <Key onClick={() => onKeyPress("j")}>J</Key>
        <Key onClick={() => onKeyPress("k")}>K</Key>
        <Key onClick={() => onKeyPress("l")}>L</Key>
      </div>
      <div className="flex flex-row gap-x-1">
        <Key
          className="md:w-16 w-12 grid place-items-center"
          onClick={() => onKeyPress("Backspace")}
        >
          <img src="/backspace.svg" className="dark:filter-[invert()]" />
        </Key>
        <Key onClick={() => onKeyPress("z")}>Z</Key>
        <Key onClick={() => onKeyPress("x")}>X</Key>
        <Key onClick={() => onKeyPress("c")}>C</Key>
        <Key onClick={() => onKeyPress("v")}>V</Key>
        <Key onClick={() => onKeyPress("b")}>B</Key>
        <Key onClick={() => onKeyPress("n")}>N</Key>
        <Key onClick={() => onKeyPress("m")}>M</Key>
        <Key
          className="md:w-16 w-12 grid place-items-center"
          onClick={() => onKeyPress("Enter")}
        >
          <img
            src="/arrow-return-right.svg"
            className="dark:filter-[invert()]"
          />
        </Key>
      </div>
    </div>
  );
}
