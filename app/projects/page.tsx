export default function Page() {
  return (
    <main className="border-t-1 p-4">
      <h1 className="font-bold text-4xl">Projects</h1>
      <br />
      <h2 className="font-semibold text-3xl">Games</h2>
      <ul className="font-medium text-xl list-inside list-disc">
        <li>
          <a className="text-blue-700" href="/games/wordscope">
            WordScope
          </a>
        </li>
      </ul>
    </main>
  );
}
