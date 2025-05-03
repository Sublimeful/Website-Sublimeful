// These styles apply to every route in the application
import "@/app/globals.css";

import ThemeSlider from "./ui/ThemeSlider";
import CursorPicker from "./ui/CursorPicker";
import Cursor from "./ui/Cursor";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <div className="flex flex-row flex-wrap gap-x-10 p-4 items-center">
          <div className="flex flex-row gap-x-4 items-center">
            <a
              className="w-10 h-10 rounded-full overflow-clip"
              href="https://github.com/Sublimeful"
            >
              <img src="https://avatars.githubusercontent.com/u/42013583" />
            </a>
            <a href="https://github.com/Sublimeful">Sublimeful</a>
          </div>
          {/* Light/Dark mode toggle */}
          <ThemeSlider />
          {/* Cursor picker */}
          <CursorPicker />
          {/* Cursor */}
          <Cursor />
          <a href="/">Homepage</a>
          <a href="/about">About me</a>
          <a href="/projects">Projects</a>
        </div>
        {/* Content */}
        {children}
      </body>
    </html>
  );
}
