import Link from 'next/link'
import { Button } from "@/components/ui/button";

function Error({ statusCode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center px-4 bg-background">
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
        {statusCode ? `Error ${statusCode}` : 'An Error Occurred'}
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-secondary mb-6">
        Something went wrong
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We're sorry for the inconvenience. Please try refreshing the page or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white font-medium"
        >
          Refresh Page
        </Button>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-medium">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
