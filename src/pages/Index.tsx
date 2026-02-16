import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import UrgentAppeals from "@/components/home/UrgentAppeals";
import Testimonials from "@/components/home/Testimonials";
import { toast } from "sonner";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("donation") === "success") {
      toast.success("Thank you for your generous donation! May Allah reward you.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <Layout>
      <HeroSection />
      <ImpactStats />
      <FeaturedProjects />
      <UrgentAppeals />
      <Testimonials />
    </Layout>
  );
};

export default Index;
