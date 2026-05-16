"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button 
      onClick={() => setCount(count + 1)}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-md mt-4"
    >
      Live Test Clicks: {count}
    </button>
  );
}