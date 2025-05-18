"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Oops!</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-6">
        Something went wrong
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We're sorry for the inconvenience. Please try refreshing the page or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Refresh Page
        </button>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-gray-500 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 