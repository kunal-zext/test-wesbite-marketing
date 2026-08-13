"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils";
import { HomeHashLink } from "@/app/components/shared/HomeHashLink/HomeHashLink";
import { CONTACT_PHONE_TEL } from "@/utils/homeAnchors";
import { isNavDropdown, type NavLink } from "../Navbar/Navbar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  return (
    <aside
      className={cn(
        "fixed inset-0 bg-background z-90 lg:hidden transition-all duration-500 ease-in-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto overscroll-contain px-6 pt-28 pb-8">
        <nav className="flex flex-col gap-6 pb-10">
          {navLinks.map((link, index) => {
            if (isNavDropdown(link)) {
              const expanded = openDropdownIndex === index;
              return (
                <div key={index} className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdownIndex(expanded ? null : index)
                    }
                    className={cn(
                      "group flex w-full items-center justify-between text-left text-white transition-all duration-300",
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    )}
                    style={{
                      transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                    }}
                    aria-expanded={expanded}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm text-white/40 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-4xl md:text-5xl font-bold uppercase group-hover:text-primary transition-colors duration-300">
                        {link.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-7 shrink-0 text-white/60 transition-transform duration-300",
                        expanded && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={cn(
                      "grid pl-4 transition-[grid-template-rows,opacity] duration-300 ease-out sm:pl-6",
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                    aria-hidden={!expanded}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#222a4f]/90 p-4">
                      {link.dropdown.map((item) => (
                        <HomeHashLink
                          key={item.href}
                          href={item.href}
                          scroll={false}
                          onClick={() => {
                            onClose();
                            setOpenDropdownIndex(null);
                          }}
                          className="block rounded-xl px-1 py-1 text-left transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="block text-base font-semibold text-[#f2f2f8]">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-white/40">
                            {item.description}
                          </span>
                        </HomeHashLink>
                      ))}
                      {link.megaFooter ? (
                        <div className="border-t border-white/10 pt-4">
                          <HomeHashLink
                            href={link.megaFooter.href}
                            scroll={false}
                            onClick={() => {
                              onClose();
                              setOpenDropdownIndex(null);
                            }}
                            className="block rounded-xl px-1 py-1 text-left transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="block text-base font-semibold text-[#f2f2f8]">
                              {link.megaFooter.title}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-white/40">
                              {link.megaFooter.description}
                            </span>
                          </HomeHashLink>
                        </div>
                      ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const mobileHref =
              "mobileHref" in link ? link.mobileHref : undefined;
            if (mobileHref) {
              return (
                <a
                  key={index}
                  href={mobileHref}
                  onClick={() => {
                    onClose();
                  }}
                  className={cn(
                    "group flex items-center justify-between text-white transition-all duration-300",
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm text-white/40 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-4xl md:text-5xl font-bold uppercase group-hover:text-primary transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                </a>
              );
            }

            return (
              <HomeHashLink
                key={index}
                href={link.href}
                scroll={false}
                onClick={() => {
                  onClose();
                }}
                className={cn(
                  "group flex items-center justify-between text-white transition-all duration-300",
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-white/40 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-4xl md:text-5xl font-bold uppercase group-hover:text-primary transition-colors duration-300">
                    {link.label}
                  </span>
                </div>
              </HomeHashLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 flex-col gap-6 border-t border-white/10 pt-8">
          <p className="text-white/60 text-sm max-w-md">
            Zext Digital helps organizations use AI, automation, analytics and
            strategic advisory to improve revenue, cost, operations and
            decision-making.
          </p>

          <a
            href={CONTACT_PHONE_TEL}
            onClick={() => {
              onClose();
            }}
            className="relative flex items-center justify-center gap-2 pr-4 pl-18 py-4 rounded-full bg-transparent text-white border border-white/60 hover:bg-white/10 transition-all duration-300 cursor-pointer group w-fit"
          >
            <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-white flex items-center justify-center transition-all duration-300 ease-in-out w-12 h-12 rounded-full group-hover:h-[calc(100%-0.8vh)] group-hover:w-[calc(100%-0.8vh)] group-hover:rounded-[inherit]">
              <ArrowUpRight className="size-5 text-black" />
            </div>
            <span className="text-sm font-medium">Book Consultation</span>
          </a>

          <p className="text-white/40 text-sm">
            Enterprise deployments across India | AI, automation, analytics and
            capability building
          </p>
        </div>
      </div>
    </aside>
  );
};

export default MobileMenu;
