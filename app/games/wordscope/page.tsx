import Keyboard from "./ui/Keyboard";

export default function Page() {
  return (
    <main className="p-4 border-t-1">
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          {Array(6).fill(0).map(() => <div className="w-16 h-16 border-1" />)}
        </div>
        <div className="flex flex-row">
          {Array(6).fill(0).map(() => <div className="w-16 h-16 border-1" />)}
        </div>
      </div>
      <Keyboard />
    </main>
  );
}
