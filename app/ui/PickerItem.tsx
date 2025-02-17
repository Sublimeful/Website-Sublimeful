export default function PickerItem({
  className,
  onPick,
}: {
  className?: string;
  onPick?(): void;
}) {
  return (
    <button
      onClick={onPick}
      className={`w-8 h-9 bg-white dark:bg-black cursor-pointer ${className}`}
    />
  );
}
