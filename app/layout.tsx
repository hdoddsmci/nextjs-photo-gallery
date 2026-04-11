import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Photo Gallery",
  description: "Assessment 2 Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white shadow-md p-4 mb-8">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            
            {/* Left side: Your Logo */}
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
              Photo Gallery
            </Link>

            {/* Right side: Your Navigation Links */}
            <div className="flex gap-6 items-center">
              <Link href="/" className="font-semibold text-gray-600 hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link href="/likes" className="font-semibold text-gray-600 hover:text-blue-500 transition-colors">
                My Likes
              </Link>
            </div>

          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}