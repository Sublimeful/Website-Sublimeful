import { RefObject } from "react";

export default function PickerPopup(
  { children, visible, ref }: {
    children: React.ReactNode;
    visible: boolean;
    ref?: RefObject<HTMLDivElement>;
  },
) {
  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="absolute top-0 translate-7 border-black dark:border-white border-1 cursor-auto grid grid-cols-[repeat(5,min-content)] bg-black dark:bg-white"
    >
      {children}
    </div>
  );
}
