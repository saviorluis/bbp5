"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Estimator import removed

// Let's create a form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  serviceType: z.string({
    required_error: "Please select a service type",
  }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
  estimateDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [showEstimator, setShowEstimator] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
      estimateDetails: "",
    },
  });

  // Watch for changes to service type
  const serviceType = form.watch("serviceType");
  
  useEffect(() => {
    if (serviceType) {
      setSelectedServiceType(serviceType);
      // Show estimator for any service type, not just commercial and residential
      setShowEstimator(true);
    } else {
      setShowEstimator(false);
    }
  }, [serviceType]);

  // Handle estimate calculation completion
  const handleEstimateCalculated = (estimateData: any) => {
    setEstimateResult(estimateData);
    form.setValue("estimateDetails", JSON.stringify(estimateData));
  };

  // Generate CSV data from estimate
  const generateCSV = () => {
    if (!estimateResult) return null;
    
    const headers = ['Category', 'Value'];
    const rows = [
      ['Service Type', estimateResult.serviceType === 'commercial' ? 'Commercial Cleaning' : 'Residential Cleaning'],
      ['Total Cost', `$${estimateResult.totalCost.toFixed(2)}`],
      ['Square Footage', estimateResult.squareFootage],
      ['Time Estimate', estimateResult.timeEstimate],
    ];
    
    // Add specific details based on service type
    if (estimateResult.serviceType === 'commercial') {
      rows.push(
        ['Project Type', estimateResult.projectType],
        ['Cleaning Type', estimateResult.cleaningType],
        ['VCT Flooring', estimateResult.details.vctFlooring ? 'Yes' : 'No'],
        ['Regular Windows', estimateResult.details.windowCount],
        ['Large Windows', estimateResult.details.largeWindowCount],
        ['Team Size', estimateResult.details.teamSize]
      );
    } else {
      rows.push(
        ['Home Type', estimateResult.homeType],
        ['Cleaning Type', estimateResult.cleaningType],
        ['Bedrooms', estimateResult.details.bedrooms],
        ['Bathrooms', estimateResult.details.bathrooms],
        ['Carpet Cleaning', estimateResult.details.extras.carpet ? 'Yes' : 'No'],
        ['Deep Clean Kitchen', estimateResult.details.extras.deepCleanKitchen ? 'Yes' : 'No'],
        ['Deep Clean Bathrooms', estimateResult.details.extras.deepCleanBathrooms ? 'Yes' : 'No'],
        ['Window Cleaning', estimateResult.details.extras.windows ? 'Yes' : 'No'],
        ['Appliance Cleaning', estimateResult.details.extras.appliances ? 'Yes' : 'No']
      );
    }
    
    // Format as CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
  };

  // Download the estimate as CSV
  const downloadCSV = () => {
    const csvContent = generateCSV();
    if (!csvContent) return;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `BBPS_Cleaning_Estimate_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Generate printable HTML for the estimate
  const printEstimate = () => {
    if (!estimateResult) return;
    
    // Create a new window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print your estimate');
      return;
    }
    
    // Prepare the HTML content
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>BBPS Cleaning Estimate</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #1a56db; margin-bottom: 5px; }
          .header p { color: #6b7280; }
          .estimate-details { border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
          .estimate-row { display: flex; margin-bottom: 10px; }
          .estimate-label { flex: 1; font-weight: 600; color: #374151; }
          .estimate-value { flex: 1; color: #4b5563; }
          .total-cost { font-size: 22px; font-weight: bold; margin-top: 20px; text-align: right; color: #1a56db; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
          .contact-info { margin-top: 30px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Big Brother Property Solutions</h1>
          <p>Cleaning Service Estimate</p>
        </div>
        
        <div class="estimate-details">
          <div class="estimate-row">
            <div class="estimate-label">Service Type:</div>
            <div class="estimate-value">${estimateResult.serviceType === 'commercial' ? 'Commercial Cleaning' : 'Residential Cleaning'}</div>
          </div>
          
          <div class="estimate-row">
            <div class="estimate-label">Square Footage:</div>
            <div class="estimate-value">${estimateResult.squareFootage} sq ft</div>
          </div>
          
          <div class="estimate-row">
            <div class="estimate-label">Estimated Time:</div>
            <div class="estimate-value">${estimateResult.timeEstimate}</div>
          </div>
          
          ${estimateResult.serviceType === 'commercial' ? `
            <div class="estimate-row">
              <div class="estimate-label">Project Type:</div>
              <div class="estimate-value">${estimateResult.projectType}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Cleaning Type:</div>
              <div class="estimate-value">${estimateResult.cleaningType}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">VCT Flooring:</div>
              <div class="estimate-value">${estimateResult.details.vctFlooring ? 'Yes' : 'No'}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Regular Windows:</div>
              <div class="estimate-value">${estimateResult.details.windowCount}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Large Windows:</div>
              <div class="estimate-value">${estimateResult.details.largeWindowCount}</div>
            </div>
          ` : `
            <div class="estimate-row">
              <div class="estimate-label">Home Type:</div>
              <div class="estimate-value">${estimateResult.homeType}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Cleaning Type:</div>
              <div class="estimate-value">${estimateResult.cleaningType}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Bedrooms:</div>
              <div class="estimate-value">${estimateResult.details.bedrooms}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Bathrooms:</div>
              <div class="estimate-value">${estimateResult.details.bathrooms}</div>
            </div>
            
            <div class="estimate-row">
              <div class="estimate-label">Additional Services:</div>
              <div class="estimate-value">
                ${estimateResult.details.extras.carpet ? 'Carpet Cleaning<br>' : ''}
                ${estimateResult.details.extras.deepCleanKitchen ? 'Deep Clean Kitchen<br>' : ''}
                ${estimateResult.details.extras.deepCleanBathrooms ? 'Deep Clean Bathrooms<br>' : ''}
                ${estimateResult.details.extras.windows ? 'Window Cleaning<br>' : ''}
                ${estimateResult.details.extras.appliances ? 'Appliance Cleaning' : ''}
              </div>
            </div>
          `}
          
          <div class="total-cost">
            Total Estimated Cost: $${estimateResult.totalCost.toFixed(2)}
          </div>
        </div>
        
        <div class="contact-info">
          <p>For questions or to schedule your cleaning service, please contact us at:</p>
          <p><strong>Phone:</strong> (123) 456-7890  |  <strong>Email:</strong> info@bbpscleaning.com</p>
        </div>
        
        <div class="footer">
          <p>This is an estimate based on the information provided. Final pricing may vary based on actual conditions.</p>
          <p>Estimate generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;
    
    // Write to the new window and print
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Submit the form data to our n8n API endpoint
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: data.serviceType === 'residential' ? 'residentialQuote' : 
                  data.serviceType === 'commercial' ? 'commercialQuote' : 'quote',
          ...data,
          estimateDetails: estimateResult ? estimateResult : undefined,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        form.reset();
        setEstimateResult(null);
        setShowEstimator(false);
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setErrorMessage(result.message || 'There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('There was an error connecting to the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary">GET A FREE QUOTE</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Thank you! </strong>
              <span className="block sm:inline">Your quote request has been submitted successfully. We'll be in touch soon.</span>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential Cleaning</SelectItem>
                          <SelectItem value="commercial">Commercial Cleaning</SelectItem>
                          <SelectItem value="janitorial">Janitorial Cleaning</SelectItem>
                          <SelectItem value="office">Office Cleaning</SelectItem>
                          <SelectItem value="airbnb">Airbnb Cleaning</SelectItem>
                          <SelectItem value="post-construction">Post Construction Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {showEstimator && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-medium mb-4">Calculate Your Estimate</h3>
                  {/* Estimator component removed */}
                  
                  {estimateResult && (
                    <div className="mt-4">
                      <div className="p-4 mb-4 bg-blue-50 rounded-md">
                        <h4 className="font-medium text-blue-700 mb-2">Estimate Summary</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm">Estimated cost:</p>
                          <p className="text-sm font-bold">${estimateResult.totalCost.toFixed(2)}</p>
                          {estimateResult.squareFootage && (
                            <>
                              <p className="text-sm">Square footage:</p>
                              <p className="text-sm">{estimateResult.squareFootage} sq ft</p>
                            </>
                          )}
                          {estimateResult.timeEstimate && (
                            <>
                              <p className="text-sm">Estimated time:</p>
                              <p className="text-sm">{estimateResult.timeEstimate}</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={downloadCSV}
                          className="text-xs"
                        >
                          Download as CSV
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={printEstimate}
                          className="text-xs"
                        >
                          Print Estimate
                        </Button>
                        <p className="text-xs text-gray-500 w-full mt-2">
                          Save or print your estimate for your records.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your cleaning needs"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-6 bg-secondary hover:bg-secondary/90 text-white font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "GET MY QUOTE"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
