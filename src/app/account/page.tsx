
"use client";

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Store, Settings, ListOrdered, BarChart2, CreditCard, Package, DollarSign, Edit3, Heart } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

type AccountView = 'buyer' | 'seller';

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  updatedUser?: { fullName: string; email: string; phone?: string };
}

async function updateBuyerProfile(prevState: UpdateProfileResponse | null, formData: FormData): Promise<UpdateProfileResponse> {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  const errors: Record<string, string> = {};

  if (!fullName) errors.fullName = "Full name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format.";
  
  // Validate phone only if it's not empty
  if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
    errors.phone = "Invalid phone number format (e.g., +12345678900).";
  }


  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  console.log('Updating buyer profile:', { fullName, email, phone });
  // In a real app, update Firestore and potentially Firebase Auth email.

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: 'Profile updated successfully!', 
    updatedUser: { fullName, email, phone } 
  };
}


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
  const { toast } = useToast();
  const profileInitialState: UpdateProfileResponse | null = null;
  const [profileFormState, profileFormAction] = useFormState(updateBuyerProfile, profileInitialState);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  // Mock current user data - in a real app, fetch this
  const [currentUser, setCurrentUser] = useState({
    fullName: "Aisha Sharma",
    email: "aisha.sharma@example.com",
    phone: "123-456-7890"
  });

  useEffect(() => {
    if (profileFormState) {
      if (profileFormState.success) {
        toast({
          title: "Success!",
          description: profileFormState.message,
        });
        if (profileFormState.updatedUser) {
            setCurrentUser(prev => ({ ...prev, ...profileFormState.updatedUser }));
        }
        setIsProfileDialogOpen(false); // Close dialog on success
      } else {
        // Only show general toast if there are no specific field errors displayed inline
        if (!profileFormState.errors || Object.keys(profileFormState.errors).length === 0) {
             toast({
                title: "Update Failed",
                description: profileFormState.message || "An error occurred.",
                variant: "destructive",
            });
        }
      }
    }
  }, [profileFormState, toast]);

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
          <div className="space-y-2 mb-4 text-sm">
            <p><span className="font-semibold text-muted-foreground">Name:</span> {currentUser.fullName}</p>
            <p><span className="font-semibold text-muted-foreground">Email:</span> {currentUser.email}</p>
            <p><span className="font-semibold text-muted-foreground">Phone:</span> {currentUser.phone || 'Not set'}</p>
          </div>
          
          <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form action={profileFormAction} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" defaultValue={currentUser.fullName} className="mt-1" />
                  {profileFormState?.errors?.fullName && <p className="text-sm text-destructive mt-1">{profileFormState.errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="emailProfile">Email</Label>
                  <Input id="emailProfile" name="email" type="email" defaultValue={currentUser.email} className="mt-1" />
                  {profileFormState?.errors?.email && <p className="text-sm text-destructive mt-1">{profileFormState.errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" name="phone" defaultValue={currentUser.phone} placeholder="e.g. +1234567890" className="mt-1" />
                   {profileFormState?.errors?.phone && <p className="text-sm text-destructive mt-1">{profileFormState.errors.phone}</p>}
                </div>
                {profileFormState?.errors?.form && <p className="text-sm text-destructive text-center">{profileFormState.errors.form}</p>}
                <DialogFooter className="pt-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="orders">
        <DashboardSection title="Order History" icon={<ListOrdered className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">View your past orders and track current shipments.</p>
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">No orders yet.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="wishlist">
        <DashboardSection title="My Wishlist" icon={<Heart className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Your saved items for later purchase.</p>
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">Your wishlist is empty.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="payments">
        <DashboardSection title="Payment Methods" icon={<CreditCard className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your saved payment options.</p>
          <Button variant="outline" className="mt-4">Add Payment Method</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="settings">
        <DashboardSection title="Account Settings" icon={<Settings className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Update your password, email preferences, and notification settings.</p>
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
          <Button variant="outline" className="mt-4"><Edit3 className="mr-2 h-4 w-4" /> Edit Store Details</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="products">
        <DashboardSection title="Product Listings" icon={<Package className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Add, edit, and manage your product inventory.</p>
           <Button variant="default" className="mt-4">Add New Product</Button>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="orders">
        <DashboardSection title="Manage Orders" icon={<ListOrdered className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">View and process incoming customer orders.</p>
          <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">No new orders.</div>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="analytics">
        <DashboardSection title="Sales Analytics" icon={<BarChart2 className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Track your sales performance, revenue, and customer insights.</p>
           <div className="mt-4 p-4 border rounded-md text-center text-muted-foreground">Analytics data will appear here.</div>
        </DashboardSection>
      </TabsContent>
       <TabsContent value="payouts">
        <DashboardSection title="Payouts & Earnings" icon={<DollarSign className="h-5 w-5 mr-2" />}>
          <p className="text-muted-foreground">Manage your bank details and view your earnings history.</p>
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

