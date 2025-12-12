"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import Row from "./Row";
import Column from "./Column";
import Typography from "./Typography";

interface ToastProps {
  visible?: boolean;
  onClose?: () => void;
  name?: string;
  message?: string;
  showProfile?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const Toast: React.FC<ToastProps> = ({
  visible = true,
  onClose,
  name = "joe",
  message = "Hey, Welcome back",
  showProfile = true,
  position = "top-right",
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!visible && !isVisible) return null;

  const getPositionClass = (pos: string) => {
    switch (pos) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  const getAnimationClass = (pos: string) => {
    if (pos.includes("right")) {
      return isVisible
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0";
    } else {
      return isVisible
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0";
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out ${getPositionClass(
        position
      )} ${getAnimationClass(position)}`}
    >
      <div
        className="relative w-full max-w-xs p-4 bg-white rounded-lg shadow-sm"
        role="alert"
      >
        <div className="absolute top-2 right-2">
          <Icon
            name="Cancel01Icon"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <Row className="gap-2 pr-4">
          {showProfile && (
            <div className="relative inline-block shrink-0">
              <Image src="/hero.png" width={34} height={34} alt="hero-icon" />
            </div>
          )}

          <Column>
            <Typography variant="sm" weight="semibold">
              👋 Hey, {name}
            </Typography>
            <Typography variant="xs" color="text-slate" className="ml-6">
              {message}
            </Typography>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default Toast;
