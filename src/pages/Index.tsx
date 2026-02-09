import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import UrgentAppeals from "@/components/home/UrgentAppeals";
import Testimonials from "@/components/home/Testimonials";

const Index = () => {
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
