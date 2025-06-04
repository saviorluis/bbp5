"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface EstimateDetails {
  vctFlooring: boolean;
  windowCount: number;
  largeWindowCount: number;
  urgency: string;
}

interface EstimateResult {
  totalCost: number;
  timeEstimate: string;
  projectType: string;
  cleaningType: string;
  squareFootage: string;
  details: EstimateDetails;
}

interface CommercialEstimatorProps {
  onEstimateCalculated: (estimate: EstimateResult) => void;
}

interface FormData {
  projectType: string;
  cleaningType: string;
  squareFootage: string;
  vctFlooring: boolean;
  windowCount: string;
  largeWindowCount: string;
  urgency: string;
}

export function CommercialEstimator({ onEstimateCalculated }: CommercialEstimatorProps) {
  const [formData, setFormData] = useState<FormData>({
    projectType: 'office',
    cleaningType: 'regular',
    squareFootage: '',
    vctFlooring: false,
    windowCount: '0',
    largeWindowCount: '0',
    urgency: 'standard',
  });

  const calculateEstimate = () => {
    // Base rate per square foot
    let ratePerSqFt = 0.15; // Standard rate
    
    // Adjust rate based on project type
    switch (formData.projectType) {
      case 'office':
        ratePerSqFt *= 1;
        break;
      case 'retail':
        ratePerSqFt *= 1.2;
        break;
      case 'industrial':
        ratePerSqFt *= 1.5;
        break;
      case 'medical':
        ratePerSqFt *= 1.8;
        break;
    }

    // Adjust rate based on cleaning type
    if (formData.cleaningType === 'deep') {
      ratePerSqFt *= 1.5;
    }

    // Calculate base cost
    let totalCost = Number(formData.squareFootage) * ratePerSqFt;

    // Add cost for VCT flooring
    if (formData.vctFlooring) {
      totalCost += Number(formData.squareFootage) * 0.05;
    }

    // Add cost for windows
    totalCost += Number(formData.windowCount) * 5;
    totalCost += Number(formData.largeWindowCount) * 10;

    // Urgency multiplier
    switch (formData.urgency) {
      case 'urgent':
        totalCost *= 1.3;
        break;
      case 'priority':
        totalCost *= 1.15;
        break;
    }

    // Calculate time estimate
    let timeEstimate = '';
    const sqFt = Number(formData.squareFootage);
    if (sqFt < 2000) {
      timeEstimate = '2-3 hours';
    } else if (sqFt < 5000) {
      timeEstimate = '4-6 hours';
    } else if (sqFt < 10000) {
      timeEstimate = '6-8 hours';
    } else {
      timeEstimate = '8+ hours';
    }

    // Return estimate
    onEstimateCalculated({
      totalCost,
      timeEstimate,
      projectType: formData.projectType,
      cleaningType: formData.cleaningType,
      squareFootage: formData.squareFootage,
      details: {
        vctFlooring: formData.vctFlooring,
        windowCount: Number(formData.windowCount),
        largeWindowCount: Number(formData.largeWindowCount),
        urgency: formData.urgency,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Project Type</Label>
          <Select
            value={formData.projectType}
            onValueChange={(value: string) => setFormData({ ...formData, projectType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office">Office Building</SelectItem>
              <SelectItem value="retail">Retail Space</SelectItem>
              <SelectItem value="industrial">Industrial Facility</SelectItem>
              <SelectItem value="medical">Medical Facility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Cleaning Type</Label>
          <RadioGroup
            value={formData.cleaningType}
            onValueChange={(value: string) => setFormData({ ...formData, cleaningType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular">Regular Cleaning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deep" id="deep" />
              <Label htmlFor="deep">Deep Cleaning</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Square Footage</Label>
          <Input
            type="number"
            value={formData.squareFootage}
            onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
            placeholder="Enter square footage"
            min="0"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="vct"
            checked={formData.vctFlooring}
            onCheckedChange={(checked: boolean) => setFormData({ ...formData, vctFlooring: checked })}
          />
          <Label htmlFor="vct">VCT Flooring</Label>
        </div>

        <div>
          <Label>Regular Windows (count)</Label>
          <Input
            type="number"
            value={formData.windowCount}
            onChange={(e) => setFormData({ ...formData, windowCount: e.target.value })}
            min="0"
          />
        </div>

        <div>
          <Label>Large Windows (count)</Label>
          <Input
            type="number"
            value={formData.largeWindowCount}
            onChange={(e) => setFormData({ ...formData, largeWindowCount: e.target.value })}
            min="0"
          />
        </div>

        <div>
          <Label>Urgency</Label>
          <Select
            value={formData.urgency}
            onValueChange={(value: string) => setFormData({ ...formData, urgency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">Calculate Estimate</Button>
    </form>
  );
} 