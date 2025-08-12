'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import EstimatorForm from "@/components/estimator/core/EstimatorForm";
import EstimateResult from "@/components/estimator/core/EstimateResult";
import { EstimateData, FormData } from '@/lib/types';

// This is a placeholder for the estimator page
// When ready, this will import and render the EstimatorForm component

export default function EstimatePage() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check for admin access on component mount
  useEffect(() => {
    try {
      const checkAdminStatus = () => {
        return localStorage.getItem('isAdminMode') === 'true';
      };
      
      setIsAdminMode(checkAdminStatus());
      
      // Listen for changes to admin status
      const handleStorageChange = () => {
        setIsAdminMode(checkAdminStatus());
      };
      
      window.addEventListener('storage', handleStorageChange);
      setIsLoading(false);
      
      return () => window.removeEventListener('storage', handleStorageChange);
    } catch (err) {
      setError('Failed to check admin status. Please try again.');
      setIsLoading(false);
    }
  }, []);
  
  // Handler for estimate calculation
  const handleEstimateCalculated = (data: EstimateData, values: FormData) => {
    try {
      setEstimateData(data);
      setFormData(values);
      setShowResults(true);
      // Scroll to results with smooth animation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to calculate estimate. Please try again.');
    }
  };
  
  // Handler to go back to form
  const handleBackToForm = () => {
    setShowResults(false);
    setError(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="bg-primary/5 border-b">
        <div className="py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Professional Cleaning Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Generate accurate pricing for janitorial contracts and post-construction cleaning projects with our professional estimator.
          </p>
        </div>
      </div>

      <div className="py-12">
        {!isAdminMode ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-red-600">Professional Calculator Access Required</CardTitle>
              <CardDescription>
                This is the professional pricing calculator for janitorial contracts and detailed estimates. Admin access required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For reference pricing or quick estimates, use the Quote form. For detailed janitorial contract pricing and professional estimates, please use the "Admin Access" button on the Quote page to access this calculator.
              </p>
              <Button 
                onClick={() => window.location.href = '/get-quote'}
                className="w-full"
              >
                Get Reference Quote
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8">
              <CardHeader className="bg-amber-50 border-b border-amber-200">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-amber-800">Professional Pricing Calculator</CardTitle>
                    <CardDescription className="text-amber-700">
                      Generate detailed estimates for janitorial contracts and professional cleaning services.
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => {
                      localStorage.removeItem('isAdminMode');
                      window.location.href = '/get-quote';
                    }}
                  >
                    Return to Reference Quotes
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="p-6">
                {showResults && estimateData && formData ? (
                  <EstimateResult 
                    estimateData={estimateData} 
                    formData={formData} 
                    onBackToForm={handleBackToForm}
                  />
                ) : (
                  <EstimatorForm onEstimateCalculated={handleEstimateCalculated} />
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
} 