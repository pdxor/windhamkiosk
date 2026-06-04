import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "light";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--forest-green)] text-white shadow-[0_10px_24px_rgba(78,123,106,0.22)] hover:bg-[var(--forest-green-hover)]",
  secondary:
    "border border-[var(--earth-brown)] bg-white/90 text-[var(--earth-brown)] hover:border-[var(--forest-green)] hover:text-[var(--forest-green)]",
  light:
    "border border-white/30 bg-white/10 text-white hover:bg-white/20",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
