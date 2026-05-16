// First, we bring in the tools and components we need for this page, like our SearchBar and Next JS's special Image and Link tags.
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) {
  // 1. We grab the search word and the page number right out of the URL.
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query;
  const currentPage = Number(resolvedParams?.page) || 1; 

  let photos = [];
  
  // 2. Next, we load our Unsplash API key here on the server so it stays completely hidden from the browser.
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY;

  // 3. Then we fetch the data. If they typed a search word, we ask the Unsplash search API for those specific photos. If not, we just load the default home page gallery.
  if (query) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&page=${currentPage}&per_page=9`
    );
    const data = await response.json();
    photos = data.results; 
  } else {
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${apiKey}&page=${currentPage}&per_page=9`
    );
    photos = await response.json();
  }

  // 4. Now we actually draw the page layout.
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Unsplash Gallery</h1>

      {/* This is our interactive client component that handles the user typing */}
      <SearchBar />

      {/* 5. For the photo grid, we map over the data we just fetched and render a Next JS Image component for every single photo. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
      
      {/* 6. If they search for something weird and no photos come back, we show a friendly 'No photos found' message instead of breaking the app. */}
      {photos.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No photos found for "{query}". Try another search!</p>
      )}

      {/* 7. Finally, these navigation buttons just change the URL page number, which triggers Next JS to fetch the next batch of images automatically. */}
      {photos.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-12">
          
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