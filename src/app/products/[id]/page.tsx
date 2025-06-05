import Image from 'next/image';
import Link from 'next/link'; // Added this line
import { mockProducts, Product } from '@/lib/data';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';

// Helper function to get product (replace with actual data fetching)
async function getProduct(id: string): Promise<Product | undefined> {
  return mockProducts.find(p => p.id === id);
}

// Helper function to get related products
async function getRelatedProducts(currentProductId: string, category?: string): Promise<Product[]> {
  return mockProducts.filter(p => p.id !== currentProductId && (category ? p.category === category : true)).slice(0, 4);
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return <Container className="py-12 text-center">Product not found.</Container>;
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  return (
    <Container className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint={product.aiHint}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0,4).map((img, idx) => (
                <div key={idx} className="aspect-square relative w-full rounded-md overflow-hidden border hover:border-primary cursor-pointer">
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
            ))}
            <span className="text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
          </div>

          <p className="text-3xl font-semibold text-primary">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="ml-3 text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </p>

          {product.stock && product.stock < 10 && (
            <Badge variant="destructive">Only {product.stock} left in stock!</Badge>
          )}
          {product.stock && product.stock >= 10 && (
             <Badge variant="default">In Stock</Badge>
          )}

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Quantity selector could be added here */}
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
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
            <TabsContent value="description" className="py-4 text-sm">
              {product.description}
            </TabsContent>
            <TabsContent value="details" className="py-4 text-sm">
              {product.details ? (
                <ul className="space-y-1">
                  {Object.entries(product.details).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
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

      {/* Customer Reviews (Placeholder) */}
      <section className="py-12 mt-12 border-t">
        <h2 className="text-2xl font-bold font-headline mb-6">Customer Reviews</h2>
        <div className="p-6 bg-card rounded-lg shadow text-center">
          <p className="text-muted-foreground">Customer reviews will be shown here.</p>
          <Button variant="outline" className="mt-4">Write a Review</Button>
        </div>
      </section>

      {/* Recommended Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 mt-12 border-t">
          <h2 className="text-2xl font-bold font-headline mb-8 text-center md:text-left">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

export async function generateStaticParams() {
  return mockProducts.map(product => ({
    id: product.id,
  }));
}
