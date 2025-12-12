import React, { JSX, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Tooltip from "./Tooltip";

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  variant?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  color?: string;
  className?: string;
  lineHeight?: string;
  tooltip?: string;
};

const variantClasses: Record<
  NonNullable<TypographyProps["variant"]>,
  string
> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const weightClasses: Record<NonNullable<TypographyProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses: Record<NonNullable<TypographyProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const Typography: React.FC<TypographyProps> = ({
  as: Tag = "p",
  children,
  variant = "sm",
  weight = "normal",
  align = "left",
  color = "text-abyss",
  className = "",
  lineHeight = "leading-[150%]",
  tooltip,
}) => {
  const classes = twMerge(
    variantClasses[variant],
    weightClasses[weight],
    alignClasses[align],
    lineHeight,
    color,
    className
  );

  const content = <Tag className={classes}>{children}</Tag>;

  return tooltip ? (
    <Tooltip content={tooltip} top>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

export default Typography;
