type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  const eyebrowColor = light ? "text-[var(--sage)]" : "text-[var(--forest-green)]";
  const titleColor = light ? "text-white" : "text-[var(--earth-brown)]";
  const bodyColor = light ? "text-white/84" : "text-[var(--charcoal)]";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <p className={`text-sm font-bold uppercase tracking-wide ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2
        className={`brand-heading mt-4 text-3xl font-bold leading-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-lg leading-8 ${bodyColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
