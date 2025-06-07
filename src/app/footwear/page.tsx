
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';

const getCategoryDetails = (slug: string): Category | undefined => {
  return mockCategories.find(cat => cat.slug === slug);
};

const getAllShoeProducts = (): Product[] => {
  const shoeCategoryDetails = mockCategories.filter(
    cat => cat.id === 'footwear' || cat.parentCategoryId === 'footwear'
  );
  const shoeCategoryNames = shoeCategoryDetails.map(cat => cat.name);
  
  return mockProducts.filter(product => 
    shoeCategoryNames.includes(product.category)
  );
};

export default function FootwearPage() {
  const styleSlug = "footwear";
  const categoryDetails = getCategoryDetails(styleSlug);
  const products = getAllShoeProducts();

  const heroData = {
    title: categoryDetails?.name || "Footwear Collection",
    description: categoryDetails?.description || "Explore our entire collection of stylish and comfortable footwear for every occasion.",
    imageUrl: categoryDetails?.imageUrl || "https://placehold.co/1200x400.png?text=All+Shoes",
    aiHint: categoryDetails?.aiHint || "footwear collection shoes"
  };

  return (
    <div className="bg-background">
      <section className="relative bg-gradient-to-r from-muted/30 via-muted/10 to-muted/30 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0">
            <Image 
              src={heroData.imageUrl} 
              alt={heroData.title} 
              layout="fill" 
              objectFit="cover" 
              className="opacity-20" 
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
        <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10">All Our Footwear</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No footwear found at the moment.</p>
        )}
      </Container>
    </div>
  );
}
