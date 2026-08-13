"use client";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HashScrollHandler from "../components/shared/HashScrollHandler/HashScrollHandler";
import Navbar, { navLinks } from "../components/shared/Navbar/Navbar";
import MobileMenu from "../components/shared/MobileMenu/MobileMenu";
import Footer from "../components/shared/Footer/Footer";
import NewsletterSection from "../components/shared/NewsletterSection/NewsletterSection";
import CustomCursor from "../components/ui/CustomCursor/CustomCursor";
import NewsletterFloater from "../components/ui/NewsletterFloater/NewsletterFloater";
import AcademyFloater from "../components/ui/AcademyFloater/AcademyFloater";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [showLayout, setShowLayout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const noShowPages: string[] = ["/zext-academy", "/studio"];
  const noNewsLetter = ["/newsletter"];
  // Routes that draw their own pointer treatment and must not get the global one.
  const noCursorPages: string[] = ["/studio"];
  const [noFooter, setNoFooter] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // `trailingSlash: true` makes usePathname() return e.g. "/zext-academy/",
    // so normalise before matching the standalone/no-footer route lists.
    const path = pathname.replace(/\/+$/, "") || "/";
    // A standalone entry hides global chrome for that route AND its sub-routes
    // (e.g. "/zext-academy" also covers "/zext-academy/book").
    const isStandalone = noShowPages.some(
      (p) => path === p || path.startsWith(`${p}/`),
    );
    setNoFooter(noNewsLetter.includes(path));
    setShowLayout(!isStandalone);
    setShowCursor(
      !noCursorPages.some((p) => path === p || path.startsWith(`${p}/`)),
    );
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {showCursor && <CustomCursor />}
      {showLayout && <NewsletterFloater />}
      {showLayout && <AcademyFloater />}
      <HashScrollHandler />
      {showLayout && (
        <Navbar
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          isMobileMenuOpen={mobileMenuOpen}
        />
      )}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
      <main
        key={pathname}
        className={`w-full min-h-screen ${showLayout ? "pt-20" : ""}`}
      >
        {children}
      </main>
      {showLayout && (
        <>
          {!noFooter && <NewsletterSection />}
          <Footer />
        </>
      )}
    </ReactLenis>
  );
};

export default LayoutWrapper;
