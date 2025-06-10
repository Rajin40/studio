"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function FootwearPage() {
  const styleSlug = "footwear";
  const products = getAllShoeProducts();

  const heroData = {
    titlePrimary: "Footwear",
    titleSecondary: "Shoes",
    description: "All kinds of shoes for every occasion.",
    mainImageUrl: "/images/shoe_store/Footwear/foot.png",
    mainImageAiHint: "red woven sneaker modern",
    buttonText: "VIEW PRODUCT",
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Redesigned */}
      <section className="relative bg-white min-h-screen flex flex-col justify-center text-neutral-800 py-12 md:py-0 overflow-hidden">
        <Container className="h-full flex flex-col justify-center">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 h-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Column: Text and Button */}
            <motion.div 
              className="text-center md:text-left order-2 md:order-1"
              variants={containerVariants}
            >
              <motion.h1 
                className="font-extrabold text-5xl sm:text-6xl lg:text-8xl tracking-tighter leading-tight"
                variants={itemVariants}
              >
                {heroData.titlePrimary}
                <br />
                {heroData.titleSecondary}
              </motion.h1>
              <motion.p 
                className="mt-4 text-base sm:text-lg text-neutral-600 max-w-md mx-auto md:mx-0"
                variants={itemVariants}
              >
                {heroData.description}
              </motion.p>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="#product-grid" scroll={true} passHref>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="mt-8 border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-300 px-10 py-6 text-base font-semibold"
                  >
                    {heroData.buttonText}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Image Composition */}
            <motion.div 
              className="flex justify-center items-center order-1 md:order-2 p-4 md:p-0"
              variants={imageVariants}
            >
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
              {/* Circular Arrow Icon */}
              <motion.div 
                className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 text-neutral-400 opacity-75 hidden md:block"
                animate={{ 
                  x: [0, 5, 0],
                  opacity: [0.75, 1, 0.75]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRightCircle size={40} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      // In the Product Grid Section (replace the existing code with this):
      <Container className="py-12 md:py-16">
        <motion.h2 
          id="product-grid" 
          className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          All Our Footwear
        </motion.h2>
        {products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="text-center text-muted-foreground text-xl py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No footwear found at the moment.
          </motion.p>
        )}
      </Container>
    </div>
  );
}