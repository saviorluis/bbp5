"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ResidentialEstimateFormData {
  homeType: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  cleaningType: string;
  extras: {
    carpet: boolean;
    deepCleanKitchen: boolean;
    deepCleanBathrooms: boolean;
    windows: boolean;
    appliances: boolean;
  };
  urgency: string;
}

interface ResidentialEstimatorProps {
  onEstimateCalculated: (data: any) => void;
}

const ResidentialEstimator = ({ onEstimateCalculated }: ResidentialEstimatorProps) => {
  const [estimateData, setEstimateData] = useState<any>(null);
  
  const { handleSubmit, control, register, formState: { errors } } = useForm<ResidentialEstimateFormData>({
    defaultValues: {
      homeType: 'house',
      squareFootage: 1500,
      bedrooms: 3,
      bathrooms: 2,
      cleaningType: 'standard',
      extras: {
        carpet: false,
        deepCleanKitchen: false,
        deepCleanBathrooms: false,
        windows: false,
        appliances: false,
      },
      urgency: 'standard'
    }
  });

  const calculateEstimate = (data: ResidentialEstimateFormData) => {
    // Base rates by home type (dollars per sq ft)
    const baseRates = {
      house: 0.16,
      apartment: 0.14,
      condo: 0.15,
      townhouse: 0.15,
      studio: 0.18,
    };

    // Multipliers by cleaning type
    const cleaningMultipliers = {
      standard: 1.0,
      deep: 1.6,
      moveIn: 1.8,
      moveOut: 1.8,
    };

    // Calculate base cost
    const baseRate = baseRates[data.homeType as keyof typeof baseRates] || 0.16;
    let totalCost = data.squareFootage * baseRate;
    
    // Apply cleaning type multiplier
    const multiplier = cleaningMultipliers[data.cleaningType as keyof typeof cleaningMultipliers] || 1.0;
    totalCost *= multiplier;
    
    // Add bedroom and bathroom costs
    totalCost += (data.bedrooms * 10); // $10 per bedroom
    totalCost += (data.bathrooms * 15); // $15 per bathroom
    
    // Add extras
    const extras = data.extras;
    if (extras.carpet) {
      totalCost += (data.squareFootage * 0.1); // $0.10 per sq ft for carpet cleaning
    }
    
    if (extras.deepCleanKitchen) {
      totalCost += 50; // $50 for deep clean kitchen
    }
    
    if (extras.deepCleanBathrooms) {
      totalCost += (data.bathrooms * 25); // $25 per bathroom for deep clean
    }
    
    if (extras.windows) {
      // Estimate window count based on square footage and add cost
      const estimatedWindows = Math.ceil(data.squareFootage / 250);
      totalCost += (estimatedWindows * 6); // $6 per window
    }
    
    if (extras.appliances) {
      totalCost += 60; // $60 for appliance cleaning
    }
    
    // Apply urgency multiplier
    if (data.urgency === 'urgent') {
      totalCost *= 1.25; // 25% premium for urgent service
    } else if (data.urgency === 'immediate') {
      totalCost *= 1.5; // 50% premium for immediate service
    }
    
    // Calculate time estimate
    const baseHours = data.squareFootage / 1000; // Base time: 1 hour per 1000 sq ft
    let totalHours = baseHours * multiplier; // Adjust for cleaning type
    
    // Add time for extras
    if (extras.carpet) totalHours += (data.squareFootage / 2000);
    if (extras.deepCleanKitchen) totalHours += 1;
    if (extras.deepCleanBathrooms) totalHours += (data.bathrooms * 0.5);
    if (extras.windows) totalHours += (Math.ceil(data.squareFootage / 250) * 0.1);
    if (extras.appliances) totalHours += 1;
    
    // Format the time estimate
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    const timeEstimate = `${hours}h ${minutes}m`;
    
    // Round the total cost to 2 decimal places
    totalCost = Math.round(totalCost * 100) / 100;
    
    const result = {
      totalCost,
      squareFootage: data.squareFootage,
      timeEstimate,
      serviceType: 'residential',
      cleaningType: data.cleaningType,
      homeType: data.homeType,
      details: {
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        extras: data.extras,
        urgency: data.urgency,
        baseRate,
        multiplier,
      }
    };
    
    setEstimateData(result);
    onEstimateCalculated(result);
    
    return result;
  };

  return (
    <div className="residential-estimator">
      <form onSubmit={handleSubmit(calculateEstimate)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="homeType">Home Type</Label>
            <Controller
              name="homeType"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select home type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
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
                min: 300,
                valueAsNumber: true
              })}
            />
            {errors.squareFootage && (
              <p className="text-sm text-red-500">
                Please enter valid square footage (minimum 300)
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <SelectItem value="standard">Standard Cleaning</SelectItem>
                    <SelectItem value="deep">Deep Cleaning</SelectItem>
                    <SelectItem value="moveIn">Move-In Cleaning</SelectItem>
                    <SelectItem value="moveOut">Move-Out Cleaning</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              {...register('bedrooms', { 
                required: true,
                min: 0,
                valueAsNumber: true
              })}
            />
            {errors.bedrooms && (
              <p className="text-sm text-red-500">
                Please enter a valid number
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              {...register('bathrooms', { 
                required: true,
                min: 0,
                valueAsNumber: true
              })}
            />
            {errors.bathrooms && (
              <p className="text-sm text-red-500">
                Please enter a valid number
              </p>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Additional Services</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                id="carpet"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('extras.carpet')}
              />
              <label htmlFor="carpet" className="text-sm text-gray-700">
                Carpet Cleaning
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="deepCleanKitchen"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('extras.deepCleanKitchen')}
              />
              <label htmlFor="deepCleanKitchen" className="text-sm text-gray-700">
                Deep Clean Kitchen
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="deepCleanBathrooms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('extras.deepCleanBathrooms')}
              />
              <label htmlFor="deepCleanBathrooms" className="text-sm text-gray-700">
                Deep Clean Bathrooms
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="windows"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('extras.windows')}
              />
              <label htmlFor="windows" className="text-sm text-gray-700">
                Interior Window Cleaning
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="appliances"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('extras.appliances')}
              />
              <label htmlFor="appliances" className="text-sm text-gray-700">
                Appliance Cleaning (Fridge, Oven)
              </label>
            </div>
          </div>
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
            
            <p className="text-sm font-medium">Home Type:</p>
            <p className="text-sm">{estimateData.homeType.charAt(0).toUpperCase() + estimateData.homeType.slice(1)}</p>
            
            <p className="text-sm font-medium">Service Type:</p>
            <p className="text-sm">{estimateData.cleaningType === 'standard' ? 'Standard Cleaning' : 
                          estimateData.cleaningType === 'deep' ? 'Deep Cleaning' :
                          estimateData.cleaningType === 'moveIn' ? 'Move-In Cleaning' :
                          'Move-Out Cleaning'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentialEstimator; 