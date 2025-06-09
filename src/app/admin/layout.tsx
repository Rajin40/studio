
import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarRail,
  SidebarInset
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Shopstream Admin",
  description: "Admin dashboard for Shopstream e-commerce.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true} open={true}> {/* Control open state as needed */}
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
        <AdminSidebar />
        <SidebarRail />
      </Sidebar>
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <SidebarInset className="flex-1 p-4 md:p-6 bg-muted/30 dark:bg-muted/10">
            {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
