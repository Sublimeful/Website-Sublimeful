import Image from "next/image";
import Link from "next/link";

import Carousel from "./ui/Carousel";

export default function Page() {
  return (
    <main className="border-t-1 pt-4">
      <Link
        className="w-10 h-10 rounded-full overflow-clip"
        href="https://www.linkedin.com/in/jqiangwu"
      >
        <Image
          width={350}
          height={350}
          src="/linkedin-profile-picture.jpg"
          alt="LinkedIn Profile Picture"
          className="m-auto rounded-full border-6 border-black dark:border-white hover:border-green-400 cursor-pointer transition-all ease-out duration-1000 hover:shadow-[0_0_30px_#05df72] scale-90 hover:scale-100"
        />
      </Link>
      <p className="text-4xl text-center mb-32">
        Hello! My name is{"  "}
        <span className="text-red-500 font-bold">Jian Qiang Wu</span>
        <br />
        Here, you can check out what I have worked on.
      </p>
      <section className="bg-gray-900 dark:bg-gray-300 py-8">
        <h1 className="text-4xl text-center text-white dark:text-black">
          Featured Works
        </h1>
        <br />
        <Carousel className="m-auto" autoScroll>
          {Array(5).fill(null).map((_, i) => (
            <Link href="/games/wordscope" key={i}>
              <Image
                width={400}
                height={-1}
                src="/wordscope/logo.svg"
                alt="Wordscope"
                className="bg-white h-48 min-w-[400px]"
              />
            </Link>
          ))}
        </Carousel>
      </section>
    </main>
  );
}
