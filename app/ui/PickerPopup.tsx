import { ForwardedRef, forwardRef } from "react";

export default forwardRef(function PickerPopup(
  { children, visible }: { children: React.ReactNode; visible: boolean },
  ref: ForwardedRef<HTMLDivElement>,
) {
  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="absolute translate-7 border-black dark:border-white border-1 cursor-auto grid grid-cols-[repeat(5,min-content)] bg-black dark:bg-white"
    >
      {children}
    </div>
  );
});
