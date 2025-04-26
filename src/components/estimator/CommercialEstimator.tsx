"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CommercialEstimateFormData {
  projectType: string;
  squareFootage: number;
  cleaningType: string;
  vctFlooring: boolean;
  windowCount: number;
  largeWindowCount: number;
  urgency: string;
}

interface CommercialEstimatorProps {
  onEstimateCalculated: (data: any) => void;
}

const CommercialEstimator = ({ onEstimateCalculated }: CommercialEstimatorProps) => {
  const [estimateData, setEstimateData] = useState<any>(null);
  
  const { handleSubmit, control, register, formState: { errors } } = useForm<CommercialEstimateFormData>({
    defaultValues: {
      projectType: 'office',
      squareFootage: 2000,
      cleaningType: 'regular',
      vctFlooring: false,
      windowCount: 0,
      largeWindowCount: 0,
      urgency: 'standard'
    }
  });

  const calculateEstimate = (data: CommercialEstimateFormData) => {
    // Base rates by project type (dollars per sq ft)
    const baseRates = {
      office: 0.12,
      medical: 0.18,
      restaurant: 0.16,
      retail: 0.14,
      industrial: 0.10,
    };

    // Multipliers by cleaning type
    const cleaningMultipliers = {
      regular: 1.0,
      deep: 1.5,
      post_construction: 2.0,
      final: 1.75,
    };

    // Calculate base cost
    const baseRate = baseRates[data.projectType as keyof typeof baseRates] || 0.12;
    let totalCost = data.squareFootage * baseRate;
    
    // Apply cleaning type multiplier
    const multiplier = cleaningMultipliers[data.cleaningType as keyof typeof cleaningMultipliers] || 1.0;
    totalCost *= multiplier;
    
    // Add VCT flooring costs if applicable
    if (data.vctFlooring) {
      totalCost += data.squareFootage * 0.05; // Additional $0.05 per sq ft for VCT
    }
    
    // Add window cleaning costs
    totalCost += data.windowCount * 5; // $5 per regular window
    totalCost += data.largeWindowCount * 15; // $15 per large window
    
    // Apply urgency multiplier
    if (data.urgency === 'urgent') {
      totalCost *= 1.25; // 25% premium for urgent service
    } else if (data.urgency === 'immediate') {
      totalCost *= 1.5; // 50% premium for immediate service
    }
    
    // Calculate recommended staff and time
    const sqFtPerHourPerPerson = 750; // One person can clean approx 750 sq ft per hour
    const totalHours = data.squareFootage / sqFtPerHourPerPerson;
    
    // Determine optimal team size (min 2 people, max 8)
    let teamSize = Math.max(2, Math.min(8, Math.ceil(totalHours / 6)));
    
    // Calculate time with team
    const hoursWithTeam = totalHours / teamSize;
    
    // Format the time estimate
    const hours = Math.floor(hoursWithTeam);
    const minutes = Math.round((hoursWithTeam - hours) * 60);
    const timeEstimate = `${hours}h ${minutes}m with ${teamSize} staff`;
    
    // Round the total cost to 2 decimal places
    totalCost = Math.round(totalCost * 100) / 100;
    
    const result = {
      totalCost,
      squareFootage: data.squareFootage,
      timeEstimate,
      serviceType: 'commercial',
      cleaningType: data.cleaningType,
      projectType: data.projectType,
      details: {
        vctFlooring: data.vctFlooring,
        windowCount: data.windowCount,
        largeWindowCount: data.largeWindowCount,
        urgency: data.urgency,
        baseRate,
        multiplier,
        teamSize,
      }
    };
    
    setEstimateData(result);
    onEstimateCalculated(result);
    
    return result;
  };

  return (
    <div className="commercial-estimator">
      <form onSubmit={handleSubmit(calculateEstimate)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="medical">Medical Facility</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="retail">Retail Space</SelectItem>
                    <SelectItem value="industrial">Industrial Facility</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="squareFootage">Square Footage</Label>
            <Input
              id="squareFootage"
              type="number"
              {...register('squareFootage', { 
                required: true,
                min: 500,
                valueAsNumber: true
              })}
            />
            {errors.squareFootage && (
              <p className="text-sm text-red-500">
                Please enter valid square footage (minimum 500)
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cleaningType">Cleaning Type</Label>
            <Controller
              name="cleaningType"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cleaning type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular Cleaning</SelectItem>
                    <SelectItem value="deep">Deep Cleaning</SelectItem>
                    <SelectItem value="post_construction">Post-Construction</SelectItem>
                    <SelectItem value="final">Final Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="urgency">Service Urgency</Label>
            <Controller
              name="urgency"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (7+ days)</SelectItem>
                    <SelectItem value="urgent">Urgent (2-6 days)</SelectItem>
                    <SelectItem value="immediate">Immediate (24-48 hours)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="vctFlooring">VCT Flooring</Label>
            <div className="flex items-center space-x-2">
              <input
                id="vctFlooring"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('vctFlooring')}
              />
              <label htmlFor="vctFlooring" className="text-sm text-gray-700">
                Includes VCT flooring
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="windowCount">Regular Windows</Label>
            <Input
              id="windowCount"
              type="number"
              {...register('windowCount', { 
                valueAsNumber: true,
                min: 0
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="largeWindowCount">Large Windows</Label>
            <Input
              id="largeWindowCount"
              type="number"
              {...register('largeWindowCount', { 
                valueAsNumber: true,
                min: 0
              })}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full">
            Calculate Estimate
          </Button>
        </div>
      </form>
      
      {estimateData && (
        <div className="mt-6 p-4 bg-primary/10 rounded-md">
          <h3 className="text-lg font-medium mb-2">Estimate Results</h3>
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-sm font-medium">Total Estimated Cost:</p>
            <p className="text-sm font-bold">${estimateData.totalCost.toFixed(2)}</p>
            
            <p className="text-sm font-medium">Square Footage:</p>
            <p className="text-sm">{estimateData.squareFootage} sq ft</p>
            
            <p className="text-sm font-medium">Time Estimate:</p>
            <p className="text-sm">{estimateData.timeEstimate}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommercialEstimator; 