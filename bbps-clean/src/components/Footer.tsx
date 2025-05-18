"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Big Brother Property Solutions</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <p className="text-sm sm:text-base">1200 Eastchester Dr, High Point, NC Ste. 203</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 flex-shrink-0" />
              <Link href="tel:+13363654052" className="text-sm sm:text-base">(336) 365-4052</Link>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 flex-shrink-0" />
              <Link href="mailto:ncbbps@gmail.com" className="text-sm sm:text-base">ncbbps@gmail.com</Link>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
              <div className="text-sm sm:text-base">
                <p>Monday-Friday</p>
                <p>7am-5pm</p>
              </div>
            </div>
            <div className="flex space-x-4 pt-2">
              <Link href="https://facebook.com" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Our Services</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Janitorial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Office Cleaning
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Airbnb Cleaning
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Post Construction Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="hover:text-accent transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/work-with-us" className="hover:text-accent transition-colors">
                  Work With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Newsletter</h3>
            <p className="mb-4 text-sm sm:text-base">Subscribe to receive updates on our services and special offers.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-white/10 border-white/20 placeholder:text-white/60 text-white"
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto py-4 md:py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} by Big Brother Property Solutions LLC</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
