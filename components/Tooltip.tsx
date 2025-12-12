"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  children?: React.ReactNode;
  content: string;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  className?: string;
  dark?: boolean;
  light?: boolean;
}

export default function Tooltip({
  children,
  content,
  top,
  right,
  bottom,
  left,
  className = "",
  dark = false,
  light = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState("top");
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  // Ensure component is mounted on client to avoid SSR issues with document
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine placement string from props
  const placementString = top
    ? "top"
    : right
    ? "right"
    : bottom
    ? "bottom"
    : left
    ? "left"
    : "top";

  useEffect(() => {
    setPlacement(placementString);
  }, [placementString]);

  // Calculate tooltip position relative to the target container
  useEffect(() => {
    if (!visible || !containerRef || !tooltipRef) return;

    const containerRect = containerRef.getBoundingClientRect();
    const tooltipRect = tooltipRef.getBoundingClientRect();

    let topPos = 0;
    let leftPos = 0;

    switch (placementString) {
      case "top":
        topPos = containerRect.top - tooltipRect.height - 8; // 8px gap
        leftPos =
          containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "right":
        topPos =
          containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
        leftPos = containerRect.right + 8;
        break;
      case "bottom":
        topPos = containerRect.bottom + 8;
        leftPos =
          containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        topPos =
          containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
        leftPos = containerRect.left - tooltipRect.width - 8;
        break;
      default:
        break;
    }

    // Prevent tooltip from going off-screen (optional, you can add this)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (leftPos < 0) leftPos = 8;
    if (leftPos + tooltipRect.width > viewportWidth)
      leftPos = viewportWidth - tooltipRect.width - 8;
    if (topPos < 0) topPos = 8;
    if (topPos + tooltipRect.height > viewportHeight)
      topPos = viewportHeight - tooltipRect.height - 8;

    setPosition({ top: topPos, left: leftPos });
  }, [visible, placementString, containerRef, tooltipRef]);

  const baseStyles = twMerge(
    "fixed z-50 px-2 py-1 text-xs rounded shadow-md transition-opacity duration-200 whitespace-nowrap",
    dark
      ? "bg-abyss text-fog"
      : light
      ? "bg-white text-abyss"
      : "bg-fog text-abyss"
  );

  const arrowBase = twMerge(
    "absolute w-2.5 h-2.5 rotate-45",
    dark ? "bg-abyss" : light ? "bg-white" : "bg-fog"
  );

  const arrowPosition: Record<string, string> = {
    top: "left-1/2 -bottom-1.5 -translate-x-1/2",
    right: "-left-1.5 top-1/2 -translate-y-1/2",
    bottom: "left-1/2 -top-1.5 -translate-x-1/2",
    left: "-right-1.5 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      ref={setContainerRef}
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {mounted && visible && content
        ? createPortal(
            <div
              ref={setTooltipRef}
              style={{ top: position.top, left: position.left }}
              className={twMerge(baseStyles, className)}
            >
              {content}
              <div className={twMerge(arrowBase, arrowPosition[placement])} />
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
