"use client";

import Picker from "./Picker";
import PickerItem from "./PickerItem";

export default function CursorPicker() {
  return (
    <Picker>
      <PickerItem
        className="w-[32px] h-[32px] bg-[url('/cursor.png')] pixelate"
        onPick={() => {
          localStorage.setItem("cursor", "none");
          dispatchEvent(new CustomEvent("cursor-change"))
        }}
      />
      <PickerItem
        className="w-[32px] h-[32px] bg-[url('/dog.png')] pixelate"
        onPick={() => {
          localStorage.setItem("cursor", "dog");
          dispatchEvent(new CustomEvent("cursor-change"))
        }}
      />
    </Picker>
  );
}
