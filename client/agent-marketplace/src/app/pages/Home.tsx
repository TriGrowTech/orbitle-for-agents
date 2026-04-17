import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { StripCarousel } from '../components/StripCarousel';
import { AdCarousel } from '../components/AdCarousel';
import { TrendingPackages } from '../components/TrendingPackages';
import { DomesticPackages } from '../components/DomesticPackages';
import { InternationalPackages } from '../components/InternationalPackages';
import { DestinationsCarousel } from '../components/DestinationsCarousel';
import { TravelThemes } from '../components/TravelThemes';
import { PlanTourForm } from '../components/PlanTourForm';
import { WhyTrustUs } from '../components/WhyTrustUs';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { DestinationsStrip } from '../components/DestinationsStrip';
import { Footer } from '../components/Footer';
import { LeadCaptureModal } from '../components/LeadCaptureModal';
import { ChatbotButton } from '../components/ChatbotButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Topbar />
      <Navbar />
      <HeroSection />
      <StripCarousel />
      <AdCarousel />
      <TrendingPackages />
      <DomesticPackages />
      <InternationalPackages />
      <DestinationsCarousel />
      <TravelThemes />
      <PlanTourForm />
      <WhyTrustUs />
      <Testimonials />
      <FAQ />
      <DestinationsStrip />
      <Footer />
      <LeadCaptureModal />
      <ChatbotButton />
    </div>
  );
}