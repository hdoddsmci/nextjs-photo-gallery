"use client"; // This tells Next.js this component runs in the browser so it can handle user typing and clicking.

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  // We use state to remember exactly what the user is currently typing in the box.
  const [query, setQuery] = useState("");
  // The router lets us change the web address without refreshing the whole page.
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    // This stops the browser from doing a clunky full-page reload when you hit enter.
    e.preventDefault(); 
    
    if (query.trim()) {
      // If they typed a word, we push that word into the URL bar as a search parameter.
      router.push(`/?query=${query}`);
    } else {
      // If the box is empty and they hit search, we just send them back to the normal home page.
      router.push(`/`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex justify-center">
      <input
        type="text"
        placeholder="Search for trees, oceans, cats..."
        value={query}
        // Every time a letter is typed, we update our saved state instantly.
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-l-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button 
        type="submit" 
        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-r-md hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
}