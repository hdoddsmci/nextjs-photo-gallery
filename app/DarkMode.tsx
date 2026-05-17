'use client';
import { useState } from 'react';

export default function DarkMode() {
  const [dark, setDark] = useState(false);

  return (
    <button 
      onClick={() => setDark(!dark)} 
      className={dark ? "bg-black text-white p-5" : "bg-white text-black p-5 border"}
    >
      Toggle
    </button>
  );
}
