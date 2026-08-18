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
  Build,
  Pillar,
  Services,
  Signal,
  Stats,
  Work,
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
        {/*
         * The running order is the argument, and it runs in one direction:
         *
         *      Hero      the promise, and the ask
         *   01 Manifesto why us — its sentence breaks off mid-clause
         *      Nerve     the glass answers it. These two are one beat; keep
         *                them adjacent or the sentence never completes.
         *   02 Services  what we sell
         *   03 Pillars   what a good website has to do
         *   04 Process   how we get there            ← moved up from 8th
         *   05 Build     what that process hands you ← answers 03 and 04
         *      Work      renders nothing while WORK is empty, which is how it
         *                ships: there is no publishable work yet. Adding
         *                entries makes it 06 and pushes the three below down.
         *   06 Stats     proof in numbers
         *   07 FAQ       the objections that remain
         *   08 Contact   the ask again, now earned
         *
         * Process used to sit eighth, after all the proof, even though the
         * hero opens by promising it ("Send a brief. The first call starts the
         * build."). Stats used to sit fifth, asking the reader to take numbers
         * on trust before anything had been demonstrated. Swapping them lets
         * evidence follow the claim it supports instead of preceding it.
         */}
        <Hero />
        <Manifesto />
        <Nerve />
        <Services />
        <Pillar />
        <Signal />
        <Build />
        <Work />
        <Stats />
        <FaqSection />
        <Contact />
        <Footer />
      </StudioShell>
    </div>
  );
}
