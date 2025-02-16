"use client";

import { useEffect, useState } from "react";
import Slider from "./Slider";

export default function ThemeSlider() {
  const [isClient, setIsClient] = useState(false);

  function setDarkTheme() {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }

  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }

  useEffect(() => {
    setIsClient(true);

    // Detect system preference and set the initial theme to it
    if (typeof localStorage.theme === "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
    }

    // Set the theme from localStorage
    if (localStorage.theme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  // Prevent prerender error during build process
  if (!isClient) return null;

  return (
    <Slider
      onClick={(checked) => {
        if (checked) {
          localStorage.theme = "light";
          setLightTheme();
        } else {
          localStorage.theme = "dark";
          setDarkTheme();
        }
      }}
      defaultChecked={localStorage.theme === "light"}
      className="[&>div]:before:block [&>div]:peer-checked:before:bg-[url('/sun.svg')] [&>div]:before:bg-[url('/moon.svg')] [&>div]:before:bg-[4px_4px] [&>div]:before:bg-no-repeat [&>div]:before:w-full [&>div]:before:h-full [&>div]:peer-not-checked:before:filter-[invert(100%)]"
    />
  );
}
