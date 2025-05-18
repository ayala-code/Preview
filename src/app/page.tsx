import { Box } from "@mui/material";
import HeroSection from '@/components/home/hero-section';
import AboutShort from '@/components/home/about-short';
import PlatterGallery from '@/components/home/platter-gallery';
import AdvantagesSection from '@/components/home/advantages-section';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <HeroSection />
      <AboutShort />
      <PlatterGallery />
      <AdvantagesSection />
    </Box>
  );
}
