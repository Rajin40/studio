import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import { mockProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

export default function SearchPage() {
  // In a real app, products would be fetched based on search query and filters
  const products = mockProducts;

  return (
    <Container className="py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Search Products</h1>
        <p className="text-lg text-muted-foreground mt-2">Find exactly what you're looking for.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4">
          <SearchFilters />
        </aside>

        {/* Product Grid and Controls */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>
                <Button variant="outline" size="icon" aria-label="Grid view">
                    <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="List view">
                    <List className="h-4 w-4" />
                </Button>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">No products match your criteria.</p>
          )}

          {/* Pagination Placeholder */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </main>
      </div>
    </Container>
  );
}
