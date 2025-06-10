"use client";

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

  const colorSchemes = [
    {
      name: "classic",
      bgGradient: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900",
      textColor: "text-white",
      buttonVariant: "default" as const,
      buttonClass: "bg-white text-slate-900 hover:bg-slate-100",
      decorativeColor: "bg-white/10"
    },
    {
      name: "warm",
      bgGradient: "bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800",
      textColor: "text-white",
      buttonVariant: "outline" as const,
      buttonClass: "bg-transparent border-white text-white hover:bg-white/10",
      decorativeColor: "bg-amber-400/10"
    }
  ];

  const heroSlidesData = [
    {
      imageUrl: "/images/shoe_store/Formal/formal.png",
      aiHint: categoryDetails?.aiHint || "formal shoes business",
      preTitle: "Style Destination",
      title: "Formal Shoes",
      description: categoryDetails?.description || "Discover elegance and sophistication with our premium formal shoe collection.",
    },
    {
      imageUrl: "/images/shoe_store/Formal/formal1.jpeg",
      aiHint: "classic oxfords leather",
      preTitle: "Timeless Classics",
      title: "Formal Shoes",
      description: "Refined footwear for the discerning gentleman.",
    },
    {
      imageUrl: "/images/shoe_store/Formal/formal2.jpeg",
      aiHint: "elegant loafers suede",
      preTitle: "Modern Sophistication",
      title: "Formal Shoes",
      description: "Perfect for any formal occasion, designed for comfort and style.",
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentColorScheme, setCurrentColorScheme] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev === heroSlidesData.length - 1 ? 0 : prev + 1));
        setCurrentColorScheme(prev => (prev === colorSchemes.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlidesData.length]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setCurrentColorScheme(index % colorSchemes.length);
      setIsTransitioning(false);
    }, 500);
  };

  const activeSlide = heroSlidesData[currentSlide];
  const activeColorScheme = colorSchemes[currentColorScheme];

  return (
    <div className="bg-background">
      {/* Hero Section - Mobile Optimized */}
      <section 
        className={`relative ${activeColorScheme.bgGradient} ${activeColorScheme.textColor} py-12 md:py-16 lg:py-20 overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center transition-all duration-1000`}
      >
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${activeColorScheme.decorativeColor}`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Left Column: Text Content - Mobile First */}
            <div className={`text-center md:text-left order-2 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {activeSlide.preTitle && (
                <p className="text-xs sm:text-sm uppercase tracking-wider mb-2 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <span className="bg-white/20 px-2 py-1 sm:px-3 rounded-full">
                    {activeSlide.preTitle}
                  </span>
                </p>
              )}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-3 md:mb-6 animate-fadeInUp" 
                style={{ animationDelay: '0.2s' }}
              >
                {activeSlide.title}
              </h1>
              <p 
                className="text-sm sm:text-base max-w-md mx-auto md:mx-0 mb-4 md:mb-8 animate-fadeInUp" 
                style={{ animationDelay: '0.3s', opacity: 0.9 }}
              >
                {activeSlide.description}
              </p>
              <Link href="#formal-product-grid" passHref>
                <Button 
                  size="lg" 
                  variant={activeColorScheme.buttonVariant}
                  className={`rounded-full px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 animate-fadeInUp ${activeColorScheme.buttonClass}`}
                  style={{ animationDelay: '0.4s' }}
                >
                  Explore Now
                </Button>
              </Link>
            </div>

            {/* Right Column: Image - Mobile Optimized */}
            <div className="relative order-1 md:order-2 flex justify-center items-center h-[250px] sm:h-[300px] md:h-[450px] mb-6 md:mb-0">
              {/* Decorative Circle - Smaller on mobile */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-[70%] h-[70%] md:w-[90%] md:h-[90%] rounded-full opacity-50 blur-sm animate-pulse-slow ${activeColorScheme.decorativeColor}`}></div>
              </div>
              
              {/* Decorative Wavy Lines - Smaller on mobile */}
              <div className="absolute top-2 right-2 md:top-6 md:right-6 z-10 opacity-60 animate-float">
                <WavyLinesSVG />
              </div>

              {/* Main Image - Mobile Optimized */}
              <div className={`relative w-full max-w-xs md:max-w-md aspect-square md:aspect-[7/9] z-20 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <Image
                  src={activeSlide.imageUrl}
                  alt={activeSlide.title}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={activeSlide.aiHint}
                  priority={currentSlide === 0}
                  className="drop-shadow-xl md:drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Carousel Navigation Dots - Smaller on mobile */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {heroSlidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white md:w-6' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Product Grid - Mobile Optimized */}
      <Container className="py-6 md:py-12">
        <h2 id="formal-product-grid" className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-6 md:mb-10 scroll-mt-20 animate-fadeIn">
          Shop Formal Shoes
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg md:text-xl py-8 md:py-10 animate-fadeIn">
            No formal shoes found in this style yet.
          </p>
        )}
      </Container>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}