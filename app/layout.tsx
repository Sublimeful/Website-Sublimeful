// These styles apply to every route in the application
import "@/app/globals.css";

export const metadata = {
  title: "Sublimeful's Website",
  description: "Homepage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://avatars.githubusercontent.com/u/42013583"
        />
      </head>
      <body className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="w-full h-full grid grid-rows-[4rem_auto] grid-cols-[16rem_auto]">
          {/* Navbar */}
          <div className="col-span-2 border-b flex flex-row items-center border-black dark:border-white">
            <a
              className="w-12 h-12 ml-2 rounded-full overflow-clip"
              href="https://github.com/Sublimeful"
            >
              <img src="https://avatars.githubusercontent.com/u/42013583" />
            </a>
            <a className="ml-3" href="https://github.com/Sublimeful">
              Sublimeful
            </a>
          </div>
          {/* Sidebar */}
          <div className="flex flex-col [&_a]:before:content-['\00a0>_'] border-r border-black dark:border-white">
            <a href="/">Homepage</a>
            <a href="/about">About me</a>
            <a href="/projects">Projects</a>
            <a href="/blog">Random stuff</a>
          </div>
          {/* Content */}
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
