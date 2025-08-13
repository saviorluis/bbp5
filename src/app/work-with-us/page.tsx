import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Us | Big Brother Property Solutions",
  description: "Join our team at Big Brother Property Solutions. Explore career opportunities and become a subcontractor with us.",
};

export default function WorkWithUsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Work With Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg mb-6">
            Big Brother Property Solutions is always looking for talented professionals to join our team. If you're passionate about providing exceptional cleaning services and want to be part of a growing company, we'd love to hear from you.
          </p>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold">Why Work With Us?</h3>
            <ul className="space-y-3">
              <BenefitItem text="Competitive pay and flexible schedules" />
              <BenefitItem text="Opportunity for growth and advancement" />
              <BenefitItem text="Supportive and inclusive work environment" />
              <BenefitItem text="Training and professional development" />
              <BenefitItem text="Be part of a respected local business" />
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Current Openings</h3>
            <div className="space-y-4">
              <JobCard 
                title="Cleaning Technician" 
                type="Full-time / Part-time" 
                location="High Point, NC" 
              />
              <JobCard 
                title="Team Lead" 
                type="Full-time" 
                location="High Point, NC" 
              />
              <JobCard 
                title="Office Administrator" 
                type="Part-time" 
                location="High Point, NC" 
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Apply Now / Aplicar Ahora</h2>
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
            <p className="text-lg mb-4">
              Complete our comprehensive application form to join our team!
            </p>
            <p className="text-base text-gray-600 mb-6">
              <em>¡Complete nuestro formulario de aplicación integral para unirse a nuestro equipo!</em>
            </p>
            
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link 
                href="YOUR_GOOGLE_FORM_URL"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now / Aplicar Ahora
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Become a Subcontractor</h2>
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
          Are you an experienced cleaning professional or do you own a small cleaning business? Partner with Big Brother Property Solutions as a subcontractor and grow your business with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BenefitCard 
            title="Consistent Work"
            description="Access to a steady stream of cleaning projects throughout the year."
          />
          <BenefitCard 
            title="Timely Payments"
            description="Reliable payment schedule so you can focus on providing quality service."
          />
          <BenefitCard 
            title="Business Growth"
            description="Opportunity to expand your business and build a long-term partnership."
          />
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
            <Link href="/contact">Contact Us to Apply</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <CheckCircle2 className="h-5 w-5 text-secondary" />
      </div>
      <span>{text}</span>
    </div>
  );
}

interface JobCardProps {
  title: string;
  type: string;
  location: string;
}

function JobCard({ title, type, location }: JobCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-gray-600 text-sm mb-3">{type} | {location}</p>
      <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white">
        View Details
      </Button>
    </div>
  );
}

interface BenefitCardProps {
  title: string;
  description: string;
}

function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
} 