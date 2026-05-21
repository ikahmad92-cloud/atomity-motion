import clsx from "clsx";
import { type MouseEventHandler, type ReactNode } from "react";
import { Loader } from "../loader";

type ButtonVariant =
  | "primary"
  | "success"
  | "error"
  | "outline-primary"
  | "outline-success"
  | "outline-error";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  btnText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
}

export default function Button({
  type = "button",
  className = "",
  onClick,
  leftIcon,
  rightIcon,
  btnText,
  isLoading = false,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-accentPrimary text-bgPrimary",
    success: "bg-accentSuccess text-bgPrimary",
    error: "bg-accentError text-bgPrimary",
    "outline-primary":
      "border border-accentPrimary text-accentPrimary bg-transparent",
    "outline-success":
      "border border-accentSuccess text-accentSuccess bg-transparent",
    "outline-error":
      "border border-accentError text-accentError bg-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "relative flex items-center justify-center gap-2.5 overflow-hidden",
        "h-11 px-6 rounded-full",
        " text-sm sm:text-base font-semibold",
        "transition-all duration-200",
        isDisabled
          ? "cursor-not-allowed opacity-50 grayscale"
          : "hover:scale-[1.03] active:scale-[0.98]",
        variantClasses[variant],
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bgPrimary z-10">
          <Loader size={22} />
        </div>
      )}

      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{btnText ?? "Button"}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
