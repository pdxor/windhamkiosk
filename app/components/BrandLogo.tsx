import Image from "next/image";

export const THEME_LINE =
  "Bringing back the neighborhood — 50s mountain style";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  variant?: "header" | "hero";
};

const variantDefaults: Record<
  NonNullable<BrandLogoProps["variant"]>,
  { imageClassName: string; showTagline: boolean }
> = {
  header: {
    imageClassName: "h-16 w-auto sm:h-[4.5rem]",
    showTagline: true,
  },
  hero: {
    imageClassName: "h-28 w-auto sm:h-36 lg:h-44",
    showTagline: true,
  },
};

export function BrandLogo({
  className = "",
  imageClassName,
  showTagline,
  variant = "header",
}: BrandLogoProps) {
  const defaults = variantDefaults[variant];
  const resolvedImageClass = imageClassName ?? defaults.imageClassName;
  const resolvedShowTagline = showTagline ?? defaults.showTagline;

  return (
    <a
      href="#top"
      className={`inline-flex max-w-full items-center gap-3 sm:gap-4 ${className}`}
    >
      <span
        className={
          variant === "hero"
            ? "shrink-0 rounded-[var(--radius)] border-2 border-white/80 bg-white/95 p-2 shadow-[0_12px_40px_rgba(47,52,51,0.18)] sm:p-3"
            : "shrink-0"
        }
      >
        <Image
          src="/logo.jpg"
          alt="KIOSK — Keeping It Open, Supportive and Kind"
          width={200}
          height={200}
          unoptimized
          priority={variant === "hero"}
          className={`${resolvedImageClass} object-contain`}
        />
      </span>
      {resolvedShowTagline ? (
        <span className="min-w-0">
          <span className="brand-heading block text-xl font-bold leading-none text-[var(--earth-brown)] sm:text-2xl lg:text-3xl">
            KIOSK
          </span>
          <span className="mt-1 block text-xs font-medium text-[var(--charcoal)] sm:text-sm">
            Windham, Ashland &amp; Jewett
          </span>
        </span>
      ) : null}
    </a>
  );
}
