import Image from "next/image";

export const THEME_LINE =
  "Bringing back the neighborhood — 50s mountain style";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  variant?: "header" | "hero";
  href?: string;
};

const variantDefaults: Record<
  NonNullable<BrandLogoProps["variant"]>,
  { imageClassName: string; showTagline: boolean }
> = {
  header: {
    imageClassName:
      "h-[4.25rem] w-auto drop-shadow-[0_2px_14px_rgba(255,255,255,0.85)] sm:h-24",
    showTagline: false,
  },
  hero: {
    imageClassName:
      "h-28 w-auto drop-shadow-[0_4px_20px_rgba(255,255,255,0.9)] sm:h-36 lg:h-44",
    showTagline: false,
  },
};

export function BrandLogo({
  className = "",
  imageClassName,
  showTagline,
  variant = "header",
  href = "/",
}: BrandLogoProps) {
  const defaults = variantDefaults[variant];
  const resolvedImageClass = imageClassName ?? defaults.imageClassName;
  const resolvedShowTagline = showTagline ?? defaults.showTagline;

  return (
    <a
      href={href}
      className={`inline-flex max-w-full shrink-0 items-center ${className}`}
    >
      <Image
        src="/logo.jpg"
        alt="KIOSK — Keeping It Open, Supportive and Kind"
        width={200}
        height={200}
        unoptimized
        priority={variant === "header" || variant === "hero"}
        className={`${resolvedImageClass} object-contain`}
      />
      {resolvedShowTagline ? (
        <span className="min-w-0 ps-3 sm:ps-4">
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
