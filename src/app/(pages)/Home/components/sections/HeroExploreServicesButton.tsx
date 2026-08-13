"use client";

import AnimatedButton from "@/app/components/ui/AnimatedButton";
import {
  useHomeHashClick,
} from "@/app/components/shared/HomeHashLink/HomeHashLink";
import { SECTION_IDS, homeHashPath } from "@/utils/homeAnchors";
import type { MouseEvent } from "react";

const servicesHref = homeHashPath(SECTION_IDS.services);

export default function HeroExploreServicesButton() {
  const handleHomeHashClick = useHomeHashClick();

  return (
    <AnimatedButton
      href={servicesHref}
      scroll={false}
      className="w-fit mx-auto lg:mx-0"
      onClick={(e) =>
        handleHomeHashClick(
          e as unknown as MouseEvent<HTMLAnchorElement>,
          servicesHref,
        )
      }
    >
      Explore Services
    </AnimatedButton>
  );
}
