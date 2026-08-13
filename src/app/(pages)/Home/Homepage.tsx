import CTASection from "./components/sections/CTASection";
import FAQSection from "./components/sections/FAQSection";
import FoundersSection from "./components/sections/FoundersSection";
import HeroSection from "./components/sections/HeroSection";
import ProblemStatementSection from "./components/sections/ProblemStatementSection";
import IndustriesSection from "./components/sections/IndustriesSection";
import OurClientsSection from "./components/sections/OurClientsSection";
import OurThinkingSection from "./components/sections/OurThinkingSection";
import PlatformSection from "./components/sections/PlatformSection";
import ProductsSection from "./components/sections/ProductsSection";
import ServiceSection from "./components/sections/ServiceSection";
import WhyUsSection from "./components/sections/WhyUsSection";
import EthosSection from "./components/sections/EthosSection";
import {
  PLATFORM_VIDEOS,
  PLATFORM_VIDEO_UPLOAD_DATE,
} from "@/utils/constants/platformVideos";
import { SITE_URL } from "@/utils/constants/site";

/**
 * `VideoObject` structured data for the platform walkthrough videos in
 * `PlatformSection`. Without this (or a video sitemap) Google reports zero
 * discovered videos — a bare `<video>` tag alone isn't reliably indexed.
 */
function buildPlatformVideosJsonLd() {
  return PLATFORM_VIDEOS.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: PLATFORM_VIDEO_UPLOAD_DATE,
    contentUrl: video.contentUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Zext Digital",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/Logo.png`,
      },
    },
  }));
}

const Homepage = () => {
  const videosJsonLd = buildPlatformVideosJsonLd();

  return (
    <>
      {/* Platform-video VideoObject structured data. `<` escaped to prevent XSS. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videosJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <ProblemStatementSection />
      <ServiceSection />
      <ProductsSection />
      <PlatformSection />
      <IndustriesSection />
      <WhyUsSection />
      <EthosSection />
      <OurThinkingSection />
      <OurClientsSection />
      <FoundersSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default Homepage;
