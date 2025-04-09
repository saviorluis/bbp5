import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";

export const metadata: Metadata = {
  title: "Services & Solutions | Big Brother Property Solutions",
  description: "Professional cleaning services for all types of projects. From Commercial/Industrial to Residential, BBPS is the brand you can trust.",
};

export default function SolutionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Services & Solutions</h1>
      
      {/* Commercial Services Section */}
      <section className="mb-16">
        <div className="bg-secondary/10 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-secondary">Commercial Services</h2>
          <p className="text-lg mb-4">
            Keep your business looking professional with our comprehensive commercial cleaning solutions.
            From small offices to large corporate buildings, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Office Buildings" 
            description="With our comprehensive approach to cleaning, we can accommodate any cleaning needs for your office building, ensuring a professional environment."
            imageUrl="/images/services-office.jpg"
          />
          
          <ServiceCard 
            title="Restaurants" 
            description="Specialized cleaning for food service establishments including deep kitchen cleaning, hood and vent degreasing, grease trap maintenance, pressure washing for grease spills, and front-of-house sanitization to maintain health code compliance."
            imageUrl="/images/services-commercial.jpg"
          />
          
          <ServiceCard 
            title="Retail Locations" 
            description="Create a positive shopping experience with our specialized retail cleaning services, focusing on high-traffic areas and display showcases."
            imageUrl="/images/services-commercial.jpg"
          />
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
            <Link href="/get-quote?service=commercial">Get Commercial Quote</Link>
          </Button>
        </div>
      </section>
      
      {/* Residential Services Section */}
      <section className="mb-16">
        <div className="bg-primary/10 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">Residential Services</h2>
          <p className="text-lg mb-4">
            From exterior cleaning to specialized services, we'll keep your home looking pristine and well-maintained.
            Our residential cleaning solutions are tailored to your property's specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Exterior Home Cleaning" 
            description="Revitalize your home's exterior with our comprehensive cleaning services including soft washing for siding, roof cleaning, gutter cleaning, window washing, and pressure washing for driveways, walkways, and patios."
            imageUrl="/images/services-residential.jpg"
          />
          
          <ServiceCard 
            title="Airbnb & Rental Properties" 
            description="We take great care in providing thorough and efficient cleaning services for Airbnb hosts. You can trust us to leave your rental spotless and ready for your next guests."
            imageUrl="/images/services-airbnb.jpg"
          />
          
          <ServiceCard 
            title="Move-In/Move-Out" 
            description="Ensure your new home is perfectly clean before moving in, or get your security deposit back with our comprehensive move-out cleaning services."
            imageUrl="/images/services-residential.jpg"
          />
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/get-quote?service=residential">Get Residential Quote</Link>
          </Button>
        </div>
      </section>
      
      {/* Industrial Services Section */}
      <section className="mb-16">
        <div className="bg-accent/10 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-accent">Industrial Services</h2>
          <p className="text-lg mb-4">
            Our industrial cleaning solutions address the unique challenges of manufacturing, warehouses, and construction sites.
            We provide specialized equipment and expertise for the toughest cleaning jobs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Post-Construction" 
            description="We have a dedicated team of highly skilled professionals who work tirelessly to ensure that every post-construction cleanup job is completed to the highest standard."
            imageUrl="/images/services-construction.jpg"
          />
          
          <ServiceCard 
            title="Warehouses & Factories" 
            description="Our industrial cleaning services handle large spaces, heavy machinery areas, and specialized cleaning needs for manufacturing environments."
            imageUrl="/images/services-commercial.jpg"
          />
          
          <ServiceCard 
            title="Industrial Equipment" 
            description="Specialized cleaning for industrial machinery and equipment to ensure optimal performance, extend equipment lifespan, and maintain safe operating conditions."
            imageUrl="/images/services-commercial.jpg"
          />
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
            <Link href="/get-quote?service=industrial">Get Industrial Quote</Link>
          </Button>
        </div>
      </section>
      
      {/* Janitorial Services Section */}
      <section className="mb-16">
        <div className="bg-purple-600/10 p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Janitorial Services</h2>
          <p className="text-lg mb-4">
            Our professional janitorial services maintain clean, healthy, and safe environments for various facilities with specialized protocols for each industry.
            We provide regular scheduled maintenance with trained staff and state-of-the-art equipment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Medical Facilities" 
            description="Specialized cleaning protocols for healthcare environments including hospitals, clinics, and medical offices with strict adherence to infection control standards, proper handling of biohazards, and EPA-registered disinfectants."
            imageUrl="/images/services-janitorial.jpg"
          />
          
          <ServiceCard 
            title="Educational Institutions" 
            description="Comprehensive cleaning for schools, colleges, and universities with focus on high-touch surfaces, classroom sanitization, and maintaining healthy learning environments while working around academic schedules."
            imageUrl="/images/services-office.jpg"
          />
          
          <ServiceCard 
            title="Commercial Complexes" 
            description="Professional cleaning services for shopping malls, large retail centers, and multi-tenant buildings with high-volume foot traffic, featuring specialized floor care, public restroom maintenance, and common area cleaning."
            imageUrl="/images/services-janitorial.jpg"
          />
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
            <Link href="/get-quote?service=janitorial">Get Janitorial Services Quote</Link>
          </Button>
        </div>
      </section>
      
      <div className="text-center mb-12 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Need a Customized Solution?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          We offer tailored cleaning solutions to meet your specific needs. Contact us today to discuss how we can help.
        </p>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
          <Link href="/get-quote">Get a Personalized Quote</Link>
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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