"use client";

import { useEffect, useState } from "react";
import Picker from "./Picker";
import PickerItem from "./PickerItem";

export default function CursorPicker() {
  const [imageName, setImageName] = useState("cursor");

  useEffect(() => {
    function updateCursorImage() {
      switch (localStorage.getItem("cursor")) {
        case "dog":
          setImageName("dog");
          break;
        case "none":
          setImageName("cursor");
          break;
      }
    }

    updateCursorImage();

    addEventListener("cursor-change", updateCursorImage);
    addEventListener("storage", updateCursorImage);
    return () => {
      removeEventListener("cursor-change", updateCursorImage);
      removeEventListener("storage", updateCursorImage);
    };
  }, [imageName]);

  return (
    <Picker className={`bg-[url('/${imageName}.png')] pixelate`}>
      <PickerItem
        className="w-[32px] h-[32px] bg-[url('/cursor.png')] pixelate"
        onPick={() => {
          localStorage.setItem("cursor", "none");
          dispatchEvent(new CustomEvent("cursor-change"));
        }}
      />
      <PickerItem
        className="w-[32px] h-[32px] bg-[url('/dog.png')] pixelate"
        onPick={() => {
          localStorage.setItem("cursor", "dog");
          dispatchEvent(new CustomEvent("cursor-change"));
        }}
      />
    </Picker>
  );
}
