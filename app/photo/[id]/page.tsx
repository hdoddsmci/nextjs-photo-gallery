import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Fetch the specific single photo from Unsplash using the ID from the URL
  const response = await fetch(
    `https://api.unsplash.com/photos/${resolvedParams.id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-red-500">Photo not found</h1>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go back home</Link>
      </div>
    );
  }

  const photo = await response.json();

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block font-medium">
        &larr; Back to Gallery
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* The large image container */}
        <div className="relative w-full h-[600px] bg-gray-100">
          <Image
            src={photo.urls.regular}
            alt={photo.alt_description || "Unsplash photo"}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        
        {/* The info and Like button area */}
        <div className="p-6 flex justify-between items-center bg-white">
          <div>
            <h1 className="text-xl font-bold mb-1 text-gray-900">
              Photo by {photo.user.name}
            </h1>
            <p className="text-gray-500 capitalize text-sm">
              {photo.alt_description || "Untitled"}
            </p>
          </div>
          
          <LikeButton photoId={resolvedParams.id} />
        </div>
      </div>
    </div>
  );
}