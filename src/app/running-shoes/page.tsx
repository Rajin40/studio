
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import { Button } from '@/components/ui/button';

// Helper to get category details (can be kept if categoryDetails were used for something else, otherwise not strictly needed for this hero)
const getCategoryDetails = (slug: string): Category | undefined => {
  return mockCategories.find(cat => cat.slug === slug);
};

// Helper to get products for the style
const getProductsForStyle = (styleName: string): Product[] => {
  return mockProducts.filter(product => {
    if (product.category === styleName) {
      const categoryInfo = mockCategories.find(c => c.name === product.category);
      return categoryInfo && (categoryInfo.id === 'footwear' || categoryInfo.parentCategoryId === 'footwear');
    }
    return false;
  });
};

const heroSlidesData = [
  {
    imageUrl: "https://placehold.co/700x500.png?text=Runners+Profile&style=dynamic",
    aiHint: "running shoe dynamic",
    alt: "Dynamic Running Shoe Model - Profile View"
  },
  {
    imageUrl: "https://placehold.co/700x500.png?text=Runners+Action&style=action",
    aiHint: "action shot running",
    alt: "Dynamic Running Shoe Model - Action Shot"
  },
  {
    imageUrl: "https://placehold.co/700x500.png?text=Runners+Pair&style=sleek",
    aiHint: "sleek running shoes",
    alt: "Pair of Sleek Running Shoes"
  }
];

export default function RunningShoesPage() {
  const products = getProductsForStyle("Running Shoes");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlidesData.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const activeSlide = heroSlidesData[currentSlide];

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    // Optional: If you want to reset the interval on manual click:
    // clearInterval(intervalId); // This would require intervalId to be in state or ref
    // And then restart it. For simplicity, auto-play continues.
  };

  return (
    <div className="bg-background">
      <section className="relative flex flex-col md:flex-row min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] text-neutral-800 overflow-hidden">
        {/* Left Content Area (Text, Button, Dots) */}
        <div className="w-full md:w-5/12 bg-white flex flex-col justify-center items-center md:items-start p-6 py-10 sm:p-10 md:p-12 lg:p-16 order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline mb-4 md:mb-6 text-neutral-900">
            Running Shoes
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-md mx-auto md:mx-0 mb-6 md:mb-8">
            High-performance running shoes for athletes.
          </p>
          <Link href="#running-product-grid" passHref scroll={false}>
            <Button 
              size="lg" 
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-md px-10 py-3 text-base font-semibold transition-colors duration-300 mx-auto md:mx-0"
            >
              Discover More
            </Button>
          </Link>
          {/* Carousel Dots */}
          <div className="mt-8 md:mt-10 flex justify-center md:justify-start space-x-3 w-full">
            {heroSlidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                  currentSlide === index ? 'bg-sky-500 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Image Area (with its own background for the blue tint) */}
        <div className="w-full md:w-7/12 bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center p-6 sm:p-8 order-1 md:order-2 relative min-h-[300px] xxs:min-h-[350px] xs:min-h-[400px] sm:min-h-[450px] md:min-h-full">
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[4/3]">
            {heroSlidesData.map((slide, index) => (
              <div
                key={slide.imageUrl} // Unique key for each image div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={slide.aiHint}
                  priority={index === 0} // Prioritize the first image for LCP
                  className="drop-shadow-xl" // Enhanced drop shadow
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <Container className="py-8 md:py-12">
        <h2 id="running-product-grid" className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">
          Shop Running Shoes
        </h2>
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
      <style jsx global>{`
        /* Define min-height for very small screens if needed */
        @media (max-width: 360px) {
          .xxs\\:min-h-\\[350px\\] { /* Match class name used in component if needed */
            min-height: 300px !important; 
          }
        }
      `}</style>
    </div>
  );
}
