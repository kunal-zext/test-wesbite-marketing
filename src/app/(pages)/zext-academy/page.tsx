import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { AcademyHero } from "./sections/AcademyHero";
import { ProblemSection } from "./sections/ProblemSection";
import { ComparisonSection } from "./sections/ComparisonSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { DeliverablesSection } from "./sections/DeliverablesSection";
import { RolePersonalizerSection } from "./sections/RolePersonalizerSection";
import { CurriculumSection } from "./sections/CurriculumSection";
import { ProofSection } from "./sections/ProofSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";

export default function ZextAcademyPage() {
  return (
    <>
      <AcademyHero />
      <ProblemSection />
      <ComparisonSection />
      <HowItWorksSection />
      <DeliverablesSection />
      <RolePersonalizerSection />
      <CurriculumSection />
      <ProofSection />
      <FAQSection />
      <FinalCTASection />
      <StickyMobileCTA />
    </>
  );
}
