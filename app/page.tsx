import Image from "next/image";
import Link from "next/link";

// This is a Server Component, meaning it fetches data securely on the server
export default async function Home() {
  // Fetch 9 photos from Unsplash
  const response = await fetch(
    `https://api.unsplash.com/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=9`
  );
  
  if (!response.ok) {
    return <div className="text-red-500">Failed to load photos from Unsplash. Check your API key!</div>;
  }

  const photos = await response.json();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Photos</h1>
      
      {/* Tailwind CSS Grid for the photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo: any) => (
          <Link href={`/photo/${photo.id}`} key={photo.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || "Unsplash photo"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}