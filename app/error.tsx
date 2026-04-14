"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8">We couldn't connect to Unsplash to get your photos.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition font-bold"
      >
        Try again
      </button>
    </div>
  );
}