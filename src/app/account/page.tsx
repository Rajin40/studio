
"use client";

import { useState, useEffect, useActionState } from 'react';
import Container from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Store, Settings, ListOrdered, BarChart2, CreditCard, Package, DollarSign, Edit3, Heart, Briefcase, Image as ImageIcon, Tag, Layers, PlusCircle } from 'lucide-react';
import { mockCategories, type Product, mockProducts as initialMockProducts } from '@/lib/data'; 

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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  
  if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
    errors.phone = "Invalid phone number format (e.g., +12345678900).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { 
    success: true, 
    message: 'Profile updated successfully!', 
    updatedUser: { fullName, email, phone } 
  };
}

interface UpdateStoreProfileResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  updatedStore?: { storeName: string; storeDescription: string; storeLogoUrl?: string };
}

async function updateSellerStoreProfile(prevState: UpdateStoreProfileResponse | null, formData: FormData): Promise<UpdateStoreProfileResponse> {
  const storeName = formData.get('storeName') as string;
  const storeDescription = formData.get('storeDescription') as string;
  const storeLogoUrl = formData.get('storeLogoUrl') as string;

  const errors: Record<string, string> = {};
  if (!storeName) errors.storeName = "Store name is required.";
  if (!storeDescription) errors.storeDescription = "Store description is required.";
  if (storeLogoUrl) {
    try {
      new URL(storeLogoUrl);
    } catch (_) {
      errors.storeLogoUrl = "Invalid URL format for store logo.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Store profile updated successfully!',
    updatedStore: { storeName, storeDescription, storeLogoUrl }
  };
}

interface AddNewProductResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  newProduct?: Product;
}

async function addNewProductAction(prevState: AddNewProductResponse | null, formData: FormData): Promise<AddNewProductResponse> {
  const productName = formData.get('productName') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const categoryId = formData.get('categoryId') as string;
  const stock = formData.get('stock') as string;
  const imageUrl = formData.get('imageUrl') as string;

  const errors: Record<string, string> = {};

  if (!productName) errors.productName = "Product name is required.";
  if (!description) errors.description = "Description is required.";
  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) errors.price = "Valid price is required.";
  if (!categoryId) errors.categoryId = "Category is required.";
  if (!stock || isNaN(parseInt(stock)) || parseInt(stock) < 0) errors.stock = "Valid stock quantity is required.";
  if (!imageUrl) errors.imageUrl = "Image URL is required.";
  else {
    try {
      new URL(imageUrl);
    } catch (_) {
      errors.imageUrl = "Invalid image URL format.";
    }
  }
  
  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const newId = Math.random().toString(36).substring(2, 15);
  const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const categoryName = mockCategories.find(cat => cat.id === categoryId)?.name || 'Unknown';

  const newProduct: Product = {
    id: newId,
    name: productName,
    slug: slug,
    category: categoryName, 
    price: parseFloat(price),
    imageUrl: imageUrl,
    description: description,
    rating: 0, 
    reviewsCount: 0, 
    stock: parseInt(stock),
    aiHint: `${productName.substring(0,15)} ${categoryName.substring(0,10)}`, 
    isActive: true,
    isFeatured: false,
  };
  
  console.log("New product created (simulated):", newProduct);

  return {
    success: true,
    message: 'Product added successfully!',
    newProduct: newProduct,
  };
}

interface UpdateProductResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  updatedFields?: Partial<Product> & { id: string }; // id is mandatory for merging
}

