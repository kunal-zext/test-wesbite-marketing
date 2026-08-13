"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/utils";

type VideoMode = "beginner" | "professional";

type PlatformVideoPlayerProps = {
  sources: { beginner: string; professional: string };
  poster?: string;
  className?: string;
};

type FullscreenableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenableDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type IOSVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PlatformVideoPlayer({
  sources,
  poster,
  className,
}: PlatformVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isScrubbingRef = useRef(false);
  const pendingPlaybackRef = useRef<{
    wasPlaying: boolean;
    wasMuted: boolean;
  } | null>(null);

  const [activeMode, setActiveMode] = useState<VideoMode>("beginner");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const switchMode = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      pendingPlaybackRef.current = {
        wasPlaying: !video.paused,
        wasMuted: video.muted,
      };
    }
    setActiveMode((prev) =>
      prev === "beginner" ? "professional" : "beginner",
    );
  }, []);

  const seekFromClientX = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar) return;
    if (!Number.isFinite(video.duration) || video.duration === 0) return;

    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (clientX - rect.left) / rect.width),
    );
    const next = ratio * video.duration;
    video.currentTime = next;
    setCurrentTime(next);
  }, []);

  const startScrub = useCallback(
    (clientX: number) => {
      isScrubbingRef.current = true;
      seekFromClientX(clientX);

      const handleMouseMove = (e: MouseEvent) => seekFromClientX(e.clientX);
      const handleTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) seekFromClientX(t.clientX);
      };
      const handleEnd = () => {
        isScrubbingRef.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleEnd);
        window.removeEventListener("touchcancel", handleEnd);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
      window.addEventListener("touchcancel", handleEnd);
    },
    [seekFromClientX],
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current as FullscreenableElement | null;
    const video = videoRef.current as IOSVideoElement | null;
    const doc = document as FullscreenableDocument;

    const fullscreenElement =
      doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;

    if (!fullscreenElement) {
      if (container?.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container?.webkitRequestFullscreen) {
        await container.webkitRequestFullscreen();
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncDurationFromVideo = () => {
      setDuration((prev) => {
        const d = video.duration;
        if (!Number.isFinite(d) || d <= 0) return prev;
        return d === prev ? prev : d;
      });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);
    const handleTimeUpdate = () => {
      if (isScrubbingRef.current) return;
      setCurrentTime(video.currentTime);
    };
    const handleDurationChange = () => syncDurationFromVideo();
    const handleEmptied = () => {
      setCurrentTime(0);
      setDuration(0);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadedmetadata", handleDurationChange);
    video.addEventListener("loadeddata", handleDurationChange);
    video.addEventListener("canplay", handleDurationChange);
    video.addEventListener("progress", handleDurationChange);
    video.addEventListener("emptied", handleEmptied);

    syncDurationFromVideo();

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("loadedmetadata", handleDurationChange);
      video.removeEventListener("loadeddata", handleDurationChange);
      video.removeEventListener("canplay", handleDurationChange);
      video.removeEventListener("progress", handleDurationChange);
      video.removeEventListener("emptied", handleEmptied);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const pending = pendingPlaybackRef.current;
    if (!pending) return;
    pendingPlaybackRef.current = null;

    const { wasPlaying, wasMuted } = pending;
    setIsMuted(wasMuted);

    if (wasPlaying) {
      requestAnimationFrame(() => {
        const v = videoRef.current;
        if (v) void v.play();
      });
    }
  }, [activeMode]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* autoplay may be blocked; user can press play manually */
          });
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.2, 0.45] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as FullscreenableDocument;
      const fullscreenElement =
        doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
      setIsFullscreen(fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  const controlsVisible = !isPlaying || isHovering;
  const toggleLabel =
    activeMode === "beginner"
      ? "Watch the technical walkthrough"
      : "Watch the beginner-friendly walkthrough";
 
  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={cn(
          "group relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_60px_-30px_rgba(0,0,0,0.7)]",
          isFullscreen ? "aspect-auto h-full" : "aspect-video",
        )}
      >
        <video
          ref={videoRef}
          src={sources[activeMode]}
          poster={poster}
          loop
          playsInline
          muted={isMuted}
          preload="auto"
          onClick={togglePlay}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />

        <AnimatePresence>
          {controlsVisible && (
            <motion.button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={cn(
                "absolute top-1/2 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-white/20 bg-white/10 backdrop-blur-md",
                "text-white transition-[background-color,border-color] duration-200",
                "hover:border-white/35 hover:bg-white/20",
                "sm:h-20 sm:w-20",
              )}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 fill-white sm:h-9 sm:w-9" />
              ) : (
                <Play className="ml-0.5 h-7 w-7 fill-white sm:ml-1 sm:h-9 sm:w-9" />
              )}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {controlsVisible && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute right-0 bottom-0 left-0 z-10 bg-linear-to-t from-black/65 via-black/25 to-transparent px-3 pt-8 pb-3 sm:px-4 sm:pt-10 sm:pb-4"
            >
              <div
                ref={progressBarRef}
                onMouseDown={(e) => {
                  e.preventDefault();
                  startScrub(e.clientX);
                }}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  if (t) startScrub(t.clientX);
                }}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={currentTime}
                tabIndex={0}
                className="group/progress relative h-1 w-full cursor-pointer touch-none rounded-full bg-white/15 transition-[height] duration-150 hover:h-1.5"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_0_4px_rgba(255,255,255,0.15)] transition-opacity duration-150 group-hover/progress:opacity-100"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between gap-3 sm:mt-3">
                <span className="font-mono text-[11px] text-white/75 tabular-nums sm:text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-[background-color,border-color] duration-200 hover:border-white/30 hover:bg-black/65 sm:h-10 sm:w-10",
                    )}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    ) : (
                      <Volume2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-[background-color,border-color] duration-200 hover:border-white/30 hover:bg-black/65 sm:h-10 sm:w-10",
                    )}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    ) : (
                      <Maximize className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={switchMode}
          aria-pressed={activeMode === "professional"}
          className={cn(
            "rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md transition-[background-color,border-color,color] duration-200 hover:border-white/30 hover:bg-black/65 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm",
          )}
        >
          {toggleLabel}
        </button>
      </div>
    </div>
  );
}

export default PlatformVideoPlayer;
