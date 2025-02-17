"use client";

import Picker from "./Picker";
import PickerItem from "./PickerItem";

export default function CursorPicker() {
  return (
    <Picker>
      <PickerItem
        className=""
        onPick={() => {
          localStorage.cursor = "cat";
        }}
      />
    </Picker>
  );
}
