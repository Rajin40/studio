
"use client";

import { useState } from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const WavyLinesSVG = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 text-muted-foreground/50">
    <path d="M2 10C2 10 6.5 2.5 10.5 10C14.5 17.5 19.5 10 23.5 10C27.5 10 32 17.5 36 10C40 2.5 44.5 10 48.5 10C52.5 10 57 2.5 57 2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 18C2 18 6.5 10.5 10.5 18C14.5 25.5 19.5 18 23.5 18C27.5 18 32 25.5 36 18C40 10.5 44.5 18 48.5 18C52.5 18 57 10.5 57 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function FormalShoesPage() {
  const styleSlug = "formal-shoes";
  const categoryDetails = getCategoryDetails(styleSlug);
  const products = getProductsForStyle("Formal Shoes"); 

  const heroSlidesData = [
    {
      imageUrl: categoryDetails?.imageUrl || "https://placehold.co/600x450.png?text=Elegant+Footwear",
      aiHint: categoryDetails?.aiHint || "formal shoes business",
      preTitle: "Style Destination",
      title: "Formal Shoes",
      description: categoryDetails?.description || "Discover elegance and sophistication with our premium formal shoe collection.",
    },
    {
      imageUrl: "https://placehold.co/600x450.png?text=Classic+Oxfords&style=formal1",
      aiHint: "classic oxfords leather",
      preTitle: "Timeless Classics",
      title: "Formal Shoes",
      description: "Refined footwear for the discerning gentleman.",
    },
    {
      imageUrl: "https://placehold.co/600x450.png?text=Elegant+Loafers&style=formal2",
      aiHint: "elegant loafers suede",
      preTitle: "Modern Sophistication",
      title: "Formal Shoes",
      description: "Perfect for any formal occasion, designed for comfort and style.",
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlidesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === heroSlidesData.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = heroSlidesData[currentSlide];

  return (
    <div className="bg-background">
      <section className="relative bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 py-12 md:py-16 lg:py-20 text-foreground overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
        <Container className="relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center md:text-left order-2 md:order-1 animate-fadeIn">
              {activeSlide.preTitle && <p className="text-sm text-primary uppercase tracking-wider mb-2">{activeSlide.preTitle}</p>}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline mb-4 md:mb-6">
                {activeSlide.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6 md:mb-8">
                {activeSlide.description}
              </p>
              <Link href="#formal-product-grid" passHref>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 shadow-md rounded-full px-8 py-3 text-base font-semibold transition-colors duration-300"
                >
                  Explore Now
                </Button>
              </Link>
            </div>

            {/* Right Column: Image and Decorative Elements */}
            <div className="relative order-1 md:order-2 flex justify-center items-center h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
              {/* Decorative Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] md:w-[90%] md:h-[90%] bg-slate-200/50 dark:bg-slate-600/30 rounded-full opacity-50 blur-sm"></div>
              </div>
              {/* Decorative Wavy Lines */}
               <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 opacity-60">
                <WavyLinesSVG />
              </div>

              {/* Main Image */}
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] z-20 animate-slideInRight">
                <Image
                  key={activeSlide.imageUrl} // Key change for transition
                  src={activeSlide.imageUrl}
                  alt={activeSlide.title}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={activeSlide.aiHint}
                  priority={currentSlide === 0}
                  className="drop-shadow-2xl transition-opacity duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>

          {/* Carousel Navigation Arrows */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev} 
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/50 hover:bg-white/80 text-foreground rounded-full shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext} 
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/50 hover:bg-white/80 text-foreground rounded-full shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        <h2 id="formal-product-grid" className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">Shop Formal Shoes</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No formal shoes found in this style yet.</p>
        )}
      </Container>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out forwards; }
      `}</style>
    </div>
  );
}
