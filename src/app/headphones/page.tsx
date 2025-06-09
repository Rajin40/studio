
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Headphones as HeadphonesIcon, ChevronRight } from 'lucide-react';

const getHeadphoneProducts = (): Product[] => {
  // For now, show all electronics. Later, this can be refined if subcategories are added to product data.
  return mockProducts.filter(product => product.category === 'Electronics');
};

export default function HeadphonesPage() {
  const headphoneProducts = getHeadphoneProducts();

  const heroContent = {
    title: "Immersive Audio Experience",
    subTitle: "Headphones Collection",
    description: "Discover high-fidelity headphones for music, gaming, and calls. Crystal-clear sound, ultimate comfort.",
    buttonText: "Shop All Headphones",
    imageUrl: "https://placehold.co/1200x500.png", // Placeholder for a headphone-specific hero image
    imageAiHint: "headphones audio lifestyle", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
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
          />
           <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay */}
        </div>
        <Container className="relative z-10 py-16 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[70vh] flex items-center">
          <div className="text-center md:text-left max-w-2xl">
            <HeadphonesIcon className="h-12 w-12 md:h-16 md:w-16 mb-4 text-white/80 mx-auto md:mx-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-3 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {heroContent.subTitle}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-purple-200 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              {heroContent.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-200 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              {heroContent.description}
            </p>
            <Link href="#headphone-products-grid" passHref scroll={false}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-purple-700 transition-colors duration-300 px-8 py-3 text-base font-semibold group animate-fadeInUp"
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
      <Container id="headphone-products-grid" className="py-12 md:py-16 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10">
          Our Headphone Selection
        </h2>
        {headphoneProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {headphoneProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No headphones available at the moment.</p>
        )}
         <div className="text-center mt-10">
           <Button variant="default" asChild>
             <Link href="/search?category=electronics&subcategory=headphones">View All Headphones</Link>
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
