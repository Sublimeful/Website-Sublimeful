// These styles apply to every route in the application
import "@/app/globals.css";

import ThemeSlider from "./ui/ThemeSlider";
import Picker from "./ui/Picker";
import PickerItem from "./ui/PickerItem";
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
      <body className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="w-full h-full grid grid-rows-[4rem_auto]">
          {/* Navbar */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 ml-4 items-center">
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
            <div className="flex flex-row gap-10 mr-10">
              <a href="/">Homepage</a>
              <a href="/about">About me</a>
              <a href="/projects">Projects</a>
              <a href="/blog">Random stuff</a>
            </div>
          </div>
          {/* Content */}
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
