import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
};

export function BrandLogo({
  className = "",
  imageClassName = "h-12 w-auto sm:h-14",
  showTagline = true,
}: BrandLogoProps) {
  return (
    <a href="#top" className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.jpg"
        alt="KIOSK — Keeping It Open, Supportive and Kind"
        width={160}
        height={160}
        unoptimized
        priority
        className={`${imageClassName} object-contain`}
      />
      {showTagline ? (
        <span className="hidden min-[420px]:block">
          <span className="brand-heading block text-lg font-bold leading-none text-[var(--earth-brown)] sm:text-xl">
            KIOSK
          </span>
          <span className="mt-0.5 block text-xs font-medium text-[var(--charcoal)]">
            Windham, Ashland &amp; Jewett
          </span>
        </span>
      ) : null}
    </a>
  );
}
