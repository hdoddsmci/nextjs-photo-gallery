"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LikesPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedPhotos = async () => {
      // 1. Get the saved IDs from local storage
      const savedLikes = JSON.parse(localStorage.getItem("likedPhotos") || "[]");

      if (savedLikes.length === 0) {
        setLoading(false);
        return;
      }

      // 2. Fetch the data for every liked photo from Unsplash
      const promises = savedLikes.map((id: string) =>
        fetch(`https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
          .then((res) => res.json())
      );

      const fetchedPhotos = await Promise.all(promises);
      setPhotos(fetchedPhotos);
      setLoading(false);
    };

    fetchLikedPhotos();
  }, []);

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Liked Photos</h1>

      {loading ? (
        <p className="text-center text-gray-500 font-medium mt-10">Loading your favorites...</p>
      ) : photos.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">You haven't liked any photos yet!</p>
          <Link href="/" className="text-blue-500 font-bold hover:underline">
            Go find some awesome photos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo: any) => (
            <Link href={`/photo/${photo.id}`} key={photo.id}>
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity shadow-sm border border-gray-200">
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description || "Liked photo"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}