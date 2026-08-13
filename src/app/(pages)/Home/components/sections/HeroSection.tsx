import HeroRotatingLastWord from "./HeroRotatingLastWord";
import SphereObject from "@/app/components/ui/3dObjects/SphereObject";
import HeroExploreServicesButton from "./HeroExploreServicesButton";
import ButtonBadge from "@/app/components/ui/Badge/ButtonBadge";
import LightRays from "@/app/components/ui/LightRays/LightRays";
import StarsBackground from "@/app/components/ui/StarsBackground/StarsBackground";
import { cn } from "@/utils";

const HeroSection = () => {
  return (
    <section id="hero" className="w-full h-full overflow-x-hidden min-w-0">
      <div className="pointer-events-none absolute inset-0 z-0">
        <StarsBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 z-2">
        <LightRays />
      </div>
      <div className="pointer-events-none absolute inset-0 z-1 flex flex-wrap translate-y-6 items-center justify-center gap-6 px-2 md:translate-y-5 md:gap-8 lg:translate-y-8 lg:gap-14">
        <SphereObject />
      </div>
      <div className="relative z-20 mx-auto flex max-w-6xl min-h-[calc(100dvh-9.5rem)] flex-col items-center justify-center overflow-visible px-4 sm:px-5 sm:min-h-[calc(100dvh-10rem)] md:min-h-[calc(100dvh-10.5rem)] md:px-6 lg:min-h-[calc(100dvh-6rem)] 2xl:max-w-[1600px]">
        <div className="my-auto flex h-fit min-h-[min(50dvh,28rem)] w-full items-center justify-center pt-6 sm:pt-8 md:pt-10 lg:min-h-[50vh] lg:pt-6">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-7 md:gap-8">
            <ButtonBadge className="mx-auto flex items-center gap-2 px-4 py-1.5 lg:mx-0">
              <span className="relative flex size-1.5">
                <span className="animate-ping absolute inline-flex size-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full size-1.5 bg-secondary shadow-[0_0_8px_rgba(143,224,255,0.55)]"></span>
              </span>
              <span className="text-[10px] font-medium uppercase text-center tracking-[0.15em] text-white md:text-[11px] 2xl:text-xs">
                From AI Ambition to AI Execution
              </span>
            </ButtonBadge>
            <div className="heading flex w-full min-w-0 justify-center">
              <h1 className="w-fit max-w-full text-center text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl md:leading-[1.08] lg:text-6xl 2xl:text-8xl">
                <span className="block text-white">
                  <span className="hero-word text-balance">
                    We don't pitch AI
                  </span>
                </span>
                <span className="hero-title-glow mt-1 flex min-w-[18rem] justify-center sm:mt-2 sm:min-w-88 md:min-w-md lg:min-w-136 2xl:min-w-4xl">
                  {["We", "make", "it"].map((word) => (
                    <span key={word} className="hero-word">
                      <span className="hero-word-inner hero-title-gradient-animated">
                        {word}
                      </span>
                      {"\u00A0"}
                    </span>
                  ))}
                  <HeroRotatingLastWord />
                </span>
              </h1>
            </div>
            <p className="flex flex-wrap justify-center gap-2 text-center">
              {[
                "Highly customised",
                "Genuinely fast",
                "Built for results",
                "Built to last",
              ].map((phrase, i) => (
                <span
                  key={i}
                  className={cn(
                    "mx-auto max-w-2xl text-center text-sm font-medium leading-relaxed text-white/60 md:text-[0.9375rem] lg:text-base 2xl:text-lg",
                    "lg:border-r-2 lg:border-white/50 lg:pr-2 last:lg:border-r-0 last:lg:pr-0",
                  )}
                >
                  {phrase}
                </span>
              ))}
            </p>
            <p className="mx-auto max-w-2xl text-center text-sm font-medium leading-relaxed text-white/60 md:text-[0.9375rem] lg:text-base 2xl:text-lg">
              Deployed in weeks, not years.
            </p>
            <HeroExploreServicesButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
