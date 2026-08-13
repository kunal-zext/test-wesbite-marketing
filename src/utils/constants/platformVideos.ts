/**
 * Platform walkthrough videos shown in the home `PlatformSection`.
 */

export type PlatformVideoMode = "beginner" | "professional";

export type PlatformVideo = {
  mode: PlatformVideoMode;
  name: string;
  description: string;
  /** Direct media URL */
  contentUrl: string;
  /** Public thumbnail/poster image */
  thumbnailUrl: string;
};

export const PLATFORM_VIDEO_UPLOAD_DATE = "2026-07-07";

export const PLATFORM_VIDEOS: readonly PlatformVideo[] = [
  {
    mode: "beginner",
    name: "Zext AI Platform — Beginner Walkthrough",
    description:
      "A beginner-friendly walkthrough of the Zext AI platform: a governed AI operating layer built inside your environment.",
    contentUrl:
      "https://s3.ap-south-1.amazonaws.com/zextdigital.ai.2.0/assets/platform-videos/Zext+AI+Platform+Video-Final+-+Beginner.mp4",
    thumbnailUrl:
      "https://s3.ap-south-1.amazonaws.com/zextdigital.ai.2.0/assets/platform-videos/thumbnail-beginner-walkthrough.jpeg",
  },
  {
    mode: "professional",
    name: "Zext AI Platform — Technical Walkthrough",
    description:
      "A technical walkthrough of the Zext AI platform: a governed AI operating layer built inside your environment.",
    contentUrl:
      "https://s3.ap-south-1.amazonaws.com/zextdigital.ai.2.0/assets/platform-videos/Zext+AI+Platform+Video-Final+-+Professional.mp4",
    thumbnailUrl:
      "https://s3.ap-south-1.amazonaws.com/zextdigital.ai.2.0/assets/platform-videos/thumbnail-technical-walkthrough.jpeg",
  },
] as const;

export const PLATFORM_VIDEO_SOURCES: Record<PlatformVideoMode, string> = {
  beginner: PLATFORM_VIDEOS[0].contentUrl,
  professional: PLATFORM_VIDEOS[1].contentUrl,
};
