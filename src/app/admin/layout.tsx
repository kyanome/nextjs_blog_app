"use client";
import React from "react";
import AdminSidebar from "./_components/layout/AdminSidebar";
import { SidebarProvider, useSidebar } from "./_context/SidebarContext";
import Backdrop from "./_components/layout/Backdrop";
import AdminHeader from "./_components/layout/AdminHeader";
import { useRouteGuard } from "./_hooks/useRouteGuard";

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  useRouteGuard();
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar and Backdrop */}
      <AdminSidebar />
      <Backdrop />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AdminHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
};

export default AdminLayout;
