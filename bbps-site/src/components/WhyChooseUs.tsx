"use client";

import { DollarSign, Award, Clock } from 'lucide-react';

const features = [
  {
    id: "fair-pricing",
    icon: <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    title: "Fair & Transparent Pricing",
    description: "Our pricing is straightforward and competitive. You'll know exactly what you're paying for with no hidden fees or surprises.",
  },
  {
    id: "expertise",
    icon: <Award className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    title: "Experienced Professionals",
    description: "Our team consists of skilled individuals who have received professional cleaning services training and always prioritize client satisfaction.",
  },
  {
    id: "satisfaction",
    icon: <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />,
    title: "Satisfaction Guarantee",
    description: "If you're not completely satisfied with our service, let us know within 24 hours and we'll make it right.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-primary">WHY CHOOSE US?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            We're committed to providing exceptional cleaning services that exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 hover:border-accent/20 border border-transparent">
              <div className="mb-3 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
