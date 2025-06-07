
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function SneakersPage() {
  const styleSlug = "sneakers";
  // The category name for sneakers is "Sneakers"
  const products = getProductsForStyle("Sneakers"); 

  const heroContent = {
    title: "Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear.",
    buttonText: "Explore Sneakers",
    imageUrl: "https://placehold.co/600x450.png",
    imageAiHint: "orange sneaker dynamic",
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Redesigned */}
      <section className="relative bg-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            {/* Abstract shapes */}
            <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-white/20 rounded-full transform rotate-45 opacity-50 blur-xl"></div>
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/15 rounded-full transform -rotate-30 opacity-40 blur-lg"></div>
        </div>

        <Container className="relative z-10 py-16 md:py-24 lg:py-32 min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Column: Text and Button */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                {heroContent.title}
              </h1>
              <p className="text-lg sm:text-xl text-orange-100 max-w-lg mx-auto md:mx-0 mb-8">
                {heroContent.description}
              </p>
              <Link href="#sneaker-product-grid" passHref>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-black hover:bg-white hover:text-orange-600 transition-colors duration-300 px-8 py-3 text-base font-semibold group"
                >
                  {heroContent.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] animate-float">
                <Image
                  src={heroContent.imageUrl}
                  alt={heroContent.title}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={heroContent.imageAiHint}
                  priority
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        <h2 id="sneaker-product-grid" className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">Explore Sneakers</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No sneakers found in this style yet.</p>
        )}
      </Container>
       <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
