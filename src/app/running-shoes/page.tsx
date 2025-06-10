"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, mockCategories, type Product, type Category } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get category details
const getCategoryDetails = (slug: string): Category | undefined => {
  return mockCategories.find(cat => cat.slug === slug);
};

// Helper to get products for the style
const getProductsForStyle = (styleName: string): Product[] => {
  return mockProducts.filter(product => {
    if (product.category === styleName) {
      const categoryInfo = mockCategories.find(c => c.name === product.category);
      return categoryInfo && (categoryInfo.id === 'footwear' || categoryInfo.parentCategoryId === 'footwear');
    }
    return false;
  });
};

const heroSlidesData = [
  {
    imageUrl: "/images/shoe_store/running/running.jpeg",
    aiHint: "white sneaker laces",
    alt: "White sneaker with untied laces"
  },
  {
    imageUrl: "/images/shoe_store/running/running1.jpeg",
    aiHint: "action shot running",
    alt: "Dynamic Running Shoe Model - Action Shot"
  },
  {
    imageUrl: "/images/shoe_store/running/running2.jpeg",
    aiHint: "sleek running shoes",
    alt: "Pair of Sleek Running Shoes"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

export default function RunningShoesPage() {
  const products = getProductsForStyle("Running Shoes");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection(1); // Always moving forward for auto-play
      setCurrentSlide((prev) => (prev === heroSlidesData.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const activeSlide = heroSlidesData[currentSlide];

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <div className="bg-background">
      <section className="relative flex flex-col md:flex-row min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] text-neutral-800 overflow-hidden">
        {/* Left Content Area (Text, Button, Dots) */}
        <motion.div 
          className="w-full md:w-5/12 bg-white flex flex-col justify-center items-center md:items-start p-6 py-10 sm:p-10 md:p-12 lg:p-16 order-2 md:order-1 text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline mb-4 md:mb-6 text-neutral-900"
            variants={itemVariants}
          >
            Running Shoes
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-neutral-600 max-w-md mx-auto md:mx-0 mb-6 md:mb-8"
            variants={itemVariants}
          >
            High-performance running shoes for athletes.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#running-product-grid" passHref scroll={false}>
              <Button 
                size="lg" 
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-md px-10 py-3 text-base font-semibold transition-colors duration-300 mx-auto md:mx-0"
              >
                Discover More
              </Button>
            </Link>
          </motion.div>
          {/* Carousel Dots */}
          <motion.div 
            className="mt-8 md:mt-10 flex justify-center md:justify-start space-x-3 w-full"
            variants={itemVariants}
          >
            {heroSlidesData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                  currentSlide === index ? 'bg-sky-500 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image Area (with its own background for the blue tint) */}
        <div className="w-full md:w-7/12 bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center p-6 sm:p-8 order-1 md:order-2 relative min-h-[300px] xxs:min-h-[350px] xs:min-h-[400px] sm:min-h-[450px] md:min-h-full">
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[7/9]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlidesData[currentSlide].imageUrl}
                  alt={heroSlidesData[currentSlide].alt}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={heroSlidesData[currentSlide].aiHint}
                  priority={currentSlide === 0}
                  className="drop-shadow-xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <Container className="py-8 md:py-12">
        <motion.h2 
          id="running-product-grid" 
          className="text-2xl sm:text-3xl font-bold font-headline text-center mb-10 scroll-mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Shop Running Shoes
        </motion.h2>
        {products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
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
            No running shoes found in this style yet.
          </motion.p>
        )}
      </Container>
      <style jsx global>{`
        /* Define min-height for very small screens if needed */
        @media (max-width: 360px) {
          .xxs\\:min-h-\\[350px\\] { /* Match class name used in component if needed */
            min-height: 300px !important; 
          }
        }
      `}</style>
    </div>
  );
}