import Image from "next/image";
import { MouseEventHandler, RefObject } from "react";

interface KeyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function Key({ onClick, children, title, className }: KeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`col-span-2 cursor-pointer select-none rounded-md bg-gray-300 dark:bg-gray-600 ${className}`}
    >
      {children}
    </button>
  );
}

interface KeyboardProps {
  onKeyPress(key: string): void;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
}

export default function Keyboard({
  onKeyPress,
  className,
  ref,
}: KeyboardProps) {
  return (
    <div
      ref={ref}
      className={`grid grid-cols-20 grid-rows-3 gap-1 ${className}`}
    >
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
      <div /> {/* Blank Space Divider */}
      <Key onClick={() => onKeyPress("a")}>A</Key>
      <Key onClick={() => onKeyPress("s")}>S</Key>
      <Key onClick={() => onKeyPress("d")}>D</Key>
      <Key onClick={() => onKeyPress("f")}>F</Key>
      <Key onClick={() => onKeyPress("g")}>G</Key>
      <Key onClick={() => onKeyPress("h")}>H</Key>
      <Key onClick={() => onKeyPress("j")}>J</Key>
      <Key onClick={() => onKeyPress("k")}>K</Key>
      <Key onClick={() => onKeyPress("l")}>L</Key>
      <Key
        onClick={() => onKeyPress("Enter")}
        title="Enter Key"
        className="grid place-items-center col-span-3"
      >
        <Image
          width={16}
          height={16}
          src="/arrow-return-right.svg"
          alt="arrow-return-right"
          className="dark:filter-[invert()]"
        />
      </Key>
      <Key onClick={() => onKeyPress("z")}>Z</Key>
      <Key onClick={() => onKeyPress("x")}>X</Key>
      <Key onClick={() => onKeyPress("c")}>C</Key>
      <Key onClick={() => onKeyPress("v")}>V</Key>
      <Key onClick={() => onKeyPress("b")}>B</Key>
      <Key onClick={() => onKeyPress("n")}>N</Key>
      <Key onClick={() => onKeyPress("m")}>M</Key>
      <Key
        onClick={() => onKeyPress("Backspace")}
        title="Backspace Key"
        className="grid place-items-center col-span-3"
      >
        <Image
          width={16}
          height={16}
          src="/backspace.svg"
          alt="backspace"
          className="dark:filter-[invert()]"
        />
      </Key>
    </div>
  );
}
