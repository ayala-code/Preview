import HeroSection from '@/components/home/hero-section';
import AboutShort from '@/components/home/about-short';
import PlatterGallery from '@/components/home/platter-gallery';
import AdvantagesSection from '@/components/home/advantages-section';

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <HeroSection />
      <AboutShort />
      <PlatterGallery />
      <AdvantagesSection />
    </div>
  );
}
