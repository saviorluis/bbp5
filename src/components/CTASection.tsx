"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-primary text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto text-center px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Ready for a cleaner space?
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
          Do the thing you love, let us take care of the things you hate!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-medium w-full sm:w-auto">
            <Link href="/get-quote">GET A FREE QUOTE</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary font-medium w-full sm:w-auto">
            <Link href="/services">EXPLORE OUR SERVICES</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
