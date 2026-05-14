"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="text-blue-500 hover:underline mb-4 inline-block font-medium bg-transparent border-none p-0 cursor-pointer text-left"
    >
      &larr; Back to Gallery
    </button>
  );
}