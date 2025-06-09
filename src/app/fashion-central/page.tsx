
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function FashionCentralPage() {
  const fashionProducts = getFashionProducts();

  const heroContent = {
    title: "Fashion Central",
    description: "Discover the latest trends and timeless styles in clothing and accessories.",
    buttonText: "Explore Collection",
    imageUrl: "https://placehold.co/1200x500.png", 
    imageAiHint: "fashion models", 
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 text-gray-800 overflow-hidden">
        <Container className="relative z-10 py-16 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[70vh] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Column: Text and Button */}
            <div className="text-center md:text-left animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 text-gray-900">
                {heroContent.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 max-w-lg mx-auto md:mx-0 mb-8">
                {heroContent.description}
              </p>
              <Link href={`/fashion-central#${fashionSubCategories[0]?.slug || 'fashion-products'}`} passHref scroll={false}>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300 px-8 py-3 text-base font-semibold group"
                >
                  {heroContent.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right Column: Image (Optional or Decorative) */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] hidden md:flex items-center justify-center animate-slideInRight">
                <Image
                  src={heroContent.imageUrl}
                  alt={heroContent.title}
                  fill
                  style={{ objectFit: "cover" }}
                  data-ai-hint={heroContent.imageAiHint}
                  priority
                  className="rounded-lg shadow-xl"
                />
            </div>
          </div>
        </Container>
      </section>

      {/* Product Grid Sections by Sub-Category */}
      {fashionSubCategories.map((subCategory) => (
        <Container key={subCategory.slug} className="py-12 md:py-16">
          <h2 id={subCategory.slug} className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">
            Shop {subCategory.name}
          </h2>
          {fashionProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {fashionProducts.map((product) => (
                // Later, you would filter fashionProducts here if they had a subCategory field
                // For now, we display all fashion products under each sub-category heading
                <ProductCard key={product.id + '-' + subCategory.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xl py-10">No {subCategory.name.toLowerCase()} available at the moment.</p>
          )}
           {/* Add a "View More" button or link for each sub-category if desired */}
           <div className="text-center mt-10">
             <Button variant="outline" asChild>
               <Link href={`/search?category=fashion&subcategory=${subCategory.slug}`}>View More {subCategory.name}</Link>
             </Button>
           </div>
        </Container>
      ))}

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
