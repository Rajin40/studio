"use client";

import * as React from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem, Watch, Zap, Clock, ChevronRight } from 'lucide-react';
import { useInView } from 'framer-motion';

const getWatchProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Electronics').slice(0, 8);
};

const watchSubCategories = [
  { name: "Luxury Watches", slug: "luxury-watches", icon: <Gem className="h-8 w-8 mb-3 text-amber-400" />, description: "Exquisite craftsmanship and timeless design.", pageLink: "/timepiece-gallery#luxury-watches-grid" },
  { name: "Smartwatches", slug: "smartwatches", icon: <Watch className="h-8 w-8 mb-3 text-sky-400" />, description: "Stay connected with cutting-edge technology.", pageLink: "/timepiece-gallery#smartwatches-grid" },
  { name: "Sport Watches", slug: "sport-watches", icon: <Zap className="h-8 w-8 mb-3 text-red-400" />, description: "Durable and functional for active lifestyles.", pageLink: "/timepiece-gallery#sport-watches-grid" },
  { name: "Casual Watches", slug: "casual-watches", icon: <Clock className="h-8 w-8 mb-3 text-green-400" />, description: "Stylish everyday timepieces for any occasion.", pageLink: "/timepiece-gallery#casual-watches-grid" },
];

const AnimatedElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default function TimepieceGalleryPage() {
  const watchProducts = getWatchProducts();

  const heroContent = {
    title: "Timepiece Gallery",
    subTitle: "Timeless Elegance, Modern Precision",
    description: "Explore our curated collection of fine timepieces, from classic luxury to cutting-edge smartwatches.",
    buttonText: "Discover Our Collections",
    imageUrl: "https://placehold.co/1200x600.png", 
    imageAiHint: "watches luxury timepieces", 
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-gray-100 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 text-foreground">
      {/* Hero Section */}
      <section id="timepiece-hero" className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroContent.imageUrl}
            alt="Watch collection background"
            fill
            className="object-cover"
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        
        <Container className="relative z-10 py-16 md:py-32 min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
          <AnimatedElement delay={0.1}>
            <div className="text-center max-w-3xl mx-auto px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-3 md:mb-4">
                {heroContent.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-4 md:mb-6">
                {heroContent.subTitle}
              </p>
              <p className="text-sm sm:text-base text-slate-300 mb-6 md:mb-10">
                {heroContent.description}
              </p>
              <Link href="#watch-categories" passHref scroll={false}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 px-8 md:px-10 py-2 md:py-3 text-base md:text-lg font-semibold group"
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* Categories Section */}
      <section id="watch-categories" className="scroll-mt-16">
        <Container className="py-10 md:py-20">
          <AnimatedElement delay={0.2}>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10 md:mb-16 text-slate-800 dark:text-slate-100">
                Explore Watch Styles
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {watchSubCategories.map((subCategory, index) => (
                  <Link key={subCategory.slug} href={subCategory.pageLink} passHref>
                    <div 
                      className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-2"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 md:p-3 rounded-full bg-primary/10 mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                          {React.cloneElement(subCategory.icon, { className: `${subCategory.icon.props.className} group-hover:scale-105 transition-transform` })}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold font-headline mb-1 md:mb-2 group-hover:text-primary transition-colors">{subCategory.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{subCategory.description}</p>
                        <Button variant="ghost" size="sm" className="text-primary group-hover:underline text-xs md:text-sm">
                          View Collection <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </Container>
      </section>
      
      {/* Product Grid Sections */}
      {watchSubCategories.map((subCategory) => (
        <section key={`${subCategory.slug}-section`} id={`${subCategory.slug}-grid`} className="scroll-mt-16">
          <Container className="py-8 md:py-16">
            <AnimatedElement delay={0.3}>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-8 md:mb-10 text-slate-800 dark:text-slate-100">
                  Featured {subCategory.name}
                </h2>
                {watchProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {watchProducts.slice(0,4).map((product, index) => (
                      <div 
                        key={`${product.id}-${subCategory.slug}`}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                        className="opacity-0 animate-productFadeIn"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-lg md:text-xl py-8 md:py-10">
                    No {subCategory.name.toLowerCase()} available at the moment.
                  </p>
                )}
                <div className="text-center mt-8 md:mt-10">
                  <Button 
                    variant="outline" 
                    asChild
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <Link href={`/search?category=watches&subcategory=${subCategory.slug}`}>
                      View More {subCategory.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </Container>
        </section>
      ))}

      <style jsx global>{`
        @keyframes productFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-productFadeIn {
          animation: productFadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}