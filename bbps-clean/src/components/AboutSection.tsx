"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const AboutSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-primary">ABOUT OUR COMPANY</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-secondary">
              We provide professional cleaning solutions for all types of projects!
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Big Brother Property Solutions, your go-to cleaning service for all your needs. As a Latino-owned and operated business, we understand the importance of providing a high level of service to our diverse community. From Commercial/Industrial to Residential, BBPS is the brand you can trust. Contact us today and let us take care of your property needs.
            </p>
            <Button asChild className="mt-2 sm:mt-4 bg-secondary hover:bg-secondary/90 text-white font-medium w-full sm:w-auto">
              <Link href="/about-us">READ MORE</Link>
            </Button>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden shadow-md">
              {/* Mobile Logo */}
              <div className="block md:hidden w-full h-full relative">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <Image
                    src="/images/bbps-logo2.jpg"
                    alt="Big Brother Property Solutions Logo"
                    width={200}
                    height={100}
                    className="max-w-[180px] w-auto h-auto object-contain"
                    priority
                  />
                </div>
              </div>
              {/* Desktop Window Cleaning Image */}
              <div className="hidden md:block w-full h-full">
                <Image
                  src="/images/window-cleaning.jpeg"
                  alt="Professional Cleaning Services"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
