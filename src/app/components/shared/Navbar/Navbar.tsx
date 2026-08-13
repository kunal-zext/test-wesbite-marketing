"use client";

import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/utils";
import {
  CONTACT_PHONE_TEL,
  SECTION_IDS,
  homeHashPath,
} from "@/utils/homeAnchors";
import AnimatedButton from "@/app/components/ui/AnimatedButton/AnimatedButton";
import {
  HomeHashLink,
  useHomeHashClick,
} from "@/app/components/shared/HomeHashLink/HomeHashLink";
import { useState, useRef, useEffect, type MouseEvent } from "react";
import { LogoHomeLink } from "@/app/components/shared/LogoHomeLink/LogoHomeLink";

export type NavDropdownItem = {
  label: string;
  description: string;
  href: string;
};

export type NavLink =
  | {
      label: string;
      href: string;
      hasArrow?: boolean;
      /** Mobile menu uses this instead of `href` (e.g. tel:). Desktop nav still uses `href`. */
      mobileHref?: string;
    }
  | {
      label: string;
      hasArrow?: boolean;
      dropdown: readonly NavDropdownItem[];
      megaFooter?: {
        title: string;
        description: string;
        href: string;
      };
    };

export const navLinks: NavLink[] = [
  {
    label: "Services",
    href: homeHashPath(SECTION_IDS.services),
    hasArrow: true,
  },
  { label: "Products", href: homeHashPath(SECTION_IDS.products) },
  { label: "Clients", href: homeHashPath(SECTION_IDS.clients) },
  {
    label: "Zext",
    hasArrow: true,
    dropdown: [
      {
        label: "Why Us",
        description: "Purpose, principles, and how we partner",
        href: homeHashPath(SECTION_IDS.whyUs),
      },
      {
        label: "Sectors",
        description: "Industries and contexts we build for",
        href: homeHashPath(SECTION_IDS.industries),
      },
      {
        label: "Our Thinking",
        description: "Perspectives on AI, delivery, and scale",
        href: homeHashPath(SECTION_IDS.ourThinking),
      },
      {
        label: "Team",
        description: "Founders and the people behind the work",
        href: homeHashPath(SECTION_IDS.founders),
      },
    ],
    megaFooter: {
      title: "Zext platform",
      description:
        "Explore how we orchestrate advisory, content, training, and web delivery with clarity and governance.",
      href: homeHashPath(SECTION_IDS.platform),
    },
  },
  {
    label: "Contact",
    href: homeHashPath(SECTION_IDS.getStarted),
    mobileHref: CONTACT_PHONE_TEL,
  },
];

interface NavbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function isNavDropdown(
  link: NavLink,
): link is Extract<NavLink, { dropdown: readonly NavDropdownItem[] }> {
  return "dropdown" in link && Array.isArray(link.dropdown);
}

