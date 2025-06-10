"use client";

import * as React from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shirt, UserCheck, Palette, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Create motion-enhanced Button component
const MotionButton = motion(Button);

const getPanjabiProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Fashion').slice(0, 8);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const cardHover = {
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 via-red-50 to-yellow-50 dark:from-slate-900 dark:via-red-900/30 dark:to-yellow-900/30 text-foreground overflow-hidden">
      {/* Hero Section with Framer Motion */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden" style={{ backgroundImage: `url(${heroContent.imageUrl})`}}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-orange-600/60 to-yellow-500/50 backdrop-blur-sm"></div>
        <Container className="relative z-10 py-12 md:py-20 lg:py-32 xl:py-40 min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center">
          <motion.div 
            className="text-center max-w-3xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-headline mb-3 sm:mb-4"
              variants={fadeInUp}
            >
              {heroContent.title}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-slate-100 mb-4 sm:mb-6"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {heroContent.subTitle}
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 sm:mb-8 md:mb-10"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              {heroContent.description}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <Link href={`/cultural-threads#${panjabiSubCategories[0]?.slug || 'panjabi-categories'}`} passHref scroll={false}>
                <MotionButton 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg font-semibold group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </MotionButton>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Animated Category Sections */}
      <Container className="py-10 md:py-16 lg:py-20">
        <div id="panjabi-categories" className="scroll-mt-20">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10 md:mb-12 lg:mb-16 text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Discover Panjabi Styles
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {panjabiSubCategories.map((subCategory, index) => (
              <motion.div
                key={subCategory.slug}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
              >
                <Link href={subCategory.pageLink} passHref>
                  <motion.div 
                    className="bg-card p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out h-full"
                    variants={cardHover}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="p-2 sm:p-3 rounded-full bg-primary/10 mb-2 sm:mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                        {React.cloneElement(subCategory.icon, { className: `${subCategory.icon.props.className} group-hover:scale-105 sm:group-hover:scale-110 transition-transform` })}
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold font-headline mb-1 sm:mb-2 group-hover:text-primary transition-colors">{subCategory.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 md:mb-4 h-10 line-clamp-2">{subCategory.description}</p>
                      <MotionButton 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary text-xs sm:text-sm group-hover:underline px-2 sm:px-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Collection <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </MotionButton>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
      
      {/* Product Grid Sections with Staggered Animation */}
      {panjabiSubCategories.map((subCategory) => (
        <section key={`${subCategory.slug}-products`} className="py-8 md:py-12 lg:py-16">
          <Container>
            <motion.h2 
              id={`${subCategory.slug}-grid`}
              className="text-2xl sm:text-3xl font-bold font-headline text-center mb-8 md:mb-10 scroll-mt-20 text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Featured {subCategory.name}
            </motion.h2>
            {panjabiProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0"
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, margin: "-50px" }}
              >
                {panjabiProducts.slice(0,4).map((product, index) => (
                  <motion.div
                    key={`${product.id}-${subCategory.slug}`}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p 
                className="text-center text-muted-foreground text-lg sm:text-xl py-8 sm:py-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                No {subCategory.name.toLowerCase()} available at the moment.
              </motion.p>
            )}
            <motion.div 
              className="text-center mt-8 md:mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <MotionButton 
                variant="outline" 
                size="sm" 
                className="text-sm sm:text-base"
                asChild
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/search?category=fashion&subcategory=${subCategory.slug}`}>
                  View More {subCategory.name}
                </Link>
              </MotionButton>
            </motion.div>
          </Container>
        </section>
      ))}
    </div>
  );
}