async function updateProductAction(prevState: UpdateProductResponse | null, formData: FormData): Promise<UpdateProductResponse> {
  const productId = formData.get('productId') as string;
  const productName = formData.get('productName') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const categoryId = formData.get('categoryId') as string;
  const stock = formData.get('stock') as string;
  const imageUrl = formData.get('imageUrl') as string;

  const errors: Record<string, string> = {};

  if (!productId) errors.form = "Product ID is missing.";
  if (!productName) errors.productName = "Product name is required.";
  if (!description) errors.description = "Description is required.";
  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) errors.price = "Valid price is required.";
  if (!categoryId) errors.categoryId = "Category is required.";
  if (!stock || isNaN(parseInt(stock)) || parseInt(stock) < 0) errors.stock = "Valid stock quantity is required.";
  if (!imageUrl) errors.imageUrl = "Image URL is required.";
  else {
    try {
      new URL(imageUrl);
    } catch (_) {
      errors.imageUrl = "Invalid image URL format.";
    }
  }
  
  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const categoryName = mockCategories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const aiHint = `${productName.substring(0,15)} ${categoryName.substring(0,10)}`;

  const updatedFields: Partial<Product> & { id: string } = {
    id: productId,
    name: productName,
    slug: slug,
    category: categoryName,
    price: parseFloat(price),
    imageUrl: imageUrl,
    description: description,
    stock: parseInt(stock),
    aiHint: aiHint,
  };
  
  console.log("Product updated (simulated):", updatedFields);

  return {
    success: true,
    message: 'Product updated successfully!',
    updatedFields: updatedFields,
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
                    {currentView === 'buyer' ? <User className="h-8 w-8" /> : <Store className="h-8 w-8" /> }
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-headline">My Account</CardTitle>
                    <CardDescription>Manage your {currentView === 'buyer' ? 'profile, orders, and settings.' : 'store, products, and earnings.'}</CardDescription>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button variant={currentView === 'buyer' ? 'default' : 'outline'} onClick={() => setCurrentView('buyer')}>
                        <ShoppingBag className="mr-2 h-4 w-4" /> Buyer View
                    </Button>
                    <Button variant={currentView === 'seller' ? 'default' : 'outline'} onClick={() => setCurrentView('seller')}>
                        <Briefcase className="mr-2 h-4 w-4" /> Seller View
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
  const [profileFormState, profileFormAction] = useActionState(updateBuyerProfile, profileInitialState);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

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
        setIsProfileDialogOpen(false); 
      } else {
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
  const { toast } = useToast();
  const storeProfileInitialState: UpdateStoreProfileResponse | null = null;
  const [storeProfileFormState, storeProfileFormAction] = useActionState(updateSellerStoreProfile, storeProfileInitialState);
  const [isStoreProfileDialogOpen, setIsStoreProfileDialogOpen] = useState(false);
  
  const [currentStore, setCurrentStore] = useState({
    storeName: "My Awesome Shop",
    storeDescription: "Selling the best widgets in town!",
    storeLogoUrl: "https://placehold.co/100x100.png?text=Logo"
  });

  const addProductInitialState: AddNewProductResponse | null = null;
  const [addProductFormState, addProductFormAction] = useActionState(addNewProductAction, addProductInitialState);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<Product[]>(initialMockProducts.slice(0,2));

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const updateProductInitialState: UpdateProductResponse | null = null;
  const [updateProductFormState, updateProductFormAction] = useActionState(updateProductAction, updateProductInitialState);

  const handleEditProductClick = (productToEdit: Product) => {
    setEditingProduct(productToEdit);
    setIsEditProductDialogOpen(true);
  };

  useEffect(() => {
    if (storeProfileFormState) {
      if (storeProfileFormState.success) {
        toast({
          title: "Success!",
          description: storeProfileFormState.message,
        });
        if (storeProfileFormState.updatedStore) {
          setCurrentStore(prev => ({ ...prev, ...storeProfileFormState.updatedStore }));
        }
        setIsStoreProfileDialogOpen(false); 
      } else {
        if (!storeProfileFormState.errors || Object.keys(storeProfileFormState.errors).length === 0) {
          toast({
            title: "Update Failed",
            description: storeProfileFormState.message || "An error occurred.",
            variant: "destructive",
          });
        }
      }
    }
  }, [storeProfileFormState, toast]);
  
  useEffect(() => {
    if (addProductFormState) {
      if (addProductFormState.success && addProductFormState.newProduct) {
        toast({
          title: "Product Added!",
          description: addProductFormState.message,
        });
        setSellerProducts(prevProducts => [addProductFormState.newProduct!, ...prevProducts]);
        setIsAddProductDialogOpen(false);
      } else if (!addProductFormState.success) {
        if (!addProductFormState.errors || Object.keys(addProductFormState.errors).length === 0) {
          toast({
            title: "Failed to Add Product",
            description: addProductFormState.message || "An error occurred.",
            variant: "destructive",
          });
        }
      }
    }
  }, [addProductFormState, toast]);

  useEffect(() => {
    if (updateProductFormState) {
      if (updateProductFormState.success && updateProductFormState.updatedFields) {
        const { updatedFields } = updateProductFormState;
        toast({
          title: "Product Updated!",
          description: updateProductFormState.message,
        });
        setSellerProducts(prevProducts =>
          prevProducts.map(p =>
            p.id === updatedFields.id ? { ...p, ...updatedFields } : p
          )
        );
        setIsEditProductDialogOpen(false);
        setEditingProduct(null);
      } else if (!updateProductFormState.success) {
         if (!updateProductFormState.errors || Object.keys(updateProductFormState.errors).length === 0) {
            toast({
                title: "Failed to Update Product",
                description: updateProductFormState.message || "An error occurred.",
                variant: "destructive",
            });
         }
      }
    }
  }, [updateProductFormState, toast]);


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
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              {currentStore.storeLogoUrl ? (
                <img src={currentStore.storeLogoUrl} alt="Store Logo" data-ai-hint="logo store" className="w-16 h-16 rounded-md object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{currentStore.storeName}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{currentStore.storeDescription}</p>
              </div>
            </div>
          </div>
          <Dialog open={isStoreProfileDialogOpen} onOpenChange={setIsStoreProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Store Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Edit Store Profile</DialogTitle>
                <DialogDescription>
                  Update your store's public information. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form action={storeProfileFormAction} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" name="storeName" defaultValue={currentStore.storeName} className="mt-1" />
                  {storeProfileFormState?.errors?.storeName && <p className="text-sm text-destructive mt-1">{storeProfileFormState.errors.storeName}</p>}
                </div>
                <div>
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea id="storeDescription" name="storeDescription" defaultValue={currentStore.storeDescription} className="mt-1" rows={3} />
                  {storeProfileFormState?.errors?.storeDescription && <p className="text-sm text-destructive mt-1">{storeProfileFormState.errors.storeDescription}</p>}
                </div>
                <div>
                  <Label htmlFor="storeLogoUrl">Store Logo URL (Optional)</Label>
                  <Input id="storeLogoUrl" name="storeLogoUrl" type="url" defaultValue={currentStore.storeLogoUrl} placeholder="https://example.com/logo.png" className="mt-1" />
                  {storeProfileFormState?.errors?.storeLogoUrl && <p className="text-sm text-destructive mt-1">{storeProfileFormState.errors.storeLogoUrl}</p>}
                </div>
                <DialogFooter className="pt-2">
                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardSection>
      </TabsContent>
      <TabsContent value="products">
        <DashboardSection title="Product Listings" icon={<Package className="h-5 w-5 mr-2" />}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">Add, edit, and manage your product inventory.</p>
            <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default"><PlusCircle className="mr-2 h-4 w-4" /> Add New Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md md:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new product. Click "Add Product" when done.
                  </DialogDescription>
                </DialogHeader>
                <form action={addProductFormAction} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" name="productName" placeholder="e.g., Handcrafted Wooden Bowl" className="mt-1" />
                    {addProductFormState?.errors?.productName && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.productName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Detailed description of your product..." className="mt-1" rows={3}/>
                    {addProductFormState?.errors?.description && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.description}</p>}
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" step="0.01" placeholder="e.g., 29.99" className="mt-1" />
                    {addProductFormState?.errors?.price && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.price}</p>}
                  </div>
                  <div>
                    <Label htmlFor="categoryId">Category</Label>
                    <Select name="categoryId" >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {addProductFormState?.errors?.categoryId && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.categoryId}</p>}
                  </div>
                   <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" name="stock" type="number" step="1" placeholder="e.g., 100" className="mt-1" />
                    {addProductFormState?.errors?.stock && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.stock}</p>}
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Main Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" className="mt-1" />
                    {addProductFormState?.errors?.imageUrl && <p className="text-sm text-destructive mt-1">{addProductFormState.errors.imageUrl}</p>}
                  </div>
                  <DialogFooter className="pt-2">
                      <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                      <Button type="submit">Add Product</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {sellerProducts.length > 0 ? (
            <div className="space-y-3">
              {sellerProducts.map(product => (
                <Card key={product.id} className="flex items-center p-3 space-x-3">
                  <img 
                    src={product.imageUrl || 'https://placehold.co/60x60.png?text=N/A'} 
                    alt={product.name} 
                    data-ai-hint={product.aiHint || 'product image'} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">${product.price.toFixed(2)} - Stock: {product.stock}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEditProductClick(product)}>
                     <Edit3 className="mr-1 h-3 w-3"/> Edit
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
             <div className="mt-6 p-6 border rounded-md text-center text-muted-foreground">
                You haven&apos;t added any products yet.
            </div>
          )}

            <Dialog open={isEditProductDialogOpen} onOpenChange={(isOpen) => {
                setIsEditProductDialogOpen(isOpen);
                if (!isOpen) setEditingProduct(null); 
            }}>
              <DialogContent className="sm:max-w-md md:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>
                    Make changes to your product details. Click "Save Changes" when done.
                  </DialogDescription>
                </DialogHeader>
                {editingProduct && (
                  <form action={updateProductFormAction} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
                    <input type="hidden" name="productId" value={editingProduct.id} />
                    <div>
                      <Label htmlFor="editProductName">Product Name</Label>
                      <Input id="editProductName" name="productName" defaultValue={editingProduct.name} className="mt-1" />
                      {updateProductFormState?.errors?.productName && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.productName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="editDescription">Description</Label>
                      <Textarea id="editDescription" name="description" defaultValue={editingProduct.description} className="mt-1" rows={3}/>
                      {updateProductFormState?.errors?.description && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.description}</p>}
                    </div>
                    <div>
                      <Label htmlFor="editPrice">Price ($)</Label>
                      <Input id="editPrice" name="price" type="number" step="0.01" defaultValue={editingProduct.price} className="mt-1" />
                      {updateProductFormState?.errors?.price && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.price}</p>}
                    </div>
                    <div>
                      <Label htmlFor="editCategoryId">Category</Label>
                      <Select name="categoryId" defaultValue={mockCategories.find(cat => cat.name === editingProduct.category)?.id}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCategories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {updateProductFormState?.errors?.categoryId && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.categoryId}</p>}
                    </div>
                    <div>
                      <Label htmlFor="editStock">Stock Quantity</Label>
                      <Input id="editStock" name="stock" type="number" step="1" defaultValue={editingProduct.stock} className="mt-1" />
                      {updateProductFormState?.errors?.stock && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.stock}</p>}
                    </div>
                    <div>
                      <Label htmlFor="editImageUrl">Main Image URL</Label>
                      <Input id="editImageUrl" name="imageUrl" type="url" defaultValue={editingProduct.imageUrl} className="mt-1" />
                      {updateProductFormState?.errors?.imageUrl && <p className="text-sm text-destructive mt-1">{updateProductFormState.errors.imageUrl}</p>}
                    </div>
                    {updateProductFormState?.errors?.form && <p className="text-sm text-destructive text-center mt-1">{updateProductFormState.errors.form}</p>}
                    <DialogFooter className="pt-2">
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>

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

