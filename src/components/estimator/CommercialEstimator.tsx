"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormData, EstimateData, ProjectType, CleaningType, PressureWashingServiceType } from '@/lib/types';
import { 
  PROJECT_TYPE_MULTIPLIERS,
  CLEANING_TYPE_MULTIPLIERS,
  CLEANING_TYPE_DESCRIPTIONS,
  VCT_COST_PER_SQFT,
  TRAVEL_COST_PER_MILE,
  HOTEL_COST_PER_NIGHT,
  PER_DIEM_PER_DAY,
  URGENCY_MULTIPLIERS,
  getRecommendedCleaners,
  PRESSURE_WASHING_RATES,
  WINDOW_CLEANING_COST_PER_WINDOW,
  WINDOW_CLEANING_LARGE_WINDOW_MULTIPLIER,
  WINDOW_CLEANING_HIGH_ACCESS_MULTIPLIER,
  DISPLAY_CASE_CLEANING_COST
} from '@/lib/constants';
import { calculateEstimate } from '@/lib/estimator';

interface CommercialEstimatorProps {
  onEstimateCalculated: (estimate: EstimateData, formData: FormData) => void;
  isAdminMode?: boolean;
}

export function CommercialEstimator({ onEstimateCalculated, isAdminMode = false }: CommercialEstimatorProps) {
  const [formData, setFormData] = useState<FormData>({
    projectType: 'office',
    cleaningType: 'final',
    squareFootage: 0,
    hasVCT: false,
    distanceFromOffice: 0,
    gasPrice: 3.50,
    applyMarkup: true,
    stayingOvernight: false,
    numberOfNights: 0,
    numberOfCleaners: 2,
    urgencyLevel: 1,
    needsPressureWashing: false,
    pressureWashingArea: 0,
    pressureWashingServices: [],
    pressureWashingServiceAreas: {},
    needsWindowCleaning: false,
    chargeForWindowCleaning: true,
    numberOfWindows: 0,
    numberOfLargeWindows: 0,
    numberOfHighAccessWindows: 0,
    numberOfDisplayCases: 0
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estimate = calculateEstimate(formData);
    onEstimateCalculated(estimate, formData);
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      
      // Auto-update number of cleaners when square footage changes
      if ('squareFootage' in updates) {
        newData.numberOfCleaners = getRecommendedCleaners(updates.squareFootage || 0);
      }

      return newData;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Project Information</CardTitle>
              <CardDescription>Enter the fundamental details about your cleaning project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Project Type</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value: ProjectType) => updateFormData({ projectType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="retail">Retail Space</SelectItem>
                    <SelectItem value="industrial">Industrial Facility</SelectItem>
                    <SelectItem value="medical">Medical Facility</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="educational">Educational Facility</SelectItem>
                    <SelectItem value="jewelry_store">Jewelry Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Cleaning Type</Label>
                <RadioGroup
                  value={formData.cleaningType}
                  onValueChange={(value: CleaningType) => updateFormData({ cleaningType: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rough" id="rough" />
                    <Label htmlFor="rough">Rough Clean (Basic)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="final" id="final" />
                    <Label htmlFor="final">Final Clean (Standard)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rough_final" id="rough_final" />
                    <Label htmlFor="rough_final">Rough + Final Clean</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rough_final_touchup" id="rough_final_touchup" />
                    <Label htmlFor="rough_final_touchup">Complete Package (All Stages)</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500 mt-2">{CLEANING_TYPE_DESCRIPTIONS[formData.cleaningType]}</p>
              </div>

              <div>
                <Label>Square Footage</Label>
                <Input
                  type="number"
                  value={formData.squareFootage || ''}
                  onChange={(e) => updateFormData({ squareFootage: Number(e.target.value) })}
                  placeholder="Enter square footage"
                  min="0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vct"
                  checked={formData.hasVCT}
                  onCheckedChange={(checked: boolean) => updateFormData({ hasVCT: checked })}
                />
                <Label htmlFor="vct">VCT Flooring (adds ${VCT_COST_PER_SQFT}/sq ft)</Label>
              </div>

              <div>
                <Label>Distance from Office (miles)</Label>
                <Input
                  type="number"
                  value={formData.distanceFromOffice || ''}
                  onChange={(e) => updateFormData({ distanceFromOffice: Number(e.target.value) })}
                  min="0"
                />
              </div>

              <div>
                <Label>Current Gas Price ($/gallon)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.gasPrice || ''}
                  onChange={(e) => updateFormData({ gasPrice: Number(e.target.value) })}
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <Label>Urgency Level (1-10)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[formData.urgencyLevel]}
                    onValueChange={(value) => updateFormData({ urgencyLevel: value[0] })}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.urgencyLevel}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.urgencyLevel <= 3 ? "Low Priority" :
                   formData.urgencyLevel <= 6 ? "Medium Priority" :
                   formData.urgencyLevel <= 8 ? "High Priority" : "Urgent"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Configure additional services and special requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold">Window Cleaning</Label>
                  <div className="ml-4 space-y-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsWindowCleaning"
                        checked={formData.needsWindowCleaning}
                        onCheckedChange={(checked: boolean) => updateFormData({ needsWindowCleaning: checked })}
                      />
                      <Label htmlFor="needsWindowCleaning">Include Window Cleaning</Label>
                    </div>

                    {formData.needsWindowCleaning && (
                      <div className="space-y-4">
                        <div>
                          <Label>Standard Windows (up to 3ft x 5ft)</Label>
                          <Input
                            type="number"
                            value={formData.numberOfWindows || ''}
                            onChange={(e) => updateFormData({ numberOfWindows: Number(e.target.value) })}
                            min="0"
                          />
                          <p className="text-sm text-gray-500 mt-1">Cost: ${WINDOW_CLEANING_COST_PER_WINDOW} per window</p>
                        </div>

                        <div>
                          <Label>Large Windows (over 3ft x 5ft)</Label>
                          <Input
                            type="number"
                            value={formData.numberOfLargeWindows || ''}
                            onChange={(e) => updateFormData({ numberOfLargeWindows: Number(e.target.value) })}
                            min="0"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Cost: ${WINDOW_CLEANING_COST_PER_WINDOW * WINDOW_CLEANING_LARGE_WINDOW_MULTIPLIER} per window
                          </p>
                        </div>

                        <div>
                          <Label>High Access Windows (requiring lifts/ladders)</Label>
                          <Input
                            type="number"
                            value={formData.numberOfHighAccessWindows || ''}
                            onChange={(e) => updateFormData({ numberOfHighAccessWindows: Number(e.target.value) })}
                            min="0"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Cost: ${WINDOW_CLEANING_COST_PER_WINDOW * WINDOW_CLEANING_HIGH_ACCESS_MULTIPLIER} per window
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Pressure Washing</Label>
                  <div className="ml-4 space-y-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsPressureWashing"
                        checked={formData.needsPressureWashing}
                        onCheckedChange={(checked: boolean) => updateFormData({ needsPressureWashing: checked })}
                      />
                      <Label htmlFor="needsPressureWashing">Include Pressure Washing</Label>
                    </div>

                    {formData.needsPressureWashing && (
                      <div className="space-y-4">
                        <div>
                          <Label>Area to Pressure Wash (sq ft)</Label>
                          <Input
                            type="number"
                            value={formData.pressureWashingArea || ''}
                            onChange={(e) => updateFormData({ pressureWashingArea: Number(e.target.value) })}
                            min="0"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {formData.projectType === 'jewelry_store' && (
                  <div>
                    <Label className="text-lg font-semibold">Display Cases</Label>
                    <div className="ml-4 space-y-4 mt-2">
                      <div>
                        <Label>Number of Display Cases</Label>
                        <Input
                          type="number"
                          value={formData.numberOfDisplayCases || ''}
                          onChange={(e) => updateFormData({ numberOfDisplayCases: Number(e.target.value) })}
                          min="0"
                        />
                        <p className="text-sm text-gray-500 mt-1">Cost: ${DISPLAY_CASE_CLEANING_COST} per case</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-lg font-semibold">Overnight Stay</Label>
                  <div className="ml-4 space-y-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="stayingOvernight"
                        checked={formData.stayingOvernight}
                        onCheckedChange={(checked: boolean) => updateFormData({ stayingOvernight: checked })}
                      />
                      <Label htmlFor="stayingOvernight">Requires Overnight Stay</Label>
                    </div>

                    {formData.stayingOvernight && (
                      <div>
                        <Label>Number of Nights</Label>
                        <Input
                          type="number"
                          value={formData.numberOfNights || ''}
                          onChange={(e) => updateFormData({ numberOfNights: Number(e.target.value) })}
                          min="1"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Includes hotel (${HOTEL_COST_PER_NIGHT}/room/night) and per diem (${PER_DIEM_PER_DAY}/person/day)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Staffing</Label>
                  <div className="space-y-2">
                    <div>
                      <Label>Number of Cleaners</Label>
                      <Input
                        type="number"
                        value={formData.numberOfCleaners || ''}
                        onChange={(e) => updateFormData({ numberOfCleaners: Number(e.target.value) })}
                        min="1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Recommended: {getRecommendedCleaners(formData.squareFootage)} cleaners for {formData.squareFootage} sq ft
                      </p>
                    </div>
                  </div>
                </div>

                {isAdminMode && (
                  <div>
                    <Label className="text-lg font-semibold">Pricing Options</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id="applyMarkup"
                        checked={formData.applyMarkup}
                        onCheckedChange={(checked: boolean) => updateFormData({ applyMarkup: checked })}
                      />
                      <Label htmlFor="applyMarkup">Apply Standard Markup</Label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button type="submit" className="w-full">Calculate Estimate</Button>
    </form>
  );
} 