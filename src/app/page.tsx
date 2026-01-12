import Navbar from "./components2/Navbar";
import Footer from "./components2/Footer";
import HeroSection from "./components2/FeatureSection";
import FeaturesSection from "./components2/FeatureSection";
import HowItWorksSection from "./components2/HowItWorksSection";
import CTASection from "./components2/ctaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
