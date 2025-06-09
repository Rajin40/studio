
"use client";

import * as React from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shirt, UserCheck, Palette, Sparkles, ChevronRight } from 'lucide-react'; // Using Sparkles for footwear as a placeholder

// In a real app, you'd filter specifically for Panjabi attire products.
// For now, we use some fashion products as placeholders.
const getPanjabiProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Fashion').slice(0, 8); // Placeholder
};

const panjabiSubCategories = [
  { name: "Kurta Pajama", slug: "kurta-pajama", icon: <Shirt className="h-8 w-8 mb-3 text-primary" />, description: "Classic comfort and style for every occasion.", pageLink: "/cultural-threads#kurta-pajama-grid" },
  { name: "Sherwanis", slug: "sherwanis", icon: <UserCheck className="h-8 w-8 mb-3 text-primary" />, description: "Regal attire for weddings and grand celebrations.", pageLink: "/cultural-threads#sherwanis-grid" },
  { name: "Phulkari Art", slug: "phulkari-art", icon: <Palette className="h-8 w-8 mb-3 text-primary" />, description: "Vibrant embroidered shawls and dupattas.", pageLink: "/cultural-threads#phulkari-art-grid" },
  { name: "Traditional Footwear", slug: "traditional-footwear", icon: <Sparkles className="h-8 w-8 mb-3 text-primary" />, description: "Handcrafted Mojaris and Juttis to complete your look.", pageLink: "/cultural-threads#traditional-footwear-grid" },
];

export default function CulturalThreadsPage() {
  const panjabiProducts = getPanjabiProducts();

  const heroContent = {
    title: "Cultural Threads",
    subTitle: "Elegance of Tradition",
    description: "Discover authentic Panjabi attire, handcrafted with heritage and modern style.",
    buttonText: "Explore Our Collection",
    imageUrl: "https://placehold.co/1200x600.png", 
    imageAiHint: "indian textiles panjabi fashion", 
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 via-red-50 to-yellow-50 dark:from-slate-900 dark:via-red-900/30 dark:to-yellow-900/30 text-foreground">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden" style={{ backgroundImage: `url(${heroContent.imageUrl})`}}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-orange-600/60 to-yellow-500/50 backdrop-blur-sm"></div> {/* Rich overlay */}
        <Container className="relative z-10 py-20 md:py-32 lg:py-40 min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline mb-4 animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s' }}>
              {heroContent.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-100 mb-6 animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s' }}>
              {heroContent.subTitle}
            </p>
            <p className="text-base sm:text-lg text-slate-200 mb-10 animate-fadeInUp opacity-0" style={{ animationDelay: '0.6s' }}>
              {heroContent.description}
            </p>
            <Link href={`/cultural-threads#${panjabiSubCategories[0]?.slug || 'panjabi-categories'}`} passHref scroll={false}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 px-10 py-3 text-lg font-semibold group animate-fadeInUp opacity-0"
                style={{ animationDelay: '0.8s' }}
              >
                {heroContent.buttonText}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Animated Category Sections */}
      <Container id="panjabi-categories" className="py-12 md:py-20 scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-16 text-slate-800 dark:text-slate-100">
          Discover Panjabi Styles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {panjabiSubCategories.map((subCategory, index) => (
            <Link key={subCategory.slug} href={subCategory.pageLink} passHref>
              <div 
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group animate-categorySlideUp opacity-0"
                style={{ animationDelay: `${index * 0.15 + 0.3}s`}}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    {React.cloneElement(subCategory.icon, { className: `${subCategory.icon.props.className} group-hover:scale-110 transition-transform` })}
                  </div>
                  <h3 className="text-xl font-semibold font-headline mb-2 group-hover:text-primary transition-colors">{subCategory.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">{subCategory.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary group-hover:underline">
                    View Collection <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      
      {/* Product Grid Sections by Sub-Category (Placeholder) */}
      {panjabiSubCategories.map((subCategory) => (
        <Container key={`${subCategory.slug}-products`} className="py-12 md:py-16">
          <h2 id={`${subCategory.slug}-grid`} className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20 text-slate-800 dark:text-slate-100">
            Featured {subCategory.name}
          </h2>
          {panjabiProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
              {panjabiProducts.slice(0,4).map((product) => ( // Displaying first 4 fashion products as placeholder
                <ProductCard key={`${product.id}-${subCategory.slug}`} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xl py-10">No {subCategory.name.toLowerCase()} available at the moment.</p>
          )}
           <div className="text-center mt-10">
             <Button variant="outline" asChild>
               <Link href={`/search?category=fashion&subcategory=${subCategory.slug}`}>View More {subCategory.name}</Link>
             </Button>
           </div>
        </Container>
      ))}

       <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes categorySlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-categorySlideUp {
          animation: categorySlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
}
