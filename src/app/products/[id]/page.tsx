
"use client";

import { useState, useEffect, useActionState, use } from 'react'; // Added 'use'
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
  recommendedProductsList = recommendedProductsList.slice(0, count);

  if (recommendedProductsList.length < count) {
    const existingIds = new Set(recommendedProductsList.map(p => p.id));
    existingIds.add(currentProductId);

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
    // This should ideally not happen if form is set up correctly
    errors.form = "Product ID is missing. Cannot submit review.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  // Simulate API call to submit review
  console.log("Submitting review:", { productId, rating, title, comment });
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Review submitted successfully! It will be reviewed shortly." };
}


export default function ProductPage({ params: paramsFromProps }: { params: { id: string } }) {
  // Unwrap the params prop using React.use() as recommended by the Next.js warning.
  // The `as any` is used because TypeScript's static type for paramsFromProps ({id: string})
  // doesn't reflect Next.js's runtime behavior where it might be a Promise here.
  const params = use(paramsFromProps as any);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  const reviewInitialState: SubmitReviewResponse | null = null;
  const [reviewFormState, reviewFormAction] = useActionState(submitReviewAction, reviewInitialState);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Now 'params' is the resolved object.
      if (params && params.id) {
        const fetchedProduct = await getProduct(params.id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          const fetchedRelatedProducts = await getRelatedProducts(params.id, fetchedProduct.category, 6);
          setRelatedProducts(fetchedRelatedProducts);
        }
      }
    }
    // Ensure params (resolved) and params.id exist before loading data.
    if (params?.id) {
        loadData();
    }
  }, [params?.id]); // Depend on the id from the resolved params.

  useEffect(() => {
    if (reviewFormState) {
      if (reviewFormState.success) {
        toast({
          title: "Review Submitted!",
          description: reviewFormState.message,
        });
        setIsReviewFormVisible(false);
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
    // If params is resolved but product is still loading (or not found), show loading.
    // If paramsFromProps was a promise, use(paramsFromProps) would suspend until it resolves.
    return <Container className="py-12 text-center">Loading product details...</Container>;
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint={product.aiHint || 'product image'}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0,4).map((img, idx) => (
                <div key={idx} className="aspect-square relative w-full rounded-md overflow-hidden border hover:border-primary cursor-pointer">
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>

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
            {product.originalPrice && (
              <span className="ml-3 text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </p>

          {typeof product.stock === 'number' ? (
             product.stock === 0 ? (
                <Badge variant="destructive">Out of Stock</Badge>
             ) : product.stock < 10 ? (
                <Badge variant="destructive">Only {product.stock} left in stock!</Badge>
             ) : (
                <Badge variant="default">In Stock</Badge>
             )
          ) : (
            <Badge variant="secondary">Stock status unavailable</Badge>
          )}


          <p className="text-foreground/80 leading-relaxed line-clamp-3">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!product.stock || product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full">
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

      {relatedProducts.length > 0 && (
        <section className="py-12 mt-12 border-t">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-8 text-center md:text-left">You Might Also Like</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

// generateStaticParams can be uncommented if you pre-render all product pages at build time
// export async function generateStaticParams() {
//   const data = await import('@/lib/data');
//   const products = data.mockProducts;
//   return products.map(product => ({
//     id: product.id,
//   }));
// }

// If you are not pre-rendering, this function is not strictly necessary
// but good for type safety if you were.
/*
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: product.name,
    description: product.description.substring(0, 160), // SEO description length
  };
}
*/
