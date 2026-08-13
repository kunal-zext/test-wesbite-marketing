"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { LogoHomeLink } from "@/app/components/shared/LogoHomeLink/LogoHomeLink";
import { cn } from "@/utils";
import FooterMumbaiClock from "@/app/components/shared/Footer/FooterMumbaiClock";
import { HomeHashLink } from "@/app/components/shared/HomeHashLink/HomeHashLink";
import { GlowingEffect } from "@/app/components/ui/GlowingEffect/GlowingEffect";
import {
  CONTACT_PHONE_TEL,
  homeHashPath,
  PRODUCT_ANCHOR_IDS,
  SECTION_IDS,
  serviceCardId,
} from "@/utils/homeAnchors";

type ConnectIcon = LucideIcon | ComponentType<{ className?: string }>;

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 132 132"
      fill="currentColor"
      className={className}
    >
      <path d="M66.004 18c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C18.06 51.327 18 52.964 18 66s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97c-3.18 0-5.76 2.577-5.76 5.758 0 3.18 2.58 5.76 5.76 5.76 3.18 0 5.76-2.58 5.76-5.76 0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C79.617 90.645 90.65 79.613 90.65 66S79.616 41.35 66.003 41.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z" />
    </svg>
  );
}

const footerLinks = {
  services: [
    { label: "AI Visibility & Revenue Systems", serviceIndex: 0 },
    { label: "Enterprise AI Automation", serviceIndex: 1 },
    { label: "AI Performance, Governance & Reliability", serviceIndex: 2 },
    { label: "Business Intelligence & Decision Systems", serviceIndex: 3 },
    { label: "AI-Augmented Strategy & Analytics", serviceIndex: 4 },
    { label: "AI Capability Building & Academy", serviceIndex: 5 },
  ],
  products: [
    {
      label: "Content Audit Agent",
      href: homeHashPath(PRODUCT_ANCHOR_IDS.contentAuditAgent),
    },
    {
      label: "Zext AI Platform",
      href: homeHashPath(SECTION_IDS.platform),
    },
  ],
  connect: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/zext-digital",
      icon: LinkedInBrandIcon,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/zextdigital/",
      icon: InstagramIcon,
    },
    {
      label: "X",
      href: "https://x.com/zextdigital",
      icon: XBrandIcon,
    },
    { label: "Email", href: "mailto:contact@zextdigital.ai", icon: Mail },
    {
      label: "Phone",
      href: homeHashPath(SECTION_IDS.getStarted),
      telHref: CONTACT_PHONE_TEL,
      icon: Phone,
    },
  ] satisfies Array<
    | { label: string; href: string; icon: ConnectIcon }
    | { label: string; href: string; telHref: string; icon: ConnectIcon }
  >,
  company: [
    { label: "Blogs", href: "/blogs" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    {
      label: "Contact",
      href: homeHashPath(SECTION_IDS.getStarted),
      telHref: CONTACT_PHONE_TEL,
    },
  ],
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative w-full border-t border-white/10 overflow-x-hidden pb-0"
    >
      <div className="max-w-[160vh] mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 lg:pt-14 xl:pt-16 pb-10 sm:pb-12 lg:pb-10 xl:pb-11">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
          <div className="lg:col-span-5">
            <LogoHomeLink
              className={`inline-block mb-4 sm:mb-6 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Image
                src="/assets/Logo.svg"
                alt="Zext Digital"
                width={140}
                height={40}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </LogoHomeLink>
            <p
              className={`text-sm sm:text-base text-white/60 leading-relaxed max-w-[40vh] transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Build practical AI transformation inside your business.
            </p>
            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "260ms" }}
            >
              <FooterMumbaiClock />
            </div>
          </div>

          <div className="relative z-10 lg:col-span-7 grid grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-4">
            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h4 className="text-[1vh] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 mb-4 sm:mb-6">
                Services
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {footerLinks.services.map((link, index) => (
                  <HomeHashLink
                    key={index}
                    href={homeHashPath(serviceCardId(link.serviceIndex))}
                    scroll={false}
                    className="group flex cursor-pointer items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <span className="wrap-break-word">{link.label}</span>
                    <ArrowUpRight className="size-2.5 sm:size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                  </HomeHashLink>
                ))}
              </div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h4 className="text-[1vh] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 mb-4 sm:mb-6">
                Products
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {footerLinks.products.map((link, index) => (
                  <HomeHashLink
                    key={index}
                    href={link.href}
                    scroll={false}
                    className="group flex cursor-pointer items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <span className="wrap-break-word">{link.label}</span>
                    <ArrowUpRight className="size-2.5 sm:size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                  </HomeHashLink>
                ))}
              </div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h4 className="text-[1vh] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 mb-4 sm:mb-6">
                Connect
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {footerLinks.connect.map((item, index) => {
                  const Icon = item.icon;
                  const connectLinkClass =
                    "group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300";
                  const arrow = (
                    <ArrowUpRight className="size-2.5 sm:size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                  );
                  if ("telHref" in item) {
                    return (
                      <div key={index}>
                        <HomeHashLink
                          href={item.href}
                          scroll={false}
                          className={cn(connectLinkClass, "hidden lg:flex")}
                        >
                          <Icon
                            className="size-3 sm:size-4 shrink-0"
                            aria-hidden
                          />
                          <span>{item.label}</span>
                          {arrow}
                        </HomeHashLink>
                        <a
                          href={item.telHref}
                          className={cn(connectLinkClass, "lg:hidden")}
                        >
                          <Icon
                            className="size-3 sm:size-4 shrink-0"
                            aria-hidden
                          />
                          <span>{item.label}</span>
                          {arrow}
                        </a>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={connectLinkClass}
                    >
                      <Icon className="size-3 sm:size-4 shrink-0" aria-hidden />
                      <span>{item.label}</span>
                      {arrow}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div
              className={`transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "550ms" }}
            >
              <h4 className="text-[1vh] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/40 mb-4 sm:mb-6">
                Company
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {footerLinks.company.map((link, index) => {
                  const companyLinkClass =
                    "group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-300";
                  const arrow = (
                    <ArrowUpRight className="size-2.5 sm:size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                  );
                  if ("telHref" in link) {
                    return (
                      <div key={index}>
                        <HomeHashLink
                          href={link.href}
                          scroll={false}
                          className={cn(companyLinkClass, "hidden lg:flex")}
                        >
                          <span className="wrap-break-word">{link.label}</span>
                          {arrow}
                        </HomeHashLink>
                        <a
                          href={link.telHref}
                          className={cn(companyLinkClass, "lg:hidden")}
                        >
                          <span className="wrap-break-word">{link.label}</span>
                          {arrow}
                        </a>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={companyLinkClass}
                    >
                      <span className="wrap-break-word">{link.label}</span>
                      {arrow}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-[1vh] sm:text-xs text-white/40">
            &copy; 2026 Zext Digital LLP. All rights reserved.
          </p>
          <p className="text-[1vh] sm:text-xs text-white/40">
            Incorporated June 2025 • Mumbai, India
          </p>
        </div>
      </div>

      <div
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-background"
        aria-hidden={false}
      >
        <div className="relative isolate flex min-h-[clamp(4.5rem,32vw,20rem)] w-full min-w-0 items-center justify-center overflow-hidden py-1 sm:min-h-[clamp(6rem,28vw,18rem)] sm:py-2 md:min-h-[clamp(8rem,26vw,19rem)]">
          {"ZEXTDIGITAL".split("").map((letter, i) => (
            <div
              key={i}
              className={`inline-flex shrink-0 items-center justify-center rounded-sm transform transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${680 + i * 45}ms` }}
            >
              <span className="relative inline-block rounded-sm">
                <GlowingEffect
                  spread={30}
                  glow={false}
                  disabled={false}
                  proximity={40}
                  inactiveZone={0.01}
                  borderWidth={2}
                  backgroundAttachment="scroll"
                />
                <span
                  className="relative z-1 inline-block cursor-default select-none font-black uppercase leading-[0.78] [text-rendering:geometricPrecision] transition-transform duration-200 ease-out"
                  style={{
                    fontSize: "clamp(2.75rem, calc(100vw / 6.35), 140rem)",
                    letterSpacing: "0",
                    color: "#1a2348",
                    WebkitTextStroke: "min(0.05em, 0.3vh)#4b5a8f",
                    paintOrder: "stroke fill",
                  }}
                >
                  {letter}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
