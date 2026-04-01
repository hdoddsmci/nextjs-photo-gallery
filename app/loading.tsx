export default function Loading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shows 9 pulsing grey boxes while photos load */}
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}