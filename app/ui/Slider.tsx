"use client";

import { useRef, useState } from "react";

export default function Slider({
  onClick,
  defaultChecked = false,
  className,
}: {
  onClick?(checked: boolean): void;
  defaultChecked?: boolean;
  className?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={(_) => {
        if (onClick) {
          onClick(!checked);
        }
        setChecked(!checked);
        checkboxRef.current.checked = !checked;
      }}
      className={`w-16 h-8 rounded-2xl content-center bg-black dark:bg-white cursor-pointer ${className}`}
    >
      <input
        ref={checkboxRef}
        className="peer absolute w-0 h-0 opacity-0"
        type="checkbox"
        defaultChecked={defaultChecked}
      />
      <div className="transition-transform w-6 h-6 rounded-full translate-x-1 peer-checked:translate-x-9 bg-white dark:bg-black" />
    </div>
  );
}
