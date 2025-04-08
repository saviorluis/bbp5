"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpeg')",
          filter: "brightness(0.7)"
        }}
      />

      {/* Logo in Bottom Right */}
      <div className="absolute bottom-[32%] sm:bottom-[30%] md:bottom-[26%] right-[22%] sm:right-[25%] md:right-[27%] z-10">
        <div className="relative" style={{ 
          filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.9))',
          transform: 'translateZ(0)'
        }}>
          <Image
            src="/images/bbps-logo2.jpg"
            alt="Big Brother Property Solutions Logo"
            width={375}
            height={180}
            className="h-auto w-72 sm:w-90 md:w-108 lg:w-120"
            style={{ 
              objectFit: 'contain',
              mixBlendMode: 'screen'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 bg-black/30">
        <div className="container mx-auto flex flex-col h-full justify-center px-4 md:px-8">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Creating space for innovation to flourish.
            </h1>
            <p className="text-lg sm:text-xl text-white mb-6 sm:mb-10 max-w-md sm:max-w-lg">
              Servicing Experienced & Reliable Builders inc. since 1978
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-medium w-full sm:w-auto">
                <Link href="/get-quote">GET A QUOTE</Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-white border-2 bg-black/30 text-white hover:bg-white hover:text-primary font-medium w-full sm:w-auto">
                <Link href="tel:+13363654052" className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>CALL US</span>
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="border-white border-2 bg-black/30 text-white hover:bg-white hover:text-primary font-medium w-full sm:w-auto">
                <Link href="/services">OUR SERVICES</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
