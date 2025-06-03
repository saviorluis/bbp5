'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import EstimatorForm from "@/components/estimator/EstimatorForm";
import EstimateResult from "@/components/estimator/EstimateResult";
import { EstimateData, FormData } from '@/lib/types';

// This is a placeholder for the estimator page
// When ready, this will import and render the EstimatorForm component

export default function EstimatePage() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Check for admin access on component mount
  useEffect(() => {
    // In production, use a proper auth system instead of localStorage
    const checkAdminStatus = () => {
      // This is just a simple check for the demo
      // No sensitive data should be stored in localStorage in production
      return localStorage.getItem('isAdminMode') === 'true';
    };
    
    setIsAdminMode(checkAdminStatus());
    
    // Listen for changes to admin status
    const handleStorageChange = () => {
      setIsAdminMode(checkAdminStatus());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Handler for estimate calculation
  const handleEstimateCalculated = (data: EstimateData, values: FormData) => {
    setEstimateData(data);
    setFormData(values);
    setShowResults(true);
    // Scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handler to go back to form
  const handleBackToForm = () => {
    setShowResults(false);
  };

  return (
    <>
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Cleaning Service Estimator</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Create your custom cleaning estimate with our interactive estimator tool.
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          {!isAdminMode ? (
            <div className="text-center p-12">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Access Restricted</h2>
              <p className="mb-6">You need admin access to use the estimator tool.</p>
              <p className="text-sm text-gray-500">
                Please use the "Admin Access" button on the Quote page to log in.
              </p>
              <div className="mt-8">
                <Button 
                  onClick={() => window.location.href = '/get-quote'}
                >
                  Go to Quote Page
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 border border-amber-200 p-4 mb-8 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-amber-800">Admin Estimator Tool</h3>
                    <p className="text-sm text-amber-700">You have access to the full estimator functionality.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => {
                      localStorage.removeItem('isAdminMode');
                      window.location.href = '/get-quote';
                    }}
                  >
                    Return to Quote Form
                  </Button>
                </div>
              </div>

              {showResults && estimateData && formData ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <EstimateResult 
                    estimateData={estimateData} 
                    formData={formData} 
                    onBackToForm={handleBackToForm}
                  />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <EstimatorForm onEstimateCalculated={handleEstimateCalculated} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
} 