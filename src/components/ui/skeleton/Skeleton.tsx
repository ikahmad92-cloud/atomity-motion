import React from "react";
type SkeletonVariant = "rect" | "text" | "circle" | "rounded";
type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";
type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  size?: SkeletonSize;
  animation?: SkeletonAnimation;
  className?: string;
}

const sizeToClassMap: Record<SkeletonSize, string> = {
  xs: "h-2",
  sm: "h-3",
  md: "h-4",
  lg: "h-6",
  xl: "h-8",
  full: "h-full",
};

const variantToClassMap: Record<SkeletonVariant, string> = {
  text: "rounded",
  rect: "",
  circle: "rounded-full",
  rounded: "rounded-lg",
};

function mergeClassNames(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(" ");
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rect",
  size = "md",
  animation = "pulse",
  width,
  height,
  className,
  style,
  ...props
}) => {
  const dimensionStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  const baseClasses = mergeClassNames(
    "bg-textPrimary opacity-10 relative overflow-hidden",
    size ? sizeToClassMap[size] : undefined,
    variantToClassMap[variant],
    animation === "pulse" && "animate-pulse",
    animation === "wave" && "skeleton-wave",
    className
  );

  return <div className={baseClasses} style={dimensionStyle} {...props} />;
};

export default Skeleton;


