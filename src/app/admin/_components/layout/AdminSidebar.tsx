"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { useSidebar } from "../../_context/SidebarContext";
import { NavItem, navItems } from "../../_utils/constants";

const AdminSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const isActive = useCallback((path: string) => path == pathname, [pathname]);

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-4 ">
      {navItems.map((nav) => (
        <li key={nav.name}>
          <Link
            href={nav.path}
            className={`menu-item group ${
              isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
            } ${
              !(isExpanded || isHovered || isMobileOpen) ? "justify-center" : ""
            }`}
          >
            <span
              className={`${
                isActive(nav.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              } ${
                !(isExpanded || isHovered || isMobileOpen)
                  ? "justify-center"
                  : ""
              }`}
            >
              {<nav.icon />}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span>{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 flex flex-col top-0 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-50 w-[290px] ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
          ? "w-[290px]"
          : "w-[90px]"
      }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`flex gap-2 p-7 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <Image src="/logo.svg" alt="Logo" width={150} height={40} />
          ) : (
            <Image src="/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      {/* Navigation */}
      <nav className="p-4 duration-300 ease-linear ">
        {renderMenuItems(navItems)}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
