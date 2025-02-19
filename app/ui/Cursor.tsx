"use client";

import { useEffect, useState } from "react";
import CursorDog from "./CursorDog";

export default function Cursor() {
  const [cursor, setCursor] = useState("none");

  useEffect(() => {
    function updateCursor() {
      setCursor(localStorage.getItem("cursor"));
    }

    updateCursor();

    addEventListener("cursor-change", updateCursor);
    addEventListener("storage", updateCursor);
    return () => {
      removeEventListener("cursor-change", updateCursor);
      removeEventListener("storage", updateCursor);
    };
  }, []);

  switch (cursor) {
    case "dog":
      return <CursorDog />;
    default:
      return null;
  }
}
