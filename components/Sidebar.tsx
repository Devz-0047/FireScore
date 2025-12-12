"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import Button from "./Button";
import Typography from "./Typography";
import Tooltip from "./Tooltip";
import Row from "./Row";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  children?: { path: string; label: string }[];
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  navItems: NavItem[];
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  navItems,
}: SidebarProps) {
  const pathname = usePathname();
  const desktopSidebarWidth = collapsed ? 64 : 256;
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname.startsWith(item.path);
    const isExpanded = expandedItems.has(item.path);
    const hasChildren = item.children && item.children.length > 0;

    const linkBase =
      "flex gap-1.5 items-center p-2.5 rounded-lg transition-colors";
    const linkHover = "hover:bg-mist";
    const linkActive = "border border-mist shadow-sm hover:bg-white";

    const linkContent = (
      <Link
        href={item.path}
        className={`${linkBase} ${linkHover} ${isActive ? linkActive : ""}`}
      >
        <Icon
          name={item.icon}
          className={`${isActive ? "text-secondary" : "text-stone"}`}
        />
        {!collapsed && (
          <span
            className={`text-sm truncate ${
              isActive ? "text-secondary" : "text-stone"
            }`}
          >
            {item.label}
          </span>
        )}
        {hasChildren && !collapsed && (
          <Icon
            name={isExpanded ? "ArrowLeft01Icon" : "ArrowRight01Icon"}
            className="ml-auto text-stone"
            size="16"
          />
        )}
      </Link>
    );

    const mainItem = (
      <li key={item.path}>
        {collapsed ? (
          <Tooltip content={item.label} right>
            <div
              onClick={() =>
                hasChildren
                  ? toggleExpanded(item.path)
                  : setMobileOpen((prev) => !prev)
              }
            >
              {linkContent}
            </div>
          </Tooltip>
        ) : (
          <div
            onClick={() =>
              hasChildren
                ? toggleExpanded(item.path)
                : setMobileOpen((prev) => !prev)
            }
          >
            {linkContent}
          </div>
        )}

        {hasChildren && isExpanded && !collapsed && (
          <ul className="ml-4 mt-2 space-y-1">
            {item.children!.map((child) => {
              const isChildActive = pathname === child.path;
              const childLinkBase =
                "flex gap-1.5 items-center p-2 rounded-lg transition-colors";
              const childLinkHover = "hover:bg-mist";
              const childLinkActive =
                "border border-mist shadow-sm hover:bg-white";

              return (
                <li key={child.path}>
                  <Link
                    href={child.path}
                    className={`${childLinkBase} ${childLinkHover} ${
                      isChildActive ? childLinkActive : ""
                    }`}
                    onClick={() => setMobileOpen((prev) => !prev)}
                  >
                    <Icon
                      name="ArrowRight01Icon"
                      className="text-stone"
                      size="12"
                    />
                    <span
                      className={`text-sm truncate ${
                        isChildActive ? "text-secondary" : "text-stone"
                      }`}
                    >
                      {child.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );

    return mainItem;
  };

  return (
    <aside
      className={`
        fixed z-40 inset-y-0 left-0 bg-white border-r border-fog transition-all duration-300
        w-64 sm:${collapsed ? "w-16" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
      `}
      style={{ width: desktopSidebarWidth }}
    >
      <Row className="relative h-15 justify-center px-2 border-b border-fog cursor-pointer">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={50} height={80} />
          {!collapsed && (
            <Typography weight="semibold" variant="base">
              FireScore
            </Typography>
          )}
        </Link>

        <Button
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-silver rounded-md p-0.5 cursor-pointer shadow hover:bg-cloud"
          onClick={() => setCollapsed((prev) => !prev)}
          ariaLabel={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          icon={collapsed ? "ArrowRight01Icon" : "ArrowLeft01Icon"}
          iconClassName="text-stone"
          iconSize="16"
        />
      </Row>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* {!collapsed && (
          <Typography className="p-2.5" color="text-stone"></Typography>
        )} */}
        <ul className="space-y-2">{navItems.map(renderNavItem)}</ul>
      </nav>
    </aside>
  );
}
