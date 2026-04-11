"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ photoId }: { photoId: string }) {
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // When the page loads, check local storage to see if this photo is already liked
  useEffect(() => {
    setMounted(true);
    const savedLikes = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    if (savedLikes.includes(photoId)) {
      setLiked(true);
    }
  }, [photoId]);

  const toggleLike = () => {
    // Get current likes from storage
    const savedLikes = JSON.parse(localStorage.getItem("likedPhotos") || "[]");
    let newLikes;

    if (liked) {
      // If already liked, remove it from the array
      newLikes = savedLikes.filter((id: string) => id !== photoId);
    } else {
      // If not liked, add it to the array
      newLikes = [...savedLikes, photoId];
    }

    // Save the new array back to local storage and update the button
    localStorage.setItem("likedPhotos", JSON.stringify(newLikes));
    setLiked(!liked);
  };

  // This prevents a visual glitch where the button flashes the wrong color on reload
  if (!mounted) return <button className="px-6 py-2 rounded-full font-bold bg-gray-200 text-gray-400">...</button>;

  return (
    <button
      onClick={toggleLike}
      className={`px-6 py-2 rounded-full font-bold transition-colors ${
        liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like this photo"}
    </button>
  );
}