import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "A Next.js photo gallery using the Unsplash API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        {/* Added 'sticky top-0 z-50' to the nav classes below! */}
        <nav className="bg-white border-b border-gray-200 p-5 mb-8 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center border-[3px] border-gray-800 p-1 rounded-sm font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity">
            <span className="text-gray-800 uppercase">Photo</span>
            <span className="bg-blue-600 text-white px-1 ml-1 rounded-sm uppercase">Gallery</span>
          </Link>

            {/* The Uppercase Navigation Links */}
            <div className="flex gap-8 items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/likes" className="hover:text-gray-900 transition-colors">
                My Likes
              </Link>
            </div>

          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}