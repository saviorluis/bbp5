"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Building2, Home } from "lucide-react";

export default function QuoteSelection() {
  const [selected, setSelected] = useState<"commercial" | "residential" | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/" 
          className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/bbps-logo2.jpg"
              alt="Big Brother Property Solutions Logo"
              width={200}
              height={100}
              className="w-auto h-auto max-h-20 object-contain"
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-2">
            Get a Quote
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please select the type of service you need
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelected("commercial")}
              className={`flex flex-col items-center p-6 border-2 rounded-lg transition-all ${
                selected === "commercial"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"
              }`}
            >
              <Building2 className="h-16 w-16 text-secondary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Commercial</h2>
              <p className="text-gray-500 text-center text-sm">
                For offices, retail spaces, industrial buildings, and other business properties
              </p>
            </button>
            
            <button
              onClick={() => setSelected("residential")}
              className={`flex flex-col items-center p-6 border-2 rounded-lg transition-all ${
                selected === "residential"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30 hover:bg-gray-50"
              }`}
            >
              <Home className="h-16 w-16 text-secondary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Residential</h2>
              <p className="text-gray-500 text-center text-sm">
                For houses, apartments, condos, and other residential properties
              </p>
            </button>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button
              disabled={!selected}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8"
              asChild
            >
              <Link href={selected ? `/get-quote/${selected}` : "#"}>
                Continue
              </Link>
            </Button>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Note: We currently offer both commercial and residential cleaning services with customized quotes based on your specific needs.
          </p>
        </div>
      </div>
    </div>
  );
}
