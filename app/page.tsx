import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar"; // <-- We import your new Search Bar here!

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  // Check if there is a search query in the URL
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query;

  let photos = [];

  if (query) {
    // If they searched for something, use the Unsplash SEARCH API
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=9`
    );
    const data = await response.json();
    photos = data.results; // The Search API hides the photos inside a "results" array
  } else {
    // If there is no search, just load the normal front-page photos like before
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=9`
    );
    photos = await response.json();
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Unsplash Gallery</h1>

      {/* Put the Search Bar right under the title */}
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo: any) => (
          <Link href={`/photo/${photo.id}`} key={photo.id}>
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity shadow-sm border border-gray-200">
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description || "Unsplash image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
        ))}
      </div>
      
      {/* Show a message if a search returns absolutely nothing */}
      {photos.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No photos found for "{query}". Try another search!</p>
      )}
    </main>
  );
}