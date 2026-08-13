export default function BlogPageBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(140,82,255,0.08),transparent_18%)]" />
      <div className="absolute left-0 top-0 size-[560px] rounded-full bg-secondary/5 blur-[90px]" />
      <div className="absolute right-0 top-[22%] size-[480px] rounded-full bg-violet-500/5 blur-[80px]" />
      <div className="absolute bottom-0 left-[35%] size-[520px] rounded-full bg-emerald-500/4 blur-[85px]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
