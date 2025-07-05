"use client";

import { useEffect, useState } from "react";
import usePersistentState from "../hooks/usePersistentState";
import CursorDog from "./CursorDog";

export default function Cursor() {
  const [mousePos, setMousePos] = usePersistentState("mousePos", {
    x: 0,
    y: 0,
  });
  const [cursor, setCursor] = useState("none");

  useEffect(() => {
    function updateMousePos(e: MouseEvent) {
      setMousePos({
        x: e.x,
        y: e.y,
      });
    }

    addEventListener("mousemove", updateMousePos);
    return () => {
      removeEventListener("mousemove", updateMousePos);
    };
  }, [setMousePos]);

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
      return <CursorDog mousePos={mousePos} />;
    default:
      return null;
  }
}
