"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)} className="p-4 bg-blue-500 text-white rounded">
      Clicks: {count}
    </button>
  );
}