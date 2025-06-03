"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-2 sm:py-3 md:py-4 px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <h1 className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary bg-white/80 px-2 sm:px-3 py-1 rounded-md shadow-sm truncate max-w-[200px] sm:max-w-none">
            Big Brother
            <span className="hidden sm:inline"> Property Solutions</span>
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <NavLinks />
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="tel:+13363654052" className="flex items-center text-primary hover:text-secondary transition-colors">
            <Phone size={18} className="mr-2" />
            <span>(336) 365-4052</span>
          </Link>
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white font-medium">
            <Link href="/get-quote">GET A QUOTE</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" className="border-none hover:bg-primary/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col p-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold text-primary">
                Big Brother Property Solutions
              </h1>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border-none">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetTrigger>
            </div>
            <nav className="flex flex-col p-4">
              <MobileNavLinks />
            </nav>
            <div className="mt-auto p-4 border-t">
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium">
                <Link href="/get-quote">GET A QUOTE</Link>
              </Button>
              <Link
                href="tel:+13363654052"
                className="flex items-center justify-center mt-4 text-primary hover:text-secondary transition-colors"
              >
                <Phone size={18} className="mr-2" />
                <span>(336) 365-4052</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link href="/" className="text-primary hover:text-secondary font-medium transition-colors">
        HOME
      </Link>
      <Link href="/solutions" className="text-primary hover:text-secondary font-medium transition-colors">
        SOLUTIONS
      </Link>
      <Link href="/about" className="text-primary hover:text-secondary font-medium transition-colors">
        ABOUT US
      </Link>
      <Link href="/contact" className="text-primary hover:text-secondary font-medium transition-colors">
        CONTACT US
      </Link>
      <Link href="/work-with-us" className="text-primary hover:text-secondary font-medium transition-colors">
        WORK WITH US
      </Link>
    </>
  );
};

const MobileNavLinks = () => {
  return (
    <>
      <Link href="/" className="text-primary hover:text-secondary font-medium py-3 border-b">
        HOME
      </Link>
      <Link href="/solutions" className="text-primary hover:text-secondary font-medium py-3 border-b">
        SOLUTIONS
      </Link>
      <Link href="/about" className="text-primary hover:text-secondary font-medium py-3 border-b">
        ABOUT US
      </Link>
      <Link href="/contact" className="text-primary hover:text-secondary font-medium py-3 border-b">
        CONTACT US
      </Link>
      <Link href="/work-with-us" className="text-primary hover:text-secondary font-medium py-3 border-b">
        WORK WITH US
      </Link>
    </>
  );
};

export default Header;
