"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Router as RouterIcon, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const getSmartGadgetProducts = (): Product[] => {
  // For now, show all electronics. Later, refine if subcategories are added.
  return mockProducts.filter(product => product.category === 'Electronics');
};

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
      }}
    >
      {children}
    </div>
  );
};

export default function SmartGadgetsPage() {
  const smartGadgetProducts = getSmartGadgetProducts();

  const heroContent = {
    title: "Future Forward Living",
    subTitle: "Smart Gadgets Hub",
    description: "Automate your life with our collection of innovative smart gadgets. From smart home devices to personal tech, find the future here.",
    buttonText: "Explore Smart Tech",
    imageUrl: "/images/tech-vault/smart-gadgets.jpeg", 
    imageAiHint: "smart home automation", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={heroContent.imageUrl}
            alt="Abstract smart gadgets background"
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
          <AnimatedSection>
            <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
              <RouterIcon className="h-10 w-10 md:h-16 md:w-16 mb-4 text-white/80 mx-auto md:mx-0 animate-float" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-3">
                {heroContent.subTitle}
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-pink-200">
                {heroContent.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                {heroContent.description}
              </p>
              <Link href="#smart-gadgets-grid" passHref scroll={false}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-purple-600 transition-colors duration-300 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold group"
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Product Grid Section */}
      <section id="smart-gadgets-grid" className="scroll-mt-16">
        <Container className="py-8 md:py-16">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center mb-8 md:mb-10">
              Our Smart Gadget Selection
            </h2>
            {smartGadgetProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
                {smartGadgetProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                    className="opacity-0 animate-fadeIn"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-lg md:text-xl py-8 md:py-10">
                No smart gadgets available at the moment.
              </p>
            )}
            <div className="text-center mt-8 md:mt-10">
              <Button 
                variant="default" 
                asChild
                className="hover:scale-105 transition-transform duration-300"
              >
                <Link href="/search?category=electronics&subcategory=smart-gadgets">
                  View All Smart Gadgets
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.6s ease-out forwards; 
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}