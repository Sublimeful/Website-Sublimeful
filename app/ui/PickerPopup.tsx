import { ForwardedRef, forwardRef } from "react";

export default forwardRef(function PickerPopup(
  { children, visible }: { children: React.ReactNode; visible: boolean },
  ref: ForwardedRef<HTMLDivElement>,
) {
  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="absolute translate-7 border-black dark:border-white border-2 cursor-auto grid grid-cols-3 gap-0.5 bg-black dark:bg-white"
    >
      {children}
    </div>
  );
});
