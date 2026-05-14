import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

// 1. Tell searchParams to expect a 'page' along with the 'query'
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query;
  
  // 2. Figure out what page we are currently on (default to 1)
  const currentPage = Number(resolvedParams?.page) || 1;

  let photos = [];

  // Make sure this matches your .env.local file perfectly!
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;

  if (query) {
    // 3. Add &page=${currentPage} to the Unsplash URL
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&page=${currentPage}&per_page=9`
    );
    const data = await response.json();
    photos = data.results; 
  } else {
    // Add the page number here too so the home page can have a "See More" button!
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${apiKey}&page=${currentPage}&per_page=9`
    );
    photos = await response.json();
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Unsplash Gallery</h1>

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo: any) => (
          <Link href={`/photo/${photo.id}`} key={photo.id}>
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl border border-gray-200">
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
      
      {photos.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No photos found for "{query}". Try another search!</p>
      )}

      {/* 4. Add the Pagination Arrows at the bottom! */}
      {photos.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-12">
          {/* Only show Previous arrow if we are on page 2 or higher */}
          {currentPage > 1 && (
            <Link 
              href={`/?${query ? `query=${query}&` : ''}page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-black font-semibold"
            >
              &larr; Previous
            </Link>
          )}

          <span className="text-gray-500">Page {currentPage}</span>

          <Link 
            href={`/?${query ? `query=${query}&` : ''}page=${currentPage + 1}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
          >
            See More &rarr;
          </Link>
        </div>
      )}
    </main>
  );
}