"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center justify-center rounded-md bg-gray-500 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
      >
        Return Home
      </Link>
    </div>
  );
} 