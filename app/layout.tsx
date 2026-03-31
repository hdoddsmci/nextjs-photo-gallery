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
            <Link href="/" className="text-xl font-bold tracking-tight">
              📸 Photo Gallery
            </Link>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}