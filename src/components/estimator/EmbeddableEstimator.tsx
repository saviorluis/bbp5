"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommercialEstimator from './CommercialEstimator';
import ResidentialEstimator from './ResidentialEstimator';

interface EstimateData {
  totalCost: number;
  squareFootage?: number;
  timeEstimate?: string;
  serviceType: string;
  cleaningType?: string;
  projectType?: string;
  details?: Record<string, any>;
}

interface EmbeddableEstimatorProps {
  initialTab?: 'commercial' | 'residential';
  showTitle?: boolean;
  showSyncStatus?: boolean;
  containerClassName?: string;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  onEstimateCalculated?: (data: EstimateData) => void;
}

const EmbeddableEstimator = ({
  initialTab = 'commercial',
  showTitle = true,
  showSyncStatus = false,
  containerClassName = '',
  theme = {
    primary: 'blue',
    secondary: 'gray',
    accent: 'white',
    background: 'white',
  },
  onEstimateCalculated,
}: EmbeddableEstimatorProps) => {
  const [activeTab, setActiveTab] = useState<'commercial' | 'residential'>(initialTab);
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'commercial' | 'residential');
    setEstimateData(null);
  };

  // Handle estimate calculations from child components
  const handleEstimateCalculated = (data: EstimateData) => {
    setEstimateData(data);
    if (onEstimateCalculated) {
      onEstimateCalculated(data);
    }
  };

  return (
    <div className={`estimator-container ${containerClassName}`}>
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Calculate Your Cleaning Estimate</h2>
          <p className="text-gray-600 mt-2">
            Get an instant estimate for your cleaning needs
          </p>
        </div>
      )}

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="commercial">Commercial Cleaning</TabsTrigger>
          <TabsTrigger value="residential">Residential Cleaning</TabsTrigger>
        </TabsList>

        <TabsContent value="commercial">
          <CommercialEstimator onEstimateCalculated={handleEstimateCalculated} />
        </TabsContent>

        <TabsContent value="residential">
          <ResidentialEstimator onEstimateCalculated={handleEstimateCalculated} />
        </TabsContent>
      </Tabs>

      {showSyncStatus && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          <span>Using latest calculation parameters (v1.0.0)</span>
        </div>
      )}
    </div>
  );
};

export default EmbeddableEstimator; 