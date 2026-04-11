"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Stops the page from doing a hard reload
    if (query.trim()) {
      // If they typed something, update the URL with their search!
      router.push(`/?query=${query}`);
    } else {
      // If they cleared the box, go back to the normal home page
      router.push(`/`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex justify-center">
      <input
        type="text"
        placeholder="Search for trees, oceans, cats..."
        value={query}
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