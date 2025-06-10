"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const getFashionProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Fashion');
};

const fashionSubCategories = [
  { name: "Shirts", slug: "shirts" },
  { name: "Pants", slug: "pants" },
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Cargo Pants", slug: "cargo-pants" },
  { name: "Dropshoulder T-Shirts", slug: "dropshoulder-t-shirts" },
];

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
      }}
    >
      {children}
    </section>
  );
}

export default function FashionCentralPage() {
  const fashionProducts = getFashionProducts();

  const heroContent = {
    title: "Fashion Central",
    description: "Discover the latest trends and timeless styles in clothing and accessories.",
    buttonText: "Explore Collection",
    imageUrl: "/images/fasion/header1.jpeg", 
    imageAiHint: "fashion models", 
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 text-gray-800 overflow-hidden">
        {/* Background Image for Mobile */}
        <div className="md:hidden absolute inset-0 z-0">
          <Image
            src={heroContent.imageUrl}
            alt={heroContent.title}
            fill
            style={{ objectFit: "cover" }}
            className="opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        
        <Container className="relative z-10 py-12 md:py-24 lg:py-32 min-h-[60vh] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Column: Text and Button */}
            <AnimatedSection>
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 md:mb-6 text-gray-900">
                  {heroContent.title}
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-lg mx-auto md:mx-0 mb-6 md:mb-8">
                  {heroContent.description}
                </p>
                <Link href={`/fashion-central#${fashionSubCategories[0]?.slug || 'fashion-products'}`} passHref scroll={false}>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold group"
                  >
                    {heroContent.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Right Column: Image - Hidden on mobile, shown on md and up */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] hidden md:flex items-center justify-center">
              <Image
                src={heroContent.imageUrl}
                alt={heroContent.title}
                fill
                style={{ objectFit: "cover" }}
                data-ai-hint={heroContent.imageAiHint}
                priority
                className="rounded-lg shadow-xl transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1200px) 50vw, 40vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Product Grid Sections by Sub-Category */}
      {fashionSubCategories.map((subCategory, index) => (
        <Container key={subCategory.slug} className="py-10 md:py-16">
          <AnimatedSection>
            <div>
              <h2 
                id={subCategory.slug} 
                className="text-2xl sm:text-3xl font-bold font-headline text-center mb-8 md:mb-10 scroll-mt-20"
              >
                Shop {subCategory.name}
              </h2>
              {fashionProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
                  {fashionProducts.map((product) => (
                    <div key={product.id + '-' + subCategory.slug} className="hover:scale-[1.02] transition-transform duration-300">
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
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Link href={`/search?category=fashion&subcategory=${subCategory.slug}`}>
                    View More {subCategory.name}
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      ))}
    </div>
  );
}