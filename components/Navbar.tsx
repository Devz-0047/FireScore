"use client";

interface NavbarProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
}

export default function Navbar({ setMobileOpen, collapsed }: NavbarProps) {
  return <header className="navbar">{/* Your code */}</header>;
}
