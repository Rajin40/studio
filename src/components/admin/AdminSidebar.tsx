
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, LayoutDashboard, ShoppingBag, ListOrdered, Users, MessageSquare, BarChart3, Settings, LogOut, Tag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"; // For potential mobile-specific logic if needed

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

const settingsItem = { href: "/admin/settings", label: "Settings", icon: Settings };

export default function AdminSidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile(); // Example if needed for conditional rendering inside sidebar

  // Simple check for active link
  const isActive = (href: string) => pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <>
      <SidebarHeader className="border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-lg font-semibold" title="Shopstream Admin">
          <BookOpen className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-primary group-data-[collapsible=icon]:hidden">Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
           <SidebarMenuItem>
             <Link href={settingsItem.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(settingsItem.href)}
                  tooltip={{ children: settingsItem.label, side: "right", align: "center" }}
                >
                  <a>
                    <settingsItem.icon />
                    <span>{settingsItem.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
           </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/" passHref legacyBehavior>
                <SidebarMenuButton
                    asChild
                    variant="outline"
                    tooltip={{ children: "Sign Out (Back to Main Site)", side: "right", align: "center" }}
                >
                    <a>
                        <LogOut />
                        <span>Sign Out</span>
                    </a>
                </SidebarMenuButton>
            </Link>
           </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
