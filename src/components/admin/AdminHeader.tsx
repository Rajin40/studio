
"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSidebar } from "@/components/ui/sidebar"; // To conditionally show trigger

export default function AdminHeader() {
  const { isMobile } = useSidebar(); // Get isMobile from context

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
      {isMobile && <SidebarTrigger />} 
      <div className="flex items-center md:hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="sr-only">Admin Dashboard</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        {/* Placeholder for User Dropdown/Profile */}
      </div>
    </header>
  );
}
