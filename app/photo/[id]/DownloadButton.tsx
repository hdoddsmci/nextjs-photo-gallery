"use client";

import { useState } from "react";

export default function DownloadButton({ url, photoId }: { url: string, photoId: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the image from the Unsplash URL
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a temporary link to the image file in the browser
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      
      // Name the downloaded file using the photo's ID
      link.download = `unsplash-photo-${photoId}.jpg`;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up the temporary link
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`px-6 py-2 rounded-md font-semibold transition-colors flex items-center gap-2 ${
        isDownloading 
          ? "bg-gray-400 cursor-not-allowed text-white" 
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {/* A little download icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      {isDownloading ? "Downloading..." : "Download"}
    </button>
  );
}