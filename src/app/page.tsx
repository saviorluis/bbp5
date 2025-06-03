import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <FeaturedCategories />
      <WhyChooseUs />
      <CTASection />
      <QuoteForm />
    </>
  );
}
