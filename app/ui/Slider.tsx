"use client";

import { useState } from "react";

export default function Slider({
  title,
  onClick,
  defaultChecked = false,
  className,
}: {
  title: string;
  onClick?(checked: boolean): void;
  defaultChecked?: boolean;
  className?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      title={title}
      onClick={(_) => {
        if (onClick) {
          onClick(!checked);
        }
        setChecked(!checked);
      }}
      className={`w-16 h-8 rounded-2xl content-center bg-black dark:bg-white cursor-pointer ${className}`}
    >
      <input
        title="Placeholder Checkbox"
        type="checkbox"
        className="peer absolute w-0 h-0 opacity-0"
        checked={checked}
        tabIndex={-1}
        readOnly
      />
      <div
        className="transition-transform w-6 h-6 rounded-full translate-x-1 bg-white dark:bg-black"
        style={{ transform: `translate(${checked ? 32 : 0}px, 0)` }}
      />
    </button>
  );
}
