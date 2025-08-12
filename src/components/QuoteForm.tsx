"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { calculateEstimate } from "@/lib/estimator";
import { FormData as EstimatorFormData, EstimateData, ProjectType, CleaningType } from '@/lib/types';
import { getRecommendedCleaners, PROJECT_TYPE_MULTIPLIERS, CLEANING_TYPE_DESCRIPTIONS } from '@/lib/constants';

// Enhanced form schema with all calculator fields
const formSchema = z.object({
  // Contact Info
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  
  // Project Details
  projectType: z.string({ required_error: "Please select a project type" }),
  cleaningType: z.string({ required_error: "Please select a cleaning type" }),
  squareFootage: z.number().min(1, { message: "Square footage must be greater than 0" }),
  
  // Additional Services
  hasVCT: z.boolean(),
  vctSquareFootage: z.number().optional(),
  needsPressureWashing: z.boolean(),
  pressureWashingArea: z.number().optional(),
  pressureWashingType: z.string().optional(),
  needsWindowCleaning: z.boolean(),
  numberOfWindows: z.number().optional(),
  numberOfLargeWindows: z.number().optional(),
  numberOfHighAccessWindows: z.number().optional(),
  numberOfDisplayCases: z.number().optional(),
  
  // Logistics
  distanceFromOffice: z.number().min(0),
  stayingOvernight: z.boolean(),
  numberOfNights: z.number().optional(),
  numberOfCleaners: z.number().min(1),
  urgencyLevel: z.number().min(1).max(10),
  
  // Additional Info
  message: z.string().optional(),
  wantContact: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: 'office', label: 'Office Building' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'fast_food', label: 'Fast Food Restaurant' },
  { value: 'medical', label: 'Medical Facility' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'industrial', label: 'Industrial Facility' },
  { value: 'educational', label: 'Educational Facility' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'jewelry_store', label: 'Jewelry Store' },
  { value: 'grocery_store', label: 'Grocery Store' },
  { value: 'yoga_studio', label: 'Yoga Studio' },
  { value: 'kids_fitness', label: 'Kids Fitness Center' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'interactive_toy_store', label: 'Interactive Toy Store' },
  { value: 'church', label: 'Church' },
  { value: 'arcade', label: 'Arcade' },
  { value: 'coffee_shop', label: 'Coffee Shop' },
  { value: 'fire_station', label: 'Fire Station' },
  { value: 'apartment', label: 'Apartment Complex' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'dormitory', label: 'Dormitory' },
  { value: 'dental_office', label: 'Dental Office' },
  { value: 'pet_resort', label: 'Pet Resort' },
  { value: 'beauty_store', label: 'Beauty Store' },
  { value: 'mailroom', label: 'Mailroom' },
  { value: 'residential', label: 'Residential' },
  { value: 'car_wash', label: 'Car Wash' },
  { value: 'construction_trailor', label: 'Construction Trailer' },
  { value: 'other', label: 'Other' },
];

