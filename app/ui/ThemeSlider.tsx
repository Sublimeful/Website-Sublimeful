"use client";

import { useEffect } from "react";
import Slider from "./Slider";

export default function ThemeSlider() {
  useEffect(() => {
    document.documentElement.classList.add(localStorage.theme);
  }, []);

  // Prevent prerender error during build process
  if (typeof window === "undefined") return null;

  return (
    <Slider
      onClick={(checked) => {
        if (checked) {
          localStorage.theme = "light";
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        } else {
          localStorage.theme = "dark";
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        }
      }}
      defaultChecked={localStorage.theme === "light"}
      className="[&>div]:before:block [&>div]:peer-checked:before:bg-[url('/sun.svg')] [&>div]:before:bg-[url('/moon.svg')] [&>div]:before:bg-[4px_4px] [&>div]:before:bg-no-repeat [&>div]:before:w-full [&>div]:before:h-full [&>div]:peer-not-checked:before:filter-[invert(100%)]"
    />
  );
}
