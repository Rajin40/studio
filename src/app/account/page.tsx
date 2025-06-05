
"use client";

import { useState } from 'react';
import Container from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ShoppingBag, Store, Settings, ListOrdered, BarChart2, CreditCard, Package, DollarSign, Edit3, Heart } from 'lucide-react';

type AccountView = 'buyer' | 'seller';

export default function AccountPage() {
  const [currentView, setCurrentView] = useState<AccountView>('buyer');

  return (
    <Container className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <div className="mx-auto sm:mx-0 mb-3 w-12 h-12 inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary">
                    <User className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-headline">My Account</CardTitle>
                    <CardDescription>Manage your profile, orders, and settings.</CardDescription>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button variant={currentView === 'buyer' ? 'default' : 'outline'} onClick={() => setCurrentView('buyer')}>
                        <ShoppingBag className="mr-2 h-4 w-4" /> Buyer View
                    </Button>
                    <Button variant={currentView === 'seller' ? 'default' : 'outline'} onClick={() => setCurrentView('seller')}>
                        <Store className="mr-2 h-4 w-4" /> Seller View
                    </Button>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentView === 'buyer' && (
              <BuyerDashboard />
            )}
            {currentView === 'seller' && (
              <SellerDashboard />
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

function BuyerDashboard() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <DashboardSection title="Profile Information" icon={<User className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your personal details, shipping addresses, etc.</p>
          {/* Placeholder for profile form */}
          <Button variant="outline" className="mt-4"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="orders">
        <DashboardSection title="Order History" icon={<ListOrdered className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">View your past orders and track current shipments.</p>
          {/* Placeholder for order list */}
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">No orders yet.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="wishlist">
        <DashboardSection title="My Wishlist" icon={<Heart className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Your saved items for later purchase.</p>
           {/* Placeholder for wishlist items */}
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">Your wishlist is empty.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="payments">
        <DashboardSection title="Payment Methods" icon={<CreditCard className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your saved payment options.</p>
          {/* Placeholder for payment methods */}
          <Button variant="outline" className="mt-4">Add Payment Method</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="settings">
        <DashboardSection title="Account Settings" icon={<Settings className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Update your password, email preferences, and notification settings.</p>
           {/* Placeholder for settings form */}
        </DashboardSection>
      </TabsContent>
    </Tabs>
  );
}

function SellerDashboard() {
  return (
    <Tabs defaultValue="store-profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
        <TabsTrigger value="store-profile">Store Profile</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="payouts">Payouts</TabsTrigger>
      </TabsList>

      <TabsContent value="store-profile">
        <DashboardSection title="Store Profile & Settings" icon={<Store className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your store's public information, policies, and branding.</p>
          {/* Placeholder for store profile form */}
          <Button variant="outline" className="mt-4"><Edit3 className="mr-2 h-4 w-4" /> Edit Store Details</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="products">
        <DashboardSection title="Product Listings" icon={<Package className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Add, edit, and manage your product inventory.</p>
          {/* Placeholder for product management table/grid */}
           <Button variant="default" className="mt-4">Add New Product</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="orders">
        <DashboardSection title="Manage Orders" icon={<ListOrdered className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">View and process incoming customer orders.</p>
          {/* Placeholder for orders list */}
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">No new orders.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="analytics">
        <DashboardSection title="Sales Analytics" icon={<BarChart2 className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Track your sales performance, revenue, and customer insights.</p>
          {/* Placeholder for charts and reports */}
           <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">Analytics data will appear here.</div>
        </DashboardSection>
      </TabsContent>
       <TabsContent value="payouts">
        <DashboardSection title="Payouts & Earnings" icon={<DollarSign className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your bank details and view your earnings history.</p>
          {/* Placeholder for payout settings and history */}
        </DashboardSection>
      </TabsContent>
    </Tabs>
  );
}

interface DashboardSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

function DashboardSection({ title, icon, children }: DashboardSectionProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                {icon}
                <CardTitle className="text-lg font-semibold font-headline">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
