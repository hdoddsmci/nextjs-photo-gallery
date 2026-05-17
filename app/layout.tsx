import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

// This sets the text that shows up in the browser tab at the very top of the screen.
export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "A Next.js photo gallery using the Unsplash API",
};

// The RootLayout wraps around every single page in the entire website.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        
        {/* This is our navigation bar. We made it sticky so it stays at the top when you scroll down. */}
        <nav className="bg-white border-b border-gray-200 p-5 mb-8 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* The main logo link that takes you home */}
          <Link href="/" className="flex items-center border-[3px] border-gray-800 p-1 rounded-sm font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity">
            <span className="text-gray-800 uppercase">Photo</span>
            <span className="bg-blue-600 text-white px-1 ml-1 rounded-sm uppercase">Gallery</span>
          </Link>

            {/* The right-side menu links */}
            <div className="flex gap-8 items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/likes" className="hover:text-gray-900 transition-colors">My Likes</Link>
            </div>

          </div>
        </nav>
        
        {/* This "children" variable is the magic part. Next.js swaps out the page content right here while keeping the navigation bar locked in place above it. */}
        <main className="max-w-6xl mx-auto px-4">
          {children}
        </main>
        
      </body>
    </html>
  );
}