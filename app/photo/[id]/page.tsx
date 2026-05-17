import DownloadButton from "./DownloadButton";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import BackButton from "./BackButton";

// This page uses dynamic routing. The URL will have a unique photo ID at the end of it.
export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  
  // Next.js 15 requires us to await the parameters from the URL before we can use them.
  const resolvedParams = await params;
  
  // We use the ID from the URL to ask Unsplash for one specific high-quality photo.
  const response = await fetch(
    `https://api.unsplash.com/photos/${resolvedParams.id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  // If Unsplash says the photo doesn't exist anymore, we show an error message instead of breaking the page.
  if (!response.ok) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-red-500">Photo not found</h1>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go back home</Link>
      </div>
    );
  }

  // We convert the Unsplash data into JSON so we can read it.
  const photo = await response.json();

  return (
    <div className="max-w-3xl mx-auto pb-10">
      
      {/* This component remembers where the user came from so they can click back easily. */}
      <BackButton />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="relative w-full h-[600px] bg-gray-100">
          
          {/* We use the Next.js Image component here because it automatically optimizes the massive Unsplash photo so the site loads faster. */}
          <Image
            src={photo.urls.regular}
            alt={photo.alt_description || "Unsplash photo"}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        
        <div className="p-6 flex justify-between items-center bg-white">
          <div>
            <h1 className="text-xl font-bold mb-1 text-gray-900">
              Photo by {photo.user.name}
            </h1>
            <p className="text-gray-500 capitalize text-sm">
              {photo.alt_description || "Untitled"}
            </p>
          </div>
          
          {/* We load our interactive client components here for liking and downloading. */}
          <div className="flex gap-4 items-center">
            <LikeButton photoId={resolvedParams.id} />
            <DownloadButton url={photo.urls.full} photoId={photo.id} />
          </div>
          
        </div>
      </div>
    </div>
  );
}