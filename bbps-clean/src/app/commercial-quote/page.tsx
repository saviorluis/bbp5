"use client";

import { useState } from 'react';
import { CommercialEstimator } from '@/components/estimator/CommercialEstimator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CommercialQuotePage() {
  const [estimate, setEstimate] = useState<any>(null);

  const handleEstimateCalculated = (data: any) => {
    setEstimate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Commercial Cleaning Quote</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Get Your Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <CommercialEstimator onEstimateCalculated={handleEstimateCalculated} />
              </CardContent>
            </Card>
          </div>
          
          {estimate && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Total Cost</h3>
                      <p className="text-2xl font-bold">${estimate.totalCost.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Time Estimate</h3>
                      <p>{estimate.timeEstimate}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Service Details</h3>
                      <ul className="space-y-2">
                        <li>Project Type: {estimate.projectType}</li>
                        <li>Cleaning Type: {estimate.cleaningType}</li>
                        <li>Square Footage: {estimate.squareFootage} sq ft</li>
                        {estimate.details.vctFlooring && <li>Includes VCT Flooring</li>}
                        {estimate.details.windowCount > 0 && (
                          <li>Regular Windows: {estimate.details.windowCount}</li>
                        )}
                        {estimate.details.largeWindowCount > 0 && (
                          <li>Large Windows: {estimate.details.largeWindowCount}</li>
                        )}
                        <li>Urgency: {estimate.details.urgency}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 