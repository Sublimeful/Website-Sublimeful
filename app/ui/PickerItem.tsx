export default function PickerItem({
  className,
  onPick,
}: {
  className?: string;
  onPick?(): void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`w-8 h-9 m-0.25 bg-white dark:bg-black cursor-pointer ${className}`}
    />
  );
}
