import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import JobCategories from "@/components/job-categories";
import ServicesSection from "@/components/services-section";
import JobListings from "@/components/job-listings";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <JobCategories />
      <ServicesSection />
      <JobListings />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
