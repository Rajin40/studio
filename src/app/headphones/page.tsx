"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Headphones as HeadphonesIcon, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const getHeadphoneProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Electronics');
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  return (
    <section
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      {children}
    </section>
  );
};

export default function HeadphonesPage() {
  const headphoneProducts = getHeadphoneProducts();

  const heroContent = {
    title: "Immersive Audio Experience",
    subTitle: "Headphones Collection",
    description: "Discover high-fidelity headphones for music, gaming, and calls. Crystal-clear sound, ultimate comfort.",
    buttonText: "Shop All Headphones",
    imageUrl: "/images/tech-vault/headphones.jpeg",
    imageAiHint: "headphones audio lifestyle", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={heroContent.imageUrl}
              alt="Abstract headphones background"
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint={heroContent.imageAiHint}
              priority
              className="opacity-40"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <Container className="relative z-10 py-12 md:py-24 lg:py-32 min-h-[50vh] md:min-h-[70vh] flex items-center">
            <div className="text-center md:text-left max-w-2xl">
              <HeadphonesIcon className="h-10 w-10 md:h-16 md:w-16 mb-4 text-white/80 mx-auto md:mx-0 animate-float" />
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-3">
                {heroContent.subTitle}
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-purple-200">
                {heroContent.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 md:mb-8">
                {heroContent.description}
              </p>
              <Link href="#headphone-products-grid" passHref scroll={false}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-purple-700 transition-colors duration-300 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold group"
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </AnimatedSection>

      {/* Product Grid Section */}
      <AnimatedSection>
        <section id="headphone-products-grid" className="scroll-mt-16">
          <Container className="py-8 md:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-6 md:mb-10">
              Our Headphone Selection
            </h2>
            {headphoneProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
                {headphoneProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-lg py-10">No headphones available at the moment.</p>
            )}
            <div className="text-center mt-8 md:mt-10">
              <Button variant="default" asChild className="px-6 md:px-8 py-2 md:py-3">
                <Link href="/search?category=electronics&subcategory=headphones">View All Headphones</Link>
              </Button>
            </div>
          </Container>
        </section>
      </AnimatedSection>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}