const Navbar = ({ onMenuToggle, isMobileMenuOpen = false }: NavbarProps) => {
  const handleHomeHashClick = useHomeHashClick();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const updateIndicator = (index: number) => {
    if (navRef.current) {
      const slots = navRef.current.querySelectorAll("[data-nav-slot]");
      const slot = slots[index];
      if (slot) {
        const navRect = navRef.current.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();
        setIndicatorStyle({
          left: slotRect.left - navRect.left,
          width: slotRect.width,
        });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "w-full h-16 sm:h-20 from-background to-transparent bg-linear-to-b pt-4 sm:pt-6 fixed top-0 z-100 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="max-w-[1600px] px-4 sm:px-5 md:px-6 h-full mx-auto w-full flex items-center justify-between gap-2 md:gap-4">
        <div
          className={`w-full max-w-[160px] sm:max-w-[200px] h-full flex items-center justify-start transform transition-all duration-700 ${
            hasAnimated
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          <LogoHomeLink className="inline-flex" draggable={false}>
            <Image
              src="/assets/Logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="max-h-[40px] w-auto object-contain mix-blend-difference select-none"
              style={{ width: "auto" }}
              priority
              quality={100}
              loading="eager"
              unoptimized
              draggable={false}
            />
          </LogoHomeLink>
        </div>

        <nav
          ref={navRef}
          className="hidden lg:flex flex-1 items-center justify-center relative whitespace-nowrap"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={cn(
              "absolute bg-secondary/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] rounded-md pointer-events-none",
              "transition-all duration-300 ease-in-out",
              hoveredIndex === null
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100",
            )}
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              height: "calc(100%)",
            }}
          />
          {navLinks.map((link, index) => {
            if (isNavDropdown(link)) {
              const open = hoveredIndex === index;
              return (
                <div
                  key={index}
                  data-nav-slot
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    updateIndicator(index);
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      "relative z-10 flex items-center gap-1 rounded-md px-4 py-1.5 text-base font-medium text-shadow-xs text-shadow-black transition-all duration-700 ease-in-out select-none md:px-7",
                      hasAnimated
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-10 opacity-0",
                      open ? "text-secondary" : "text-[#f6f6fd]",
                    )}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-controls={`zext-nav-menu-${index}`}
                    id={`zext-nav-trigger-${index}`}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 opacity-80 transition-transform duration-300 ease-in-out",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`zext-nav-menu-${index}`}
                    role="menu"
                    aria-labelledby={`zext-nav-trigger-${index}`}
                    className={cn(
                      "absolute left-1/2 top-full z-50 isolate w-[min(100vw-2rem,40rem)] max-w-[1600px] md:max-w-7xl60 -translate-x-1/2 pt-3 whitespace-normal",
                      "transition-all duration-300 ease-in-out",
                      open
                        ? "visible scale-100 opacity-100"
                        : "invisible pointer-events-none scale-95 opacity-0",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl border border-white/10 bg-[#222a4f] whitespace-normal",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_-16px_rgba(0,0,0,0.9),0_0_40px_-8px_rgba(143,224,255,0.07)]",
                      )}
                    >
                      <div className="p-5 sm:p-6">
                        <div className="grid auto-rows-auto grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0.5">
                          {link.dropdown.map((item) => (
                            <HomeHashLink
                              key={item.href}
                              href={item.href}
                              scroll={false}
                              role="menuitem"
                              className="group block min-w-0 max-w-full rounded-lg px-3 py-3 transition-colors hover:bg-white/6"
                              onClick={() => setHoveredIndex(null)}
                            >
                              <span className="block max-w-full wrap-break-word text-[15px] font-semibold leading-tight tracking-tight text-[#f2f2f8] transition-colors group-hover:text-secondary">
                                {item.label}
                              </span>
                              <span className="mt-1 block max-w-full wrap-break-word text-[13px] leading-relaxed text-white/45 transition-colors group-hover:text-white/60">
                                {item.description}
                              </span>
                            </HomeHashLink>
                          ))}
                        </div>
                      </div>
                      {link.megaFooter ? (
                        <div className="w-full max-w-full whitespace-normal border-t border-white/10 bg-[#171d3d] px-5 py-4 sm:px-6">
                          <HomeHashLink
                            href={link.megaFooter.href}
                            scroll={false}
                            role="menuitem"
                            className="group block w-full min-w-0 max-w-full rounded-lg px-3 py-2.5 transition-colors hover:bg-white/4"
                            onClick={() => setHoveredIndex(null)}
                          >
                            <span className="block max-w-full wrap-break-word text-[15px] font-semibold leading-tight tracking-tight text-[#f2f2f8] transition-colors group-hover:text-secondary">
                              {link.megaFooter.title}
                            </span>
                            <span className="mt-1.5 block max-w-full wrap-break-word text-[13px] leading-relaxed text-white/45 transition-colors group-hover:text-white/60">
                              {link.megaFooter.description}
                            </span>
                          </HomeHashLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} data-nav-slot className="relative">
                <HomeHashLink
                  href={link.href}
                  scroll={false}
                  className={`relative z-10 text-base font-medium text-shadow-xs text-shadow-black rounded-md text-[#f6f6fd] px-4 md:px-7 py-1.5 transition-all duration-700 ease-in-out select-none ${
                    hasAnimated
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                  draggable={false}
                  onClick={() => setHoveredIndex(null)}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    updateIndicator(index);
                  }}
                >
                  {link.label}
                </HomeHashLink>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3 h-full w-full max-w-[160px] sm:max-w-[200px]">
          <div
            className={cn(
              "hidden lg:block transition-all duration-700 ease-in-out",
              hasAnimated
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0",
            )}
            style={{ transitionDelay: "700ms" }}
          >
            <AnimatedButton
              href={homeHashPath(SECTION_IDS.getStarted)}
              scroll={false}
              size="md"
              className="shrink-0 w-auto max-w-none"
              onClick={(e) =>
                handleHomeHashClick(
                  e as unknown as MouseEvent<HTMLAnchorElement>,
                  homeHashPath(SECTION_IDS.getStarted),
                )
              }
            >
              Book Consultation
            </AnimatedButton>
          </div>

          <button
            onClick={onMenuToggle}
            className={`lg:hidden flex items-center justify-center w-10 h-10 text-white transition-all duration-700 ${
              hasAnimated ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
