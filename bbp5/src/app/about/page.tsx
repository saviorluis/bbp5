import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Big Brother Property Solutions",
  description: "Learn about Big Brother Property Solutions - a Latino owned and operated cleaning service providing high quality service to our diverse community.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Our Company</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          <div className="md:w-1/2">
            <Image 
              src="/images/about-company.jpg" 
              alt="Big Brother Property Solutions Team" 
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              Big Brother Property Solutions is a Latino owned and operated business, providing high-quality cleaning services to our diverse community. We understand the importance of a clean and healthy environment, whether it's your home, office, or commercial property.
            </p>
            <p className="text-lg mb-4">
              Founded with a commitment to excellence, we have built our reputation on reliability, attention to detail, and customer satisfaction. Our experienced team of professionals takes pride in delivering exceptional results for every cleaning project.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              title="Quality" 
              description="We are committed to delivering the highest quality cleaning services, ensuring every detail is addressed to your satisfaction."
            />
            <ValueCard 
              title="Reliability" 
              description="You can count on us to show up on time and complete the job as promised, every time."
            />
            <ValueCard 
              title="Integrity" 
              description="We operate with honesty and transparency in all our interactions with clients and employees."
            />
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg shadow-inner mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitItem text="Experienced & professional cleaning team" />
            <BenefitItem text="Eco-friendly cleaning products" />
            <BenefitItem text="Customized cleaning solutions" />
            <BenefitItem text="Consistent, reliable service" />
            <BenefitItem text="Competitive pricing" />
            <BenefitItem text="Fully insured and bonded" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg mb-4">
            Contact us today to learn more about our services and how we can help with your cleaning needs.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ValueCardProps {
  title: string;
  description: string;
}

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-lg">{text}</span>
    </div>
  );
} 