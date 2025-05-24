import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="border-t-1 pb-16">
      <Image
        width={576}
        height={144}
        className="h-36 m-auto dark:filter-[invert()] my-12"
        src={"/wordscope/logo.svg"}
        alt="Wordscope Logo"
      />
      <Link
        type="button"
        href={"/games/wordscope/daily"}
        className="cursor-pointer border-1 rounded-xl w-48 p-4 block m-auto text-2xl mb-12 text-center"
      >
        Daily
      </Link>
      <Link
        type="button"
        href={"/games/wordscope/unlimited"}
        className="cursor-pointer border-1 rounded-xl w-48 p-4 block m-auto text-2xl text-center"
      >
        Unlimited
      </Link>
    </main>
  );
}
