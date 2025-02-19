"use client";

import { useEffect, useState } from "react";
import Slider from "./Slider";

export default function ThemeSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent prerender error during build process
  if (!mounted) return null;

  return (
    <Slider
      onClick={(checked) => {
        if (checked) {
          localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        } else {
          localStorage.setItem("theme", "dark");
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        }
      }}
      defaultChecked={localStorage.getItem("theme") === "light"}
      className="[&>div]:before:block [&>div]:peer-checked:before:bg-[url('/sun.svg')] [&>div]:before:bg-[url('/moon.svg')] [&>div]:before:bg-[4px_4px] [&>div]:before:bg-no-repeat [&>div]:before:w-full [&>div]:before:h-full [&>div]:peer-not-checked:before:filter-[invert(100%)]"
    />
  );
}
