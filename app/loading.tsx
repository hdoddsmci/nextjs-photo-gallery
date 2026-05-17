// Next.js automatically shows this file while server data is taking a long time to fetch.
export default function Loading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* This creates 9 empty grey boxes that pulse on the screen to show the user the site is working and loading data. */}
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
        ))}
        
      </div>
    </div>
  );
}