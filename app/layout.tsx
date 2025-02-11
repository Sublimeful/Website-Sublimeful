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
          <div className="col-span-2 border-b border-black dark:border-white" />
          {/* Sidebar */}
          <div className="border-r border-black dark:border-white" />
          {/* Content */}
          {children}
        </div>
      </body>
    </html>
  );
}
