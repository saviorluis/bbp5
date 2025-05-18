import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Big Brother Property Solutions",
  description: "Get in touch with Big Brother Property Solutions for all your cleaning needs.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg mb-8">
            Have questions about our services or want to request a quote? Fill out the form below.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input 
                  id="firstName" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Your first name" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input 
                  id="lastName" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Your last name" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input 
                id="email" 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded-md" 
                placeholder="Your email address" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
              <input 
                id="phone" 
                type="tel" 
                className="w-full p-2 border border-gray-300 rounded-md" 
                placeholder="Your phone number" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                className="w-full p-2 border border-gray-300 rounded-md" 
                rows={5} 
                placeholder="Your message"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Information</h2>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <a href="tel:+13363654052" className="text-gray-700 hover:text-blue-500">336-365-4052</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <a href="mailto:ncbbps@gmail.com" className="text-gray-700 hover:text-blue-500">ncbbps@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Request a quote for our professional cleaning services today.
        </p>
        <Link href="/get-quote" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get a Quote
        </Link>
      </div>
    </div>
  );
} 