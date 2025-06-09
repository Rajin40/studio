
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Power as PowerIcon, ChevronRight } from 'lucide-react';

const getPowerBankProducts = (): Product[] => {
  // For now, show all electronics. Later, refine if subcategories are added.
  return mockProducts.filter(product => product.category === 'Electronics');
};

export default function PowerBanksPage() {
  const powerBankProducts = getPowerBankProducts();

  const heroContent = {
    title: "Power On The Go",
    subTitle: "Power Banks Collection",
    description: "Stay charged wherever you are with our reliable and high-capacity power banks. Never miss a moment.",
    buttonText: "Shop All Power Banks",
    imageUrl: "https://placehold.co/1200x500.png", 
    imageAiHint: "power bank portable energy", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white overflow-hidden">
         <div className="absolute inset-0 opacity-20">
          <Image
            src={heroContent.imageUrl}
            alt="Abstract power banks background"
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={heroContent.imageAiHint}
            priority
            className="opacity-40"
          />
           <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}
        </div>
        <Container className="relative z-10 py-16 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[70vh] flex items-center">
          <div className="text-center md:text-left max-w-2xl">
            <PowerIcon className="h-12 w-12 md:h-16 md:w-16 mb-4 text-white/80 mx-auto md:mx-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-3 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {heroContent.subTitle}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-yellow-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {heroContent.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-100 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              {heroContent.description}
            </p>
            <Link href="#power-banks-grid" passHref scroll={false}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-orange-600 transition-colors duration-300 px-8 py-3 text-base font-semibold group animate-fadeInUp"
                style={{ animationDelay: '0.4s' }}
              >
                {heroContent.buttonText}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Grid Section */}
      <Container id="power-banks-grid" className="py-12 md:py-16 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10">
          Our Power Bank Selection
        </h2>
        {powerBankProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {powerBankProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No power banks available at the moment.</p>
        )}
         <div className="text-center mt-10">
           <Button variant="default" asChild>
             <Link href="/search?category=electronics&subcategory=power-banks">View All Power Banks</Link>
           </Button>
         </div>
      </Container>

       <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.6s ease-out forwards; 
          opacity: 0; /* Start hidden for animation */
        }
      `}</style>
    </div>
  );
}
