"use client";

import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "./Toast";

// ---- STATIC USER ----
interface StaticUser {
  id: number;
  name: string;
  user_level: 2 | 3 | 5;
  category_id?: number;
}

const staticUser: StaticUser = {
  id: 1,
  name: "John Doe",
  user_level: 2,
};

// ---- STATIC NAV ITEMS ----
const allNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: "DashboardSquare01Icon" },
  { path: "/player", label: "Player", icon: "GameIcon" },
  { path: "/score", label: "Score", icon: "BoardMathIcon" },
];

function getStaticNav(user: StaticUser) {
  if (!user) return [];

  return allNavItems; // simplified since all allowed
}

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navItems = getStaticNav(staticUser);
  const contentPaddingClass = collapsed ? "sm:ml-16" : "sm:ml-64";

  return (
    <div className="h-screen flex overflow-hidden">
      <Toast
        visible={showToast}
        onClose={() => setShowToast(false)}
        name={staticUser.name}
        message="Welcome back!"
      />

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={navItems}
      />

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-silver bg-opacity-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${contentPaddingClass}`}
      >
        <Navbar setMobileOpen={setMobileOpen} collapsed={collapsed} />

        <main className="flex-1 overflow-y-auto bg-cloud p-5">{children}</main>
      </div>
    </div>
  );
}
