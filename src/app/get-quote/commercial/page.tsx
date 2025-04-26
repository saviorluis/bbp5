"use client";

import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CommercialQuote() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/get-quote" 
          className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Selection
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
            Commercial Cleaning Quote
          </h1>
          
          <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 mb-8">
            <p className="text-center text-gray-600 italic">
              The commercial estimator tool will be implemented here. This is a placeholder until the integration is complete.
            </p>
          </div>
          
          {/* Basic form as a placeholder */}
          <form className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your company name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div>
              <label htmlFor="property_type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="property_type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select type</option>
                <option value="office">Office Building</option>
                <option value="retail">Retail Space</option>
                <option value="industrial">Industrial Facility</option>
                <option value="healthcare">Healthcare Facility</option>
                <option value="restaurant">Restaurant</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Please provide details about your commercial property and cleaning needs"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8" size="lg">
                Submit Request
              </Button>
            </div>
          </form>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Note: This is a placeholder form. The integrated estimator tool will provide accurate quotes based on property specifications.
          </p>
        </div>
      </div>
    </div>
  );
} 