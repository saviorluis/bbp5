import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  // Try redirecting to home in case of incorrect trailing slash issues
  useEffect(() => {
    // Check if we're in a 404 situation for a path that should have a trailing slash
    const path = window.location.pathname;
    if (path && !path.endsWith('/') && path !== '/404') {
      router.replace(path + '/');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center px-4 bg-background">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button 
          onClick={() => router.back()}
          size="lg" 
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 font-medium"
        >
          Go Back
        </Button>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-medium">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
