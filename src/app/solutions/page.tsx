import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services & Solutions | Big Brother Property Solutions",
  description: "Professional cleaning services for all types of projects. From Commercial/Industrial to Residential, BBPS is the brand you can trust.",
};

export default function SolutionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Services & Solutions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <ServiceCard 
          title="Janitorial" 
          description="From apartments to hotels, we specialize in making every property spotless and sparkling clean. We understand the importance of creating a clean and comfortable environment for our clients."
          imageUrl="/images/services-janitorial.jpg"
        />
        
        <ServiceCard 
          title="Residential" 
          description="Professional and experienced cleaners provide the highest level of service for residential properties, ensuring your home is clean and comfortable."
          imageUrl="/images/services-residential.jpg"
        />
        
        <ServiceCard 
          title="Airbnb" 
          description="We take great care in providing thorough and efficient cleaning services for Airbnb hosts. You can trust us to leave your rental spotless and ready for your next guests."
          imageUrl="/images/services-airbnb.jpg"
        />
        
        <ServiceCard 
          title="Post-Construction" 
          description="We have a dedicated team of highly skilled professionals who work tirelessly to ensure that every post-construction cleanup job is completed to the highest standard."
          imageUrl="/images/services-construction.jpg"
        />
        
        <ServiceCard 
          title="Office Buildings" 
          description="With our comprehensive approach to cleaning, we can accommodate any cleaning needs for your office building, ensuring a professional environment."
          imageUrl="/images/services-office.jpg"
        />
        
        <ServiceCard 
          title="Commercial" 
          description="We specialize in commercial properties and understand the importance of maintaining a clean and professional appearance for your business."
          imageUrl="/images/services-commercial.jpg"
        />
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Need a Customized Solution?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          We offer tailored cleaning solutions to meet your specific needs. Contact us today to discuss how we can help.
        </p>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
          <Link href="/get-quote">Get a Quote</Link>
        </Button>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
} 