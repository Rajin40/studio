
"use client";

import { useState, useEffect, useActionState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import Container from '@/components/Container';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper function to get product (replace with actual data fetching)
async function getProduct(id: string): Promise<Product | undefined> {
  const data = await import('@/lib/data');
  return data.mockProducts.find(p => p.id === id);
}

// Helper function to get related products
async function getRelatedProducts(currentProductId: string, category?: string, count: number = 4): Promise<Product[]> {
  const data = await import('@/lib/data');
  const allProducts = data.mockProducts;
  let recommendedProductsList: Product[] = [];

  if (category) {
    recommendedProductsList = allProducts.filter(
      p => p.id !== currentProductId && p.category === category
    );
  }
  
  // If not enough from the same category, fill with other products
  if (recommendedProductsList.length < count) {
    const existingIds = new Set(recommendedProductsList.map(p => p.id));
    existingIds.add(currentProductId); // Ensure current product isn't included

    const otherProducts = allProducts.filter(
      p => !existingIds.has(p.id)
    );
    
    const needed = count - recommendedProductsList.length;
    recommendedProductsList.push(...otherProducts.slice(0, needed));
  }
  return recommendedProductsList.slice(0, count);
}

interface SubmitReviewResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

async function submitReviewAction(prevState: SubmitReviewResponse | null, formData: FormData): Promise<SubmitReviewResponse> {
  const rating = formData.get('rating') as string;
  const title = formData.get('title') as string;
  const comment = formData.get('comment') as string;
  const productId = formData.get('productId') as string;

  const errors: Record<string, string> = {};

  if (!rating || parseInt(rating, 10) < 1 || parseInt(rating, 10) > 5) {
    errors.rating = "Please select a rating between 1 and 5.";
  }
  if (!comment) {
    errors.comment = "Review comment cannot be empty.";
  }
  if (!productId) {
    errors.form = "Product ID is missing. Cannot submit review.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  console.log("Submitting review:", { productId, rating, title, comment });
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Review submitted successfully! It will be reviewed shortly." };
}


export default function ProductPage({ params: paramsFromProps }: { params: { id: string } }) {
  const resolvedParams = use(paramsFromProps as any); 

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const reviewInitialState: SubmitReviewResponse | null = null;
  const [reviewFormState, reviewFormAction] = useActionState(submitReviewAction, reviewInitialState);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  useEffect(() => {
    async function loadData(id: string) { 
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImageUrl(fetchedProduct.imageUrl); 
          const fetchedRelatedProducts = await getRelatedProducts(id, fetchedProduct.category, 4);
          setRelatedProducts(fetchedRelatedProducts);
        } else {
          setProduct(null);
          setSelectedImageUrl(null);
        }
    }
    if (resolvedParams?.id) {
        loadData(resolvedParams.id);
    }
  }, [resolvedParams?.id]);

  useEffect(() => {
    if (reviewFormState) {
      if (reviewFormState.success) {
        toast({
          title: "Review Submitted!",
          description: reviewFormState.message,
        });
        setIsReviewFormVisible(false);
        // Consider resetting form or refetching reviews if they were displayed
      } else {
        if (!reviewFormState.errors || Object.keys(reviewFormState.errors).length === 0) {
          toast({
            title: "Submission Failed",
            description: reviewFormState.message || "An error occurred while submitting your review.",
            variant: "destructive",
          });
        }
      }
    }
  }, [reviewFormState, toast]);

  if (!product) { 
    return <Container className="py-12 text-center">Loading product details or product not found...</Container>;
  }
  
  if (product && !selectedImageUrl) {
    setSelectedImageUrl(product.imageUrl); 
  }
  if (!selectedImageUrl && product) { 
      return <Container className="py-12 text-center">Loading images...</Container>;
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div>
          <div className="space-y-4">
            <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg bg-muted/30">
              {selectedImageUrl && (
                <Image
                  src={selectedImageUrl}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={product.aiHint || 'product image'}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              {product.isFeatured && ( 
                   <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <Badge variant="default" className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-2.5 py-1 sm:px-3 shadow-md">
                          New Arrival
                      </Badge>
                   </div>
              )}
            </div>
            {/* Thumbnail images section removed */}
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          {product.brand && <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>}

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
            ))}
            <span className="text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
          </div>

          <p className="text-3xl font-semibold text-foreground">
            ${product.price.toFixed(2)}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-3 text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </p>
          
          {typeof product.stock === 'number' ? (
             product.stock === 0 ? (
                <Badge variant="destructive">Out of Stock</Badge>
             ) : product.stock < 10 ? (
                <Badge variant="destructive">Only {product.stock} left in stock!</Badge>
             ) : (
                (() => {
                  const discountPercent = (product.originalPrice && product.price && product.originalPrice > product.price)
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;
            
                  return (
                    <Badge variant={discountPercent > 0 ? "secondary" : "default"}>
                      <span>In Stock</span>
                      {discountPercent > 0 && (
                        <>
                          <span className="mx-1">-</span>
                          <span className="text-destructive font-semibold">{discountPercent}% OFF</span>
                        </>
                      )}
                    </Badge>
                  );
                })()
             )
          ) : (
            <Badge variant="secondary">Stock status unavailable</Badge>
          )}

          <p className="text-foreground/80 leading-relaxed line-clamp-3 pt-2">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!product.stock || product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full pt-2">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4 text-sm prose dark:prose-invert max-w-none">
              {product.description}
            </TabsContent>
            <TabsContent value="details" className="py-4 text-sm">
              {product.details && Object.keys(product.details).length > 0 ? (
                <ul className="space-y-1 list-disc pl-5">
                  {Object.entries(product.details).map(([key, value]) => (
                    <li key={key}><strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>
                  ))}
                </ul>
              ) : (
                <p>No additional details available.</p>
              )}
            </TabsContent>
            <TabsContent value="shipping" className="py-4 text-sm">
              <p>Estimated delivery: 3-5 business days.</p>
              <p>Free returns within 30 days. <Link href="/help#returns" className="text-primary underline">Learn more</Link>.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* You Might Also Like Section - Full width */}
      {relatedProducts.length > 0 && (
        <section className="py-12 mt-12 border-t">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section - Full width */}
      <section className="py-12 mt-12 border-t">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-6">Customer Reviews</h2>
        <div className="p-6 bg-card rounded-lg shadow">
          {!isReviewFormVisible ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Have you tried this product? Share your thoughts!</p>
              <Button variant="outline" onClick={() => setIsReviewFormVisible(true)}>Write a Review</Button>
            </div>
          ) : (
            <form action={reviewFormAction} className="space-y-4">
              <input type="hidden" name="productId" value={product.id} />
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select name="rating" required>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(r => (
                      <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {reviewFormState?.errors?.rating && <p className="text-sm text-destructive mt-1">{reviewFormState.errors.rating}</p>}
              </div>
              <div>
                <Label htmlFor="title">Review Title (Optional)</Label>
                <Input id="title" name="title" placeholder="e.g., Great product!" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea id="comment" name="comment" placeholder="Tell us about your experience..." className="mt-1" rows={4} required />
                {reviewFormState?.errors?.comment && <p className="text-sm text-destructive mt-1">{reviewFormState.errors.comment}</p>}
              </div>
              {reviewFormState?.errors?.form && <p className="text-sm text-destructive mt-1">{reviewFormState.errors.form}</p>}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="ghost" onClick={() => setIsReviewFormVisible(false)}>Cancel</Button>
                <Button type="submit">Submit Review</Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Container>
  );
}

// The `generateStaticParams` function is used by Next.js to pre-render
// pages at build time if you are using static generation for dynamic routes.
// export async function generateStaticParams() {
//   const data = await import('@/lib/data');
//   return data.mockProducts.map(product => ({
//     id: product.id,
//   }));
// }

// Metadata generation is typically done in Server Components.
// Since this is a Client Component, metadata would be handled differently
// or by a parent Server Component.
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const product = await getProduct(params.id);
//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }
//   return {
//     title: product.name,
//     description: product.description.substring(0, 160),
//   };
// }

