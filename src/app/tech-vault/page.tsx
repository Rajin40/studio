
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Headphones, Smartphone, BatteryCharging, Power, Bluetooth, Router, ChevronRight } from 'lucide-react';

const getElectronicsProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Electronics');
};

const electronicsSubCategories = [
  { name: "Headphones", slug: "headphones", icon: <Headphones className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "headphones audio tech" },
  { name: "Phone Covers", slug: "phone-covers", icon: <Smartphone className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "phone case accessory" },
  { name: "Chargers", slug: "chargers", icon: <BatteryCharging className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "charger cable tech" },
  { name: "Power Banks", slug: "power-banks", icon: <Power className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "power bank portable" },
  { name: "Bluetooth Devices", slug: "bluetooth-devices", icon: <Bluetooth className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "bluetooth speaker wireless" },
  { name: "Smart Gadgets", slug: "smart-gadgets", icon: <Router className="h-8 w-8 mb-2 text-primary" />, imageAiHint: "smart home device" },
];

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Animated circuits/grid pattern - conceptual placeholder */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2240%22%20height%3d%2240%22%20viewBox%3d%220%200%2040%2040%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cg%20fill%3d%22%232E1065%22%20fill-opacity%3d%220.4%22%20fill-rule%3d%22evenodd%22%3e%3cpath%20d%3d%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3e%3c/g%3e%3c/svg%3e')] opacity-50 animate-pulseGlow"></div>
          <Image
            src={heroContent.imageUrl}
            alt="Abstract tech background"
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={heroContent.imageAiHint}
            priority
            className="opacity-30"
          />
        </div>
        <Container className="relative z-10 py-20 md:py-32 lg:py-40 min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {heroContent.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              {heroContent.description}
            </p>
            <Link href={`/tech-vault#${electronicsSubCategories[0]?.slug || 'electronics-categories'}`} passHref scroll={false}>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-300 hover:scale-105 px-10 py-3 text-lg font-semibold group animate-fadeInUp"
                style={{ animationDelay: '0.6s' }}
              >
                {heroContent.buttonText}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Animated Category Sections */}
      <Container id="electronics-categories" className="py-12 md:py-16 scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12">Explore Our Tech Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {electronicsSubCategories.map((subCategory, index) => (
            <Link key={subCategory.slug} href={`/search?category=electronics&subcategory=${subCategory.slug}`} passHref>
              <div 
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group animate-categorySlideUp"
                style={{ animationDelay: `${index * 0.1 + 0.2}s`}}
              >
                <div className="flex flex-col items-center text-center">
                  {subCategory.icon}
                  <h3 className="text-xl font-semibold font-headline mb-2 group-hover:text-primary transition-colors">{subCategory.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Browse the latest {subCategory.name.toLowerCase()}.</p>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View {subCategory.name} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      
      {/* Product Grid Sections by Sub-Category (Placeholder) */}
      {electronicsSubCategories.map((subCategory) => (
        <Container key={`${subCategory.slug}-products`} className="py-12 md:py-16">
          <h2 id={subCategory.slug} className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">
            Featured {subCategory.name}
          </h2>
          {electronicsProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {electronicsProducts.slice(0,6).map((product) => ( // Displaying first 6 electronics products as placeholder
                <ProductCard key={`${product.id}-${subCategory.slug}`} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xl py-10">No {subCategory.name.toLowerCase()} available at the moment.</p>
          )}
           <div className="text-center mt-10">
             <Button variant="outline" asChild>
               <Link href={`/search?category=electronics&subcategory=${subCategory.slug}`}>View More {subCategory.name}</Link>
             </Button>
           </div>
        </Container>
      ))}

       <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes categorySlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; filter: brightness(100%); }
          50% { opacity: 0.8; filter: brightness(120%); }
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.8s ease-out forwards; 
          opacity: 0; /* Start hidden for animation */
        }
        .animate-categorySlideUp {
          animation: categorySlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0; /* Start hidden for animation */
        }
        .animate-pulseGlow {
          animation: pulseGlow 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

