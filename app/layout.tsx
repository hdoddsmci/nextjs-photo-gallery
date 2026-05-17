// We bring in the Next.js tool for SEO, our global CSS styles, and the Link component for fast navigation.
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Oswald } from 'next/font/google';

const swald = Oswald({subsets: ['latin']});

// This block automatically builds our SEO. Next.js takes this title and description and injects it into the invisible HTML head, so if someone shares our site on Discord or Google, it looks perfect.
export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "A Next.js photo gallery using the Unsplash API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout file acts as the master shell for the entire application.
  return (
    <html lang="en">
      <body className={'bg-white text-gray-900 min-h-screen ${oswald.className}'}>
        
        {/* By putting the navigation bar up here, it stays perfectly glued to the top of the screen no matter what page the user goes to. */}
        <nav className="bg-white border-b border-gray-200 p-5 mb-8 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center border-[3px] border-gray-800 p-1 rounded-sm font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity">
              <span className="text-gray-800 uppercase">Photo</span>
              <span className="bg-blue-600 text-white px-1 ml-1 rounded-sm uppercase">Gallery</span>
            </Link>

            {/* These are our main navigation links. We use the Next JS Link tag instead of a normal HTML link so the page transitions instantly without doing a slow, hard refresh. */}
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
        
        {/* Whenever someone clicks around the website, Next.js takes that page's code and injects it exactly into this spot. */}
        <main className="max-w-6xl mx-auto px-4">
          {children}
        </main>
        
      </body>
    </html>
  );
}