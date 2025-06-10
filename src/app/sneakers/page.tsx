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
  const products = getProductsForStyle("Sneakers"); 

  const heroContent = {
    title: "Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear.",
    buttonText: "Explore Sneakers",
    imageUrl: "/images/shoe_store/Footwear/Sneakers.png",
    imageAiHint: "orange sneaker dynamic",
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Optimized for Mobile */}
      <section className="relative bg-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-white/20 rounded-full transform rotate-45 opacity-50 blur-xl animate-pulse-slow"></div>
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/15 rounded-full transform -rotate-30 opacity-40 blur-lg animate-pulse-slower"></div>
        </div>

        <Container className="relative z-10 py-12 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[80vh] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center w-full">
            {/* Left Column: Text and Button - Mobile First */}
            <div className="text-center md:text-left animate-fade-in-up order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
                {heroContent.title}
              </h1>
              <p className="text-base sm:text-lg text-orange-100 max-w-md mx-auto md:mx-0 mb-6 md:mb-8">
                {heroContent.description}
              </p>
              <Link href="#sneaker-product-grid" passHref>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-orange-600 transition-colors duration-300 px-6 py-3 text-sm md:text-base font-semibold group animate-bounce-hover"
                >
                  {heroContent.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right Column: Image - Mobile Optimized */}
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[450px] flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
              <div className="relative w-full max-w-xs md:max-w-lg aspect-square md:aspect-[7/9] animate-float">
                <Image
                  src={heroContent.imageUrl}
                  alt={heroContent.title}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={heroContent.imageAiHint}
                  priority
                  className="drop-shadow-xl md:drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Grid - Mobile Optimized */}
      <Container className="py-8 md:py-12">
        <h2 id="sneaker-product-grid" className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-8 md:mb-10 scroll-mt-20 animate-fade-in">
          Explore Sneakers
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg md:text-xl py-8 md:py-10 animate-fade-in">
            No sneakers found in this style yet.
          </p>
        )}
      </Container>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.2; }
        }
        @keyframes bounce-hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        .animate-bounce-hover:hover {
          animation: bounce-hover 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}