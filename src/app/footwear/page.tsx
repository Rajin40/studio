
"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle } from 'lucide-react'; // Using a similar icon

const getCategoryDetails = (slug: string): Category | undefined => {
  return mockCategories.find(cat => cat.slug === slug);
};

const getAllShoeProducts = (): Product[] => {
  const shoeCategoryDetails = mockCategories.filter(
    cat => cat.id === 'footwear' || cat.parentCategoryId === 'footwear'
  );
  const shoeCategoryNames = shoeCategoryDetails.map(cat => cat.name);
  
  return mockProducts.filter(product => 
    shoeCategoryNames.includes(product.category)
  );
};

export default function FootwearPage() {
  const styleSlug = "footwear";
  // const categoryDetails = getCategoryDetails(styleSlug); // Not directly used in hero anymore
  const products = getAllShoeProducts();

  // Hero data inspired by the image
  const heroData = {
    titlePrimary: "Footwear",
    titleSecondary: "Shoes",
    description: "All kinds of shoes for every occasion.",
    mainImageUrl: "/images/shoe_store/Footwear/foot.png", // Placeholder for the main red shoe
    mainImageAiHint: "red woven sneaker modern",
    buttonText: "VIEW PRODUCT",
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Redesigned */}
      <section className="relative bg-white min-h-screen flex flex-col justify-center text-neutral-800 py-12 md:py-0 overflow-hidden">
        <Container className="h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 h-full">
            {/* Left Column: Text and Button */}
            <div className="text-center md:text-left order-2 md:order-1 animate-fadeIn">
              <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-8xl tracking-tighter leading-tight">
                {heroData.titlePrimary}
                <br />
                {heroData.titleSecondary}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-md mx-auto md:mx-0">
                {heroData.description}
              </p>
              <Link href="#product-grid" scroll={true} passHref>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-8 border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-300 px-10 py-6 text-base font-semibold"
                >
                  {heroData.buttonText}
                </Button>
              </Link>
            </div>

            {/* Right Column: Image Composition */}
            <div className="flex justify-center items-center order-1 md:order-2 p-4 md:p-0">
              {/* Main Shoe Image */}
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[7/9]">
                <Image
                  src={heroData.mainImageUrl}
                  alt="Featured Shoe"
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={heroData.mainImageAiHint}
                  priority
                  className="drop-shadow-2xl"
                />
              </div>
              {/* Circular Arrow Icon Placeholder - visual only */}
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 text-neutral-400 opacity-75 hidden md:block">
                <ArrowRightCircle size={40} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Grid Section */}
      <Container className="py-12 md:py-16">
        <h2 id="product-grid" className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20">All Our Footwear</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl py-10">No footwear found at the moment.</p>
        )}
      </Container>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
