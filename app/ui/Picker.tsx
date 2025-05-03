"use client";

import { useEffect, useRef, useState } from "react";

import PickerPopup from "./PickerPopup";

export default function Picker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [showPopup, setShowPopup] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.target === pickerRef.current) setShowPopup(!showPopup);
      else if (showPopup && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    }

    document.body.addEventListener("click", onClick);
    return () => document.body.removeEventListener("click", onClick);
  }, [showPopup]);

  return (
    <div
      ref={pickerRef}
      className={`w-8 h-8 rounded-full bg-black dark:bg-white cursor-pointer ${className}`}
    >
      <PickerPopup ref={popupRef} visible={showPopup}>
        {children}
      </PickerPopup>
    </div>
  );
}
