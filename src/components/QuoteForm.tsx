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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Let's create a form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  serviceType: z.string({
    required_error: "Please select a service type",
  }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Simple password check - in production, use a proper auth system
  const handlePasswordSubmit = () => {
    if (password === '1234') {
      setIsAdminMode(true);
      setShowPasswordModal(false);
      setPasswordError('');
      
      // Set admin status in localStorage
      // In production, use a proper auth system instead
      localStorage.setItem('isAdminMode', 'true');
      
      // Trigger storage event for other tabs/windows
      window.dispatchEvent(new Event('storage'));
    } else {
      setPasswordError('Incorrect password');
    }
    setPassword('');
  };

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend API
    // This is just a simulation
    setTimeout(() => {
      console.log("Form data:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary">GET A FREE REFERENCE QUOTE</h2>
            <p className="text-muted-foreground">
              Get a quick reference price estimate for your cleaning project. For detailed janitorial contract pricing, use the Professional Calculator below.
            </p>
            {/* This comment will be replaced with a link to the estimator when it's ready */}
            {/* <p className="mt-4 text-sm">
              <a href="/estimate" className="text-blue-600 hover:underline">
                Or try our interactive estimator tool →
              </a>
            </p> */}
            
            {/* Professional Calculator access button */}
            <div className="mt-4">
              <button 
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors" 
                onClick={() => setShowPasswordModal(true)}
              >
                🧮 Professional Calculator Access
              </button>
              <p className="text-xs text-gray-500 mt-1">For janitorial contracts & detailed estimates</p>
            </div>
          </div>

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

          {/* Admin Mode Banner */}
          {isAdminMode && (
            <div className="bg-amber-50 border border-amber-200 p-4 mb-8 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-amber-800">Professional Calculator Access Granted</h3>
                  <p className="text-sm text-amber-700">You can now access the professional pricing calculator for detailed estimates.</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => window.location.href = '/estimate'} 
                  >
                    Open Professional Calculator
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => {
                      setIsAdminMode(false);
                      localStorage.removeItem('isAdminMode');
                      window.dispatchEvent(new Event('storage'));
                    }}
                  >
                    Exit Professional Mode
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Thank you! </strong>
              <span className="block sm:inline">Your quote request has been submitted successfully. We'll be in touch soon.</span>
            </div>
          ) : null}

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
                          <SelectItem value="janitorial">Janitorial Cleaning</SelectItem>
                          <SelectItem value="residential">Residential Cleaning</SelectItem>
                          <SelectItem value="commercial">Commercial Cleaning</SelectItem>
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
