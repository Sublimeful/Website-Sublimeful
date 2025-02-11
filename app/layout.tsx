// These styles apply to every route in the application
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Welcome to my website!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="w-full h-full grid grid-rows-[4rem_auto] grid-cols-[24rem_auto]">
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
          <div className="border-r border-black dark:border-white" />
          {/* Content */}
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
