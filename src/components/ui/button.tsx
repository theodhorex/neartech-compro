import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  children,
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses =
    size === "sm"
      ? "px-5 py-2.5 text-sm"
      : "px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base";

  const baseClasses = `inline-flex items-center justify-center rounded-lg bg-[#191919] text-white font-medium hover:bg-[#191919]/90 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] select-none ${sizeClasses} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={baseClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type="button" className={baseClasses} {...buttonProps}>
      {children}
    </button>
  );
}
