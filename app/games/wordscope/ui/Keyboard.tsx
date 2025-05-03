function Key({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="cursor-pointer p-4 w-12 rounded-md bg-gray-300 dark:bg-gray-600"
    >
      {children}
    </button>
  );
}

export default function Keyboard() {
  return (
    <div className="flex flex-col gap-y-1 items-center">
      <div className="flex flex-row gap-x-1">
        <Key>Q</Key>
        <Key>W</Key>
        <Key>E</Key>
        <Key>R</Key>
        <Key>T</Key>
        <Key>Y</Key>
        <Key>U</Key>
        <Key>I</Key>
        <Key>O</Key>
        <Key>P</Key>
      </div>
      <div className="flex flex-row gap-x-1">
        <Key>A</Key>
        <Key>S</Key>
        <Key>D</Key>
        <Key>F</Key>
        <Key>G</Key>
        <Key>H</Key>
        <Key>J</Key>
        <Key>K</Key>
        <Key>L</Key>
      </div>
      <div className="flex flex-row gap-x-1">
        <Key>
          <img src="/backspace.svg" className="dark:filter-[invert()]" />
        </Key>
        <Key>Z</Key>
        <Key>X</Key>
        <Key>C</Key>
        <Key>V</Key>
        <Key>B</Key>
        <Key>N</Key>
        <Key>M</Key>
        <Key>
          <img
            src="/arrow-return-right.svg"
            className="dark:filter-[invert()]"
          />
        </Key>
      </div>
    </div>
  );
}
