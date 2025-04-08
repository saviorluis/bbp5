"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Building2, Home, Building, Hotel, Construction } from "lucide-react";

const services = [
  {
    id: "janitorial",
    title: "Janitorial",
    description: "With over a decade of experience, we specialize in office buildings and commercial properties. Our team of experienced cleaners will ensure that your business is sparkling clean and ready for business, no matter the time of day.",
    icon: <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    href: "/services/janitorial",
  },
  {
    id: "residential",
    title: "Residential",
    description: "From apartments to hotels, we specialize in making every property spotless and sparkling clean. We understand the importance of creating a clean and comfortable environment for our clients, whether they are guests in a hotel or homeowners.",
    icon: <Home className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    href: "/services/residential",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Our commercial cleaning services are designed to meet the unique needs of businesses of all sizes. We provide comprehensive cleaning solutions that maintain a clean and professional environment for your employees and customers.",
    icon: <Building className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    href: "/services/commercial",
  },
  {
    id: "airbnb",
    title: "Airbnb",
    description: "At Big Brother Property Solutions, we understand the importance of cleanliness, especially for Airbnb hosts. We know firsthand how important it is to have a clean and welcoming space for your Airbnb guests, which is why we take great care in providing thorough cleaning services.",
    icon: <Hotel className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    href: "/services/airbnb",
  },
  {
    id: "post-construction",
    title: "Post-Construction",
    description: "We pride ourselves on providing exceptional cleaning services, including post-construction cleanup, to clients just like you. We have a dedicated team of highly skilled and experienced professionals who work tirelessly to ensure that every job is completed to the highest standard.",
    icon: <Construction className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    href: "/services/post-construction",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-primary">OUR SERVICES</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            We Offer a Range of Services to Meet All Types of Needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <Link href={service.href} key={service.id} className="h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-accent/20">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="mb-3 sm:mb-4 flex justify-center sm:justify-start">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/services"
            className="flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-md transition-colors"
          >
            ALL SERVICES
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
