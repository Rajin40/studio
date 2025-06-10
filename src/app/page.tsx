"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, mockArticles } from '@/lib/data';
import { ChevronRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInRight = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slides = [
  {
    mainImage: "/images/home_board_image/shoes.png",
    mainImageHint: "yellow sneaker",
    stripImages: [
      { offset: '5%', image: '/images/home_board_image/hude.jpg', hint: 'shoe detail texture', z: '10', w: '30%' },
      { offset: '30%', image: 'images/home_board_image/shoeswithpant.png', hint: 'denim fashion style', z: '20', w: '30%' },
      { offset: '55%', image: '/images/home_board_image/summer.jpg', hint: 'fashion clothing fabric', z: '10', w: '30%' },
    ]
  },
  {
    mainImage: "/images/home_board_image/shoes.png",
    mainImageHint: "running shoe",
     stripImages: [
      { offset: '5%', image: '/images/home_board_image/hude.jpg', hint: 'shoe detail texture', z: '10', w: '30%' },
      { offset: '30%', image: 'images/home_board_image/shoeswithpant.png', hint: 'denim fashion style', z: '20', w: '30%' },
      { offset: '55%', image: '/images/home_board_image/summer.jpg', hint: 'fashion clothing fabric', z: '10', w: '30%' },
    ]
  },
  {
    mainImage: "/images/home_board_image/shoes.png",
    mainImageHint: "classic sneaker",
    stripImages: [
      { offset: '5%', image: '/images/home_board_image/hude.jpg', hint: 'shoe detail texture', z: '10', w: '30%' },
      { offset: '30%', image: 'images/home_board_image/shoeswithpant.png', hint: 'denim fashion style', z: '20', w: '30%' },
      { offset: '55%', image: '/images/home_board_image/summer.jpg', hint: 'fashion clothing fabric', z: '10', w: '30%' },
    ]
  },
  {
    mainImage: "/images/home_board_image/shoes.png",
    mainImageHint: "vintage sneaker",
    stripImages: [
      { offset: '5%', image: '/images/home_board_image/hude.jpg', hint: 'shoe detail texture', z: '10', w: '30%' },
      { offset: '30%', image: 'images/home_board_image/shoeswithpant.png', hint: 'denim fashion style', z: '20', w: '30%' },
      { offset: '55%', image: '/images/home_board_image/summer.jpg', hint: 'fashion clothing fabric', z: '10', w: '30%' },
    ]
  },
  {
    mainImage: "/images/home_board_image/shoes.png",
    mainImageHint: "lifestyle sneaker",
    stripImages: [
      { offset: '5%', image: '/images/home_board_image/hude.jpg', hint: 'shoe detail texture', z: '10', w: '30%' },
      { offset: '30%', image: 'images/home_board_image/shoeswithpant.png', hint: 'denim fashion style', z: '20', w: '30%' },
      { offset: '55%', image: '/images/home_board_image/summer.jpg', hint: 'fashion clothing fabric', z: '10', w: '30%' },
    ]
  },
];
const totalSlides = slides.length;

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []); 

  const activeSlide = slides[currentSlide];

  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  
  const allFeaturedCategories = mockCategories.slice(0, 12);
  const categoriesPhase1 = allFeaturedCategories.slice(0, 4);
  const categoriesPhase2 = allFeaturedCategories.slice(4, 8);
  const categoriesPhase3 = allFeaturedCategories.slice(8, 12);

  const blogHighlights = mockArticles.slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="bg-emerald-800 text-white relative overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center">
        <Container className="relative z-10 h-full py-12 md:py-16 w-full">
          <div className="flex flex-col h-full justify-between min-h-[75vh] md:min-h-[80vh]">
            <div className="grid grid-cols-12 gap-x-4 items-center flex-grow">
              {/* Left Vertical Elements */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideInLeft}
                className="col-span-1 hidden md:flex flex-col items-center justify-between self-stretch py-8"
              >
                <div className="flex-grow"></div> 
                <div className="flex flex-col items-center space-y-3 text-xs opacity-75">
                  <span>{currentSlide + 1} / {totalSlides}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/75 hover:bg-white/10 hover:text-white" onClick={handlePrev}><ChevronLeft className="h-4 w-4"/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/75 hover:bg-white/10 hover:text-white" onClick={handleNext}><ChevronRight className="h-4 w-4"/></Button>
                  <div className="flex flex-col space-y-1 pt-2">
                    {slides.map((_, index) => (
                      <span key={index} className={`h-1.5 w-1.5 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}></span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Content Area - Title and Images */}
              <div className="col-span-12 md:col-span-11 relative flex flex-col justify-center items-center text-center md:items-start md:text-left h-full">
                {/* Image Composition */}
                <div className="absolute inset-0 flex justify-center items-center opacity-30 md:opacity-100">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                    <AnimatePresence mode="wait">
                      {activeSlide.stripImages.map((strip, index) => (
                        <motion.div
                          key={`${currentSlide}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="absolute top-0 h-full transform -skew-x-[15deg] overflow-hidden"
                          style={{ left: strip.offset, zIndex: parseInt(strip.z), width: strip.w }}
                        >
                          <div
                            className="absolute inset-[-15px] transform skew-x-[15deg] bg-cover bg-center"
                            style={{ backgroundImage: `url(${strip.image})` }}
                            data-ai-hint={strip.hint}
                          ></div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute right-[-80] top-1/2 transform -translate-y-1/2 z-30 w-[30%] min-w-[150px] max-w-[220px]"
                      >
                        <Image
                          src={activeSlide.mainImage}
                          alt="Featured Shoe"
                          width={300}
                          height={200}
                          className="object-contain"
                          data-ai-hint={activeSlide.mainImageHint}
                          priority={currentSlide === 0} 
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="relative z-20 mt-8 md:mt-0"
                >
                  <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-none drop-shadow-md">
                    DESIGN
                  </motion.h1>
                  <motion.p variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mt-[-0.1em] sm:mt-[-0.15em] drop-shadow-md">
                    & HIGH QUALITY
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-4 items-center pt-8 md:pt-4 pb-4">
              <div className="col-span-1 hidden md:block"></div> 
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-12 md:col-span-11 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
              >
                <div className="flex-grow"></div> 
                <Link href="/search" className="flex items-center text-xs sm:text-sm hover:underline hover:opacity-100 opacity-75">
                  View Products <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Phase 1 Categories */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Phase 1 Categories</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categoriesPhase1.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/search?category=${category.id}`} className="group block">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      data-ai-hint={category.aiHint || 'category image'}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white font-headline text-center px-2">{category.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>
      
      {/* Phase 2 Categories */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16 bg-muted/10"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Phase 2 Categories</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categoriesPhase2.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/search?category=${category.id}`} className="group block">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      data-ai-hint={category.aiHint || 'category image'}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white font-headline text-center px-2">{category.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Phase 3 Categories */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Phase 3 Categories</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categoriesPhase3.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/search?category=${category.id}`} className="group block">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      data-ai-hint={category.aiHint || 'category image'}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white font-headline text-center px-2">{category.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Top Products / Featured Products */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16 bg-muted/20"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Featured Products</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Promotional Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-12 md:py-16 bg-accent text-accent-foreground"
      >
        <Container className="text-center">
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Limited Time Offer!</motion.h2>
          <motion.p variants={slideUp} className="text-lg mb-6">Get 20% off on selected items. Use code <span className="font-semibold">SAVE20</span> at checkout.</motion.p>
          <motion.div variants={slideUp}>
            <Button size="lg" variant="outline" asChild className="border-accent-foreground text-foreground hover:bg-accent-foreground hover:text-accent">
              <Link href="/search?promo=save20">Shop Deals</Link>
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      {/* New Arrivals */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">New Arrivals</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
          >
            {newArrivals.map((product, index) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Trust Badges */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-12 md:py-16 bg-muted/20"
      >
        <Container>
          <TrustBadgesSection />
        </Container>
      </motion.section>

      {/* Blog Highlights */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">From Our Blog</motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {blogHighlights.map((article, index) => (
              <motion.div key={article.id} variants={itemVariants}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            variants={slideUp}
            className="text-center mt-10"
          >
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts <ChevronRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-12 md:py-16 bg-primary text-primary-foreground"
      >
        <Container className="max-w-xl mx-auto text-center">
          <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Stay Updated!</motion.h2>
          <motion.p variants={slideUp} className="mb-6">Subscribe to our newsletter for the latest products, offers, and updates.</motion.p>
          <motion.div variants={slideUp}>
            <NewsletterSignup />
          </motion.div>
        </Container>
      </motion.section>
    </div>
  );
}