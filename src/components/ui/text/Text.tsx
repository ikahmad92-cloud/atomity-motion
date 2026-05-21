import React from "react";
import clsx from "clsx";

export type TextSize =
  | 12 | 14 | 16 | 18 | 20
  | 22 | 24 | 26 | 28 | 32 | 36 | 38 | 40 | 44 | 48 | 50 | 52 | 55 | 84;

export type TextVariant =
  | "bgPrimary"
  | "textPrimary"
  | "accentPrimary"
  | "accentSuccess"
  | "accentError";

export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";

export interface TextProps {
  children: React.ReactNode;
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  className?: string;
  /** Render as different element (e.g. "span", "h1", "label") */
  as?: React.ElementType;
  /** Optional id for accessibility / linking */
  id?: string;
  /** Native title attribute passthrough */
  title?: string;
  /** Single line with ellipsis when overflow */
  truncate?: boolean;
  /** Max lines then ellipsis (e.g. 2 = line-clamp-2) */
  lineClamp?: 1 | 2 | 3 | 4 | 5;
}

// 12–18: fixed. 20+: clamp so min screen = min size, lg (1024px+) = max size (vw tuned for 1024px)
const sizeClasses: Record<TextSize, string> = {
  12: "text-[12px]",
  14: "text-[14px]",
  16: "text-[16px]",
  18: "text-[clamp(17px,1.85vw,18px)]",
  20: "text-[clamp(18px,1.95vw,20px)]",
  22: "text-[clamp(18px,2.15vw,22px)]",
  24: "text-[clamp(20px,2.35vw,24px)]",
  26: "text-[clamp(22px,2.54vw,26px)]",
  28: "text-[clamp(24px,2.73vw,28px)]",
  32: "text-[clamp(24px,3.13vw,32px)]",
  36: "text-[clamp(26px,3.52vw,36px)]",
  38: "text-[clamp(28px,3.71vw,38px)]",
  40: "text-[clamp(30px,3.91vw,40px)]",
  44: "text-[clamp(32px,4.3vw,44px)]",
  48: "text-[clamp(36px,4.81vw,48px)]",
  50: "text-[clamp(34px,5.08vw,50px)]",
  52: "text-[clamp(35px,5.08vw,52px)]",
  55: "text-[clamp(36px,5.52vw,55px)]",
  84: "text-[clamp(72px,8.42vw,84px)]",
};

const variantClasses: Record<TextVariant, string> = {
  bgPrimary: "text-bgPrimary",
  textPrimary: "text-textPrimary",
  accentPrimary: "text-accentPrimary",
  accentSuccess: "text-accentSuccess",
  accentError: "text-accentError",
};

const weightClasses: Record<TextWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const lineClampClasses: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
};

export default function Text({
  children,
  size = 16,
  variant = "textPrimary",
  weight = "normal",
  className,
  as: Component = "p",
  id,
  title,
  truncate = false,
  lineClamp,
}: TextProps) {
  return (
    <Component
      id={id}
      title={title}
      className={clsx(
        sizeClasses[size],
        variantClasses[variant],
        weightClasses[weight],
        truncate && "truncate",
        lineClamp != null && lineClampClasses[lineClamp],
        className      )}
    >
      {children}
    </Component>
  );
}
