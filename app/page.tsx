import { Hero } from "@/components/home/Hero";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PopularLocations } from "@/components/home/PopularLocations";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <PropertyCategories />
      <FeaturedProperties />
      <WhyChooseUs />
      <HowItWorks />
      <PopularLocations />
      <Testimonials />
    </>
  );
}
