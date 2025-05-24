export default function PickerItem({
  title,
  className,
  onPick,
}: {
  title: string,
  className?: string;
  onPick?(): void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onPick}
      className={`w-8 h-9 m-0.25 bg-white dark:bg-black cursor-pointer ${className}`}
    />
  );
}
