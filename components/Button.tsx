"use client";

import React from "react";
import Icon from "./Icon";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

type ButtonProps = {
  text?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "reject";
  size?: "xs" | "sm" | "md" | "lg" | string;
  width?: string;
  icon?: string | React.ReactNode;
  iconSize?: number | string;
  iconClassName?: string;
  noText?: boolean;
  className?: string;
  ariaLabel?: string;
  navigateTo?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const variantClasses: Record<string, string> = {
  primary: "bg-secondary text-white hover:bg-secondary",
  secondary: "bg-pre-primary text-secondary border border-secondary",
  ghost: "bg-cloud border border-fog text-slate text-xs hover:bg-fog",
  reject: "bg-alert/10  border border-alert text-alert hover:bg-alert/20",
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "text-sm",
  width,
  icon,
  iconSize = 18,
  iconClassName = "text-lg mr-2",
  noText = false,
  className = "",
  ariaLabel,
  onClick,
  navigateTo,
  disabled,
  type,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  const baseClasses =
    "my-auto inline-flex items-center text-nowrap justify-center cursor-pointer rounded-lg px-4 py-2 font-medium";

  const variantClass = variantClasses[variant] || "";
  const classesToMerge = [
    baseClasses,
    variantClass,
    size,
    width,
    className,
  ].filter(Boolean);
  const finalClasses = twMerge(...classesToMerge);

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <Icon
          name={icon}
          size={iconSize}
          className={twMerge("inline-flex", iconClassName)}
        />
      );
    }

    return (
      <span className={twMerge("inline-flex", iconClassName)}>{icon}</span>
    );
  };

  return (
    <button
      disabled={disabled}
      className={finalClasses}
      onClick={handleClick}
      aria-label={ariaLabel}
      type={type ?? "button"}
    >
      {renderIcon()}
      {!noText && <span>{text}</span>}
    </button>
  );
};

export default Button;