const cleaningTypes: { value: CleaningType; label: string }[] = [
  { value: 'rough', label: 'Rough Clean' },
  { value: 'final', label: 'Final Clean' },
  { value: 'rough_final', label: 'Rough + Final Clean' },
  { value: 'rough_final_touchup', label: 'Rough + Final + Touch-up' },
  { value: 'pressure_washing_only', label: 'Pressure Washing Only' },
  { value: 'vct_only', label: 'VCT Flooring Only' },
  { value: 'window_cleaning_only', label: 'Window Cleaning Only' },
];

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const [showEstimate, setShowEstimate] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: 'office',
      cleaningType: 'final',
      squareFootage: 5000,
      hasVCT: false,
      vctSquareFootage: 0,
      needsPressureWashing: false,
      pressureWashingArea: 0,
      pressureWashingType: 'soft_wash',
      needsWindowCleaning: false,
      numberOfWindows: 0,
      numberOfLargeWindows: 0,
      numberOfHighAccessWindows: 0,
      numberOfDisplayCases: 0,
      distanceFromOffice: 20,
      stayingOvernight: false,
      numberOfNights: 1,
      numberOfCleaners: getRecommendedCleaners(5000),
      urgencyLevel: 1,
      wantContact: false,
    },
  });

  const watchedSquareFootage = form.watch('squareFootage');
  const watchedProjectType = form.watch('projectType');
  const watchedCleaningType = form.watch('cleaningType');
  const watchedHasVCT = form.watch('hasVCT');
  const watchedNeedsPressureWashing = form.watch('needsPressureWashing');
  const watchedNeedsWindowCleaning = form.watch('needsWindowCleaning');
  const watchedStayingOvernight = form.watch('stayingOvernight');

  // Update recommended cleaners when square footage changes
  const handleSquareFootageChange = (value: number) => {
    const recommendedCleaners = getRecommendedCleaners(value);
    form.setValue('numberOfCleaners', recommendedCleaners);
  };

  // Simple password check
  const handlePasswordSubmit = () => {
    if (password === '1234') {
      setIsAdminMode(true);
      localStorage.setItem('isAdminMode', 'true');
      setShowPasswordModal(false);
      setPasswordError('');
      // Redirect to full calculator
      window.location.href = '/estimate';
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Calculate estimate
      const estimatorData: EstimatorFormData = {
        projectType: values.projectType as ProjectType,
        cleaningType: values.cleaningType as CleaningType,
        squareFootage: values.squareFootage,
        hasVCT: values.hasVCT,
        vctSquareFootage: values.vctSquareFootage || 0,
        distanceFromOffice: values.distanceFromOffice,
        gasPrice: 3.50,
        applyMarkup: true,
        stayingOvernight: values.stayingOvernight,
        numberOfNights: values.numberOfNights || 1,
        numberOfCleaners: values.numberOfCleaners,
        urgencyLevel: values.urgencyLevel,
        needsPressureWashing: values.needsPressureWashing,
        pressureWashingArea: values.pressureWashingArea || 0,
        pressureWashingType: (values.pressureWashingType as any) || 'soft_wash',
        pressureWashingServices: [],
        needsWindowCleaning: values.needsWindowCleaning,
        chargeForWindowCleaning: values.needsWindowCleaning,
        numberOfWindows: values.numberOfWindows || 0,
        numberOfLargeWindows: values.numberOfLargeWindows || 0,
        numberOfHighAccessWindows: values.numberOfHighAccessWindows || 0,
        numberOfDisplayCases: values.numberOfDisplayCases || 0,
        clientName: values.name,
        projectName: `${values.projectType} cleaning project`,
      };

      const estimate = calculateEstimate(estimatorData);
      setEstimateData(estimate);
      setShowEstimate(true);
      
      // If they want contact, submit the form
      if (values.wantContact) {
        // Here you would submit to your backend/email service
        console.log('Contact request submitted:', values);
      }
    } catch (error) {
      console.error('Error calculating estimate:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatTimeEstimate = (hours: number) => {
    if (hours < 4) return '2-4 hours';
    if (hours < 8) return '4-8 hours';
    if (hours < 16) return '1-2 days';
    if (hours < 40) return '3-5 days';
    return '5+ days';
  };

  if (showEstimate && estimateData) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Your Estimate is Ready!</CardTitle>
            <CardDescription>
              Here's your detailed cleaning estimate based on your project requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-700">Project Type</h4>
                <p className="text-lg">{projectTypes.find(p => p.value === form.getValues('projectType'))?.label}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Service Type</h4>
                <p className="text-lg">{cleaningTypes.find(c => c.value === form.getValues('cleaningType'))?.label}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Square Footage</h4>
                <p className="text-lg">{form.getValues('squareFootage').toLocaleString()} sq ft</p>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Pricing Breakdown</h3>
              
              <div className="space-y-2">
                {estimateData.basePrice > 0 && (
                  <div className="flex justify-between">
                    <span>Base Cleaning Service</span>
                    <span>{formatCurrency(estimateData.basePrice)}</span>
                  </div>
                )}
                
                {estimateData.vctCost > 0 && (
                  <div className="flex justify-between">
                    <span>VCT Flooring Treatment</span>
                    <span>{formatCurrency(estimateData.vctCost)}</span>
                  </div>
                )}
                
                {estimateData.pressureWashingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Pressure Washing</span>
                    <span>{formatCurrency(estimateData.pressureWashingCost)}</span>
                  </div>
                )}
                
                {estimateData.windowCleaningCost > 0 && (
                  <div className="flex justify-between">
                    <span>Window Cleaning</span>
                    <span>{formatCurrency(estimateData.windowCleaningCost)}</span>
                  </div>
                )}
                
                {estimateData.travelCost > 0 && (
                  <div className="flex justify-between">
                    <span>Travel Expenses</span>
                    <span>{formatCurrency(estimateData.travelCost)}</span>
                  </div>
                )}
                
                {estimateData.overnightCost > 0 && (
                  <div className="flex justify-between">
                    <span>Overnight Expenses</span>
                    <span>{formatCurrency(estimateData.overnightCost)}</span>
                  </div>
                )}
                
                <hr className="my-2" />
                
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(estimateData.totalBeforeMarkup)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Professional Markup (30%)</span>
                  <span>{formatCurrency(estimateData.markup)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Sales Tax (7%)</span>
                  <span>{formatCurrency(estimateData.salesTax)}</span>
                </div>
                
                <hr className="my-2" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Estimate</span>
                  <span className="text-green-600">{formatCurrency(estimateData.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700">Estimated Time</h4>
                <p className="text-lg">{formatTimeEstimate(estimateData.estimatedHours)}</p>
                <p className="text-sm text-gray-600">({estimateData.estimatedHours.toFixed(1)} hours)</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Recommended Team</h4>
                <p className="text-lg">{form.getValues('numberOfCleaners')} cleaners</p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Would you like us to reach out about this estimate?</h3>
              <p className="text-gray-600 mb-4">
                We can provide a detailed consultation, answer questions, and schedule your cleaning service.
              </p>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    form.setValue('wantContact', true);
                    onSubmit(form.getValues());
                  }}
                  className="flex-1"
                >
                  Yes, Contact Me
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEstimate(false)}
                  className="flex-1"
                >
                  Get Another Estimate
                </Button>
              </div>
            </div>

            {/* Professional Calculator Link */}
            <div className="text-center border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">
                Need more detailed estimates or janitorial contract pricing?
              </p>
              <Button 
                variant="outline" 
                onClick={() => setShowPasswordModal(true)}
                className="text-blue-600"
              >
                🧮 Access Professional Calculator
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Professional Calculator Access</h3>
              <p className="text-sm text-gray-600 mb-4">Enter the password to access the professional pricing calculator for detailed janitorial contract estimates.</p>
              
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              
              {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePasswordSubmit}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary">GET YOUR INSTANT ESTIMATE</h2>
        <p className="text-muted-foreground mb-4">
          Calculate your cleaning project cost instantly with our professional estimator.
        </p>
        
        {/* Professional Calculator access button */}
        <div className="mt-4">
          <Button 
            variant="outline"
            onClick={() => setShowPasswordModal(true)}
            className="text-blue-600 bg-blue-50 hover:bg-blue-100"
          >
            🧮 Professional Calculator Access
          </Button>
          <p className="text-xs text-gray-500 mt-1">For janitorial contracts & detailed estimates</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>We'll use this to send your estimate and follow up if needed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Tell us about your cleaning project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cleaningType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cleaningTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      {watchedCleaningType && (
                        <p className="text-sm text-gray-600 mt-1">
                          {CLEANING_TYPE_DESCRIPTIONS[watchedCleaningType as CleaningType]}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="squareFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Footage</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5000" 
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          field.onChange(value);
                          handleSquareFootageChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Select any additional services you need.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="hasVCT"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        VCT Flooring Treatment
                      </FormLabel>
                      <p className="text-sm text-gray-600">
                        Strip, wax, and buff vinyl composition tile flooring
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {watchedHasVCT && (
                <FormField
                  control={form.control}
                  name="vctSquareFootage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VCT Square Footage</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1000" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="needsPressureWashing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Pressure Washing
                      </FormLabel>
                      <p className="text-sm text-gray-600">
                        Exterior pressure washing services
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {watchedNeedsPressureWashing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pressureWashingArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pressure Washing Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="500" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pressureWashingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pressure Washing Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="soft_wash">Soft Wash</SelectItem>
                            <SelectItem value="roof_wash">Roof Wash</SelectItem>
                            <SelectItem value="driveway">Driveway</SelectItem>
                            <SelectItem value="deck">Deck</SelectItem>
                            <SelectItem value="daily_rate">Custom Service</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="needsWindowCleaning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Window Cleaning
                      </FormLabel>
                      <p className="text-sm text-gray-600">
                        Professional window cleaning services
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {watchedNeedsWindowCleaning && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfWindows"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Standard Windows</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="10" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfLargeWindows"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Large Windows</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfHighAccessWindows"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>High Access Windows</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {watchedProjectType === 'jewelry_store' && (
                <FormField
                  control={form.control}
                  name="numberOfDisplayCases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Display Cases</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="8" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-600">
                        Special pricing for jewelry store display case cleaning
                      </p>
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Project Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Project Logistics</CardTitle>
              <CardDescription>Help us plan the logistics for your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="distanceFromOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance from Office (miles)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="20" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgencyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level (1-10)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="10" 
                          placeholder="1" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-600">
                        1 = Standard timing, 10 = Rush job (affects pricing)
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="numberOfCleaners"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Cleaners</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="3" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-gray-600">
                      Recommended: {getRecommendedCleaners(watchedSquareFootage)} cleaners for {watchedSquareFootage?.toLocaleString()} sq ft
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stayingOvernight"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Overnight Stay Required
                      </FormLabel>
                      <p className="text-sm text-gray-600">
                        Will the cleaning crew need to stay overnight?
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {watchedStayingOvernight && (
                <FormField
                  control={form.control}
                  name="numberOfNights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Nights</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="1" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Anything else we should know about your project?</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about any special requirements, access restrictions, or other details..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Calculating...' : 'Get My Instant Estimate'}
          </Button>
        </form>
      </Form>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Professional Calculator Access</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the password to access the professional pricing calculator for detailed janitorial contract estimates.</p>
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            
            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePasswordSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;