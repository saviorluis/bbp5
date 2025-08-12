import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Construction Cleaning Calculator | BBPS',
  description: 'Calculate accurate estimates for your post-construction cleaning projects with our professional estimator tool.',
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-primary">Home</a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-900">Estimator</span>
            </li>
          </ol>
        </nav>
        
        {children}
      </div>
    </div>
  );
} 