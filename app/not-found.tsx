import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-8">We couldn't find the photo or page you were looking for.</p>
      <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-bold">
        Return Home
      </Link>
    </div>
  );
}