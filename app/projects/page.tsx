import Link from "next/link";

export default function Page() {
  return (
    <main className="border-t-1 p-4">
      <h1 className="font-bold text-4xl">Projects</h1>
      <br />
      <h2 className="font-semibold text-3xl">AI/ML</h2>
      <ul className="font-medium text-xl list-inside list-disc">
        <li>
          <Link
            className="text-blue-700"
            href="https://interviewai.sublimeful.org"
          >
            InterviewAI
          </Link>
        </li>
      </ul>
      <h2 className="font-semibold text-3xl">Games</h2>
      <ul className="font-medium text-xl list-inside list-disc">
        <li>
          <Link className="text-blue-700" href="/games/wordscope">
            Wordscope
          </Link>
        </li>
        <li>
          <Link className="text-blue-700" href="https://unravel.sublimeful.org">
            UnRavel
          </Link>
        </li>
      </ul>
    </main>
  );
}
