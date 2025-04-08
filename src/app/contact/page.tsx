import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Big Brother Property Solutions",
  description: "Get in touch with Big Brother Property Solutions for all your cleaning needs. Request a quote or ask questions about our services.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg mb-8">
            Have questions about our services or want to request a quote? Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Your last name" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email address" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Your phone number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this regarding?" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" rows={5} />
            </div>
            
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              Send Message
            </Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Information</h2>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
            <div className="space-y-6">
              <ContactItem 
                icon={<Phone className="h-6 w-6 text-secondary" />}
                title="Phone"
                content="336-365-4052"
                link="tel:+13363654052"
              />
              
              <ContactItem 
                icon={<Mail className="h-6 w-6 text-secondary" />}
                title="Email"
                content="ncbbps@gmail.com"
                link="mailto:ncbbps@gmail.com"
              />
              
              <ContactItem 
                icon={<MapPin className="h-6 w-6 text-secondary" />}
                title="Office"
                content="1200 Eastchester Dr, High Point, NC Ste. 203"
                link="https://maps.google.com/?q=1200+Eastchester+Dr,+High+Point,+NC"
              />
              
              <ContactItem 
                icon={<Clock className="h-6 w-6 text-secondary" />}
                title="Hours"
                content="Monday-Friday: 7am-5pm"
              />
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden h-80 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.593456090756!2d-80.0110233!3d35.9944444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853e79c5e8d6563%3A0x2a3b1572574473ef!2s1200%20Eastchester%20Dr%2C%20High%20Point%2C%20NC%2027265!5e0!3m2!1sen!2sus!4v1712662626133!5m2!1sen!2sus" 
              width="100%" 
              height="320" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Request a quote for our professional cleaning services today.
        </p>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
          <Link href="/get-quote">Get a Quote</Link>
        </Button>
      </div>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

function ContactItem({ icon, title, content, link }: ContactItemProps) {
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <a href={link} className="hover:text-secondary transition-colors">
          {children}
        </a>
      );
    }
    return <>{children}</>;
  };

  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <ContentWrapper>
          <p className="text-gray-700">{content}</p>
        </ContentWrapper>
      </div>
    </div>
  );
} 