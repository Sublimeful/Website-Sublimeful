// These styles apply to every route in the application
import "@/app/globals.css";

import Link from "next/link";
import ThemeSlider from "./ui/ThemeSlider";
import CursorPicker from "./ui/CursorPicker";
import Cursor from "./ui/Cursor";

export const metadata = {
  title: "Sublimeful's Website",
  description: "Homepage",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/42013583",
    shortcut: "https://avatars.githubusercontent.com/u/42013583",
    apple: "https://avatars.githubusercontent.com/u/42013583",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://avatars.githubusercontent.com/u/42013583",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              localStorage.setItem(
                "theme",
                localStorage.getItem("theme") ||
                  (window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"),
              );
              document.documentElement.classList.add(localStorage.getItem("theme"));
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        {/* Navbar */}
        <div className="flex flex-row flex-wrap gap-x-10 gap-y-4 p-4 items-center">
          <div className="flex flex-row gap-x-4 items-center">
            <Link
              className="w-10 h-10 rounded-full overflow-clip"
              href="https://github.com/Sublimeful"
            >
              <img
                src="https://avatars.githubusercontent.com/u/42013583"
                alt="Github Profile Picture"
              />
            </Link>
            <Link href="https://github.com/Sublimeful">Sublimeful</Link>
          </div>
          {/* Light/Dark mode toggle */}
          <ThemeSlider />
          {/* Cursor picker */}
          <CursorPicker />
          {/* Cursor */}
          <Cursor />
          <Link href="/">Homepage</Link>
          <Link href="/about">About me</Link>
          <Link href="/projects">Projects</Link>
        </div>
        {/* Content */}
        {children}
      </body>
    </html>
  );
}
