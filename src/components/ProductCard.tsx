import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  let discountPercentDisplay: number | null = null;
  if (product.originalPrice && product.originalPrice > product.price) {
    const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    if (discount > 0) {
      discountPercentDisplay = Math.round(discount);
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-square relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.aiHint}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-headline mb-1 leading-tight hover:text-accent transition-colors">{product.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-xl font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
          {discountPercentDisplay && discountPercentDisplay > 0 && (
            <Badge variant="destructive" className="text-xs font-semibold">
              {discountPercentDisplay}% OFF
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
