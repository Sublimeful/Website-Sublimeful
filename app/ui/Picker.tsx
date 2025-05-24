"use client";

import { useEffect, useRef, useState } from "react";

import PickerPopup from "./PickerPopup";

export default function Picker({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  const [showPopup, setShowPopup] = useState(false);

  const pickerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        showPopup && e.target !== pickerRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        setShowPopup(false);
      }
    }

    document.body.addEventListener("click", onClick);
    return () => document.body.removeEventListener("click", onClick);
  }, [showPopup]);

  return (
    <div className="relative">
      <button
        ref={pickerRef}
        type="button"
        title={title}
        onClick={() => setShowPopup(!showPopup)}
        className={`w-8 h-8 rounded-full bg-black dark:bg-white cursor-pointer ${className}`}
      >
      </button>
      <PickerPopup ref={popupRef} visible={showPopup}>
        {children}
      </PickerPopup>
    </div>
  );
}
