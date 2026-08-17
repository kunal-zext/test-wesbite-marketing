import type { Metadata } from "next";
import { Instrument_Serif, Inter, Space_Grotesk } from "next/font/google";
import StudioShell from "./StudioShell";
import {
  Contact,
  FaqSection,
  Footer,
  Hero,
  Manifesto,
  Nerve,
  Services,
  Signal,
  Stats,
} from "./components/Sections";
import "./studio.css";

/*
 * Self-hosted through next/font rather than the design's Google Fonts <link>:
 * no third-party connection on the critical path, and the fallback metrics are
 * generated automatically so the oversized display type does not shift on load.
 */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zext Digital | Websites that refuse to be scrolled past",
  description:
    "An independent design and engineering studio. Strategy, identity, interface, motion and engineering under one roof, shipped in a nine-week median.",
  openGraph: {
    title: "Zext Digital | Websites that refuse to be scrolled past",
    description:
      "Independent design & engineering studio. Strategy, identity, interface, motion and engineering under one roof.",
    type: "website",
  },
};

export default function StudioPage() {
  return (
    <div
      className={`${grotesk.variable} ${instrument.variable} ${inter.variable}`}
    >
      <StudioShell>
        <Hero />
        <Manifesto />
        <Nerve />
        <Services />
        <Stats />
        <Signal />
        <FaqSection />
        <Contact />
        <Footer />
      </StudioShell>
    </div>
  );
}
