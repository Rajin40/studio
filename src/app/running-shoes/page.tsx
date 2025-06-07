
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';

const getCategoryDetails = (slug: string): Category | undefined => {
  return mockCategories.find(cat => cat.slug === slug);
};

const getProductsForStyle = (styleName: string): Product[] => {
  return mockProducts.filter(product => {
    if (product.category === styleName) {
      const categoryInfo = mockCategories.find(c => c.name === product.category);
      return categoryInfo && (categoryInfo.id === 'footwear' || categoryInfo.parentCategoryId === 'footwear');
    }
    return false;
  });
};

export default function RunningShoesPage() {
  const styleSlug = "running-shoes";
  const categoryDetails = getCategoryDetails(styleSlug);
  // The category name is "Running Shoes"
  const products = getProductsForStyle("Running Shoes");

  const heroData = {
    title: categoryDetails?.name || "Running Shoes",
    description: categoryDetails?.description || "Achieve your personal best with our high-performance running shoes.",
    imageUrl: categoryDetails?.imageUrl || "https://placehold.co/1200x400.png?text=Performance+Run",
    aiHint: categoryDetails?.aiHint || "running shoes athletic"
  };

  return (
    <div className="bg-background">
      <section className="relative bg-gradient-to-r from-red-100 via-red-50 to-red-100 dark:from-red-900 dark:via-red-800 dark:to-red-900 py-16 md:py-24 text-center overflow-hidden">
         <div className="absolute inset-0">
            <Image 
              src={heroData.imageUrl} 
              alt={heroData.title} 
              layout="fill" 
              objectFit="cover" 
              className="opacity-25" 
              data-ai-hint={heroData.aiHint} 
              priority
            />
        </div>
        <Container className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-4 text-foreground">{heroData.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{heroData.description}</p>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
         <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10">Performance Running Gear</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No running shoes found in this style yet.</p>
        )}
      </Container>
    </div>
  );
}
