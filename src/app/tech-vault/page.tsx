"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Headphones, Smartphone, BatteryCharging, Power, Bluetooth, Router, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const getElectronicsProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Electronics');
};

const electronicsSubCategories = [
  { name: "Headphones", slug: "headphones", icon: <Headphones className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "headphones audio tech", pageLink: "/headphones" },
  { name: "Phone Covers", slug: "phone-covers", icon: <Smartphone className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "phone case accessory", pageLink: "/phone-covers" },
  { name: "Chargers", slug: "chargers", icon: <BatteryCharging className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "charger cable tech", pageLink: "/chargers" },
  { name: "Power Banks", slug: "power-banks", icon: <Power className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "power bank portable", pageLink: "/power-banks" },
  { name: "Bluetooth Devices", slug: "bluetooth-devices", icon: <Bluetooth className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "bluetooth speaker wireless", pageLink: "/bluetooth-devices" },
  { name: "Smart Gadgets", slug: "smart-gadgets", icon: <Router className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "smart home device", pageLink: "/smart-gadgets" },
];

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default function TechVaultPage() {
  const electronicsProducts = getElectronicsProducts();

  const heroContent = {
    title: "Tech Vault",
    description: "Unlock the Future. Discover cutting-edge electronics and smart gadgets designed to elevate your digital life.",
    buttonText: "Explore Innovations",
    imageUrl: "https://placehold.co/1200x600.png", 
    imageAiHint: "abstract technology futuristic", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section - Updated for mobile */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0">
          {/* Animated circuits/grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2240%22%20height%3d%2240%22%20viewBox%3d%220%200%2040%2040%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cg%20fill%3d%22%232E1065%22%20fill-opacity%3d%220.4%22%20fill-rule%3d%22evenodd%22%3e%3cpath%20d%3d%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3e%3c/g%3e%3c/svg%3e')] opacity-50"></div>
          {/* Hero Image - Made smaller for mobile */}
          <div className="relative w-full h-full">
            <Image
              src={heroContent.imageUrl}
              alt="Abstract tech background"
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint={heroContent.imageAiHint}
              priority
              className="opacity-30 md:opacity-30" // Reduced opacity on mobile
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </div>
        </div>

        <Container className="relative z-10 py-12 md:py-24 lg:py-32 min-h-[50vh] md:min-h-[80vh] flex items-center">
          <div className="text-center max-w-3xl mx-auto px-4">
            <AnimatedSection delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4 md:mb-6">
                {heroContent.title}
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-sm sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8">
                {heroContent.description}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.6}>
              <Link href={`/tech-vault#${electronicsSubCategories[0]?.slug || 'electronics-categories'}`} passHref scroll={false}>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg font-semibold group"
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Category Sections - Updated for 2 columns on mobile */}
      <Container className="py-8 md:py-16">
        <div id="electronics-categories" className="scroll-mt-20">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-6 md:mb-12">
              Explore Our Tech Categories
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-2 sm:px-0">
            {electronicsSubCategories.map((subCategory, index) => (
              <AnimatedSection key={subCategory.slug} delay={index * 0.1}>
                <Link href={subCategory.pageLink} passHref>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      {subCategory.icon}
                      <h3 className="text-base md:text-lg font-semibold font-headline mb-1 md:mb-2 group-hover:text-primary transition-colors">
                        {subCategory.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                        Browse the latest {subCategory.name.toLowerCase()}.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs md:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        View {subCategory.name} <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Product Grid Sections */}
      {electronicsSubCategories.map((subCategory) => (
        <Container key={`${subCategory.slug}-products`} className="py-8 md:py-16">
          <div id={subCategory.slug} className="scroll-mt-20">
            <AnimatedSection>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-6 md:mb-10">
                Featured {subCategory.name}
              </h2>
            </AnimatedSection>
            
            {electronicsProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-6 px-1 sm:px-0">
                {electronicsProducts.slice(0,6).map((product) => (
                  <AnimatedSection key={`${product.id}-${subCategory.slug}`}>
                    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                      <ProductCard product={product} />
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <AnimatedSection>
                <p className="text-center text-muted-foreground text-base md:text-lg py-6 md:py-10">
                  No {subCategory.name.toLowerCase()} available at the moment.
                </p>
              </AnimatedSection>
            )}
            
            <AnimatedSection>
              <div className="text-center mt-6 md:mt-10">
                <Button 
                  variant="outline" 
                  asChild
                  className="text-sm md:text-base hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Link href={subCategory.pageLink.startsWith('/') ? subCategory.pageLink : `/search?category=electronics&subcategory=${subCategory.slug}`}>
                    View More {subCategory.name}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      ))}
    </div>
  );
}