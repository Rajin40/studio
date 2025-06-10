"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, type Category } from '@/lib/data';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, slideIn } from '@/lib/motion';

const heroData = {
  preTitle: "OUR PRODUCT",
  title: "Cool Shoes",
  buttonText: "Checkout",
  buttonLink: "/cart",
  imageUrl: "/images/shoe_store/shoes.jpg",
  imageAlt: "Cool Air Shoes",
  imageAiHint: "yellow sneaker black",
};

export default function ShoeStorePage() {
  // Categories for the "Shop Shoe Styles" section
  const shoeStyleCategories = mockCategories.filter(
    cat => cat.id === 'footwear' || // Include the main 'Footwear' category
           (cat.parentCategoryId === 'footwear' && ['sneakers', 'formal-shoes', 'running-shoes'].includes(cat.slug))
  ).sort((a,b) => { // Ensure specific order if needed, e.g., 'Footwear' first
    const order = ['footwear', 'sneakers', 'formal-shoes', 'running-shoes'];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  }).slice(0, 4); // Ensure we only take up to 4 for a 2x2 or 1x4 grid

  const shoeProducts = mockProducts.filter(
    product => mockCategories.find(cat => cat.name === product.category && (cat.id === 'footwear' || cat.parentCategoryId === 'footwear'))
  );

  const featuredShoeProducts = shoeProducts.filter(p => p.isFeatured).slice(0, 8);
  const newArrivalShoes = [...shoeProducts].sort((a,b) => (b.id > a.id ? 1 : -1) ).slice(0, 8);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-background">
      {/* Hero Banner with animations */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={staggerContainer()}
        className="bg-stone-50 text-neutral-800 relative overflow-hidden"
      >
        <Container className="py-16 md:py-24 lg:py-32 min-h-[calc(80vh)] md:min-h-[calc(90vh)] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Text Content */}
            <motion.div 
              variants={fadeIn('right', 'tween', 0.2, 1)}
              className="flex flex-col justify-center text-center md:text-left order-2 md:order-1"
            >
              <motion.p 
                variants={textVariant(0.2)}
                className="text-sm sm:text-base uppercase tracking-wider text-neutral-600 mb-2 md:mb-3"
              >
                {heroData.preTitle}
              </motion.p>
              <motion.h1 
                variants={textVariant(0.3)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-neutral-900 mb-6 md:mb-8"
              >
                {heroData.title}
              </motion.h1>
              <motion.div 
                variants={textVariant(0.4)}
                className="flex justify-center md:justify-start"
              >
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-base sm:text-lg" asChild>
                  <Link href={heroData.buttonLink}>{heroData.buttonText}</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div 
              variants={slideIn('left', 'tween', 0.2, 1)}
              className="flex justify-center items-center order-1 md:order-2 p-4 md:p-0"
            >
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/3]">
                <Image
                  src={heroData.imageUrl}
                  alt={heroData.imageAlt}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={heroData.imageAiHint}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* Featured Shoe Categories with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10"
          >
            Shoe Branch
          </motion.h2>
          <motion.div 
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {shoeStyleCategories.map((category, index) => (
              <motion.div 
                key={category.id} 
                variants={item}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href={`/${category.slug}`} className="group block">
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      data-ai-hint={category.aiHint || 'shoe style image'}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 230px"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                      <h3 className="text-xl font-semibold text-white font-headline text-center px-2">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Featured Shoe Products with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
        className="py-12 md:py-16 bg-muted/20"
      >
        <Container>
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10"
          >
            Featured Footwear
          </motion.h2>
          {featuredShoeProducts.length > 0 ? (
            <motion.div 
              variants={container}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
            >
              {featuredShoeProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  variants={item}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p 
              variants={textVariant(0.3)}
              className="text-center text-muted-foreground"
            >
              No featured shoes available at the moment.
            </motion.p>
          )}
        </Container>
      </motion.section>

      {/* Promotional Section with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-12 md:py-16 bg-accent text-accent-foreground"
      >
        <Container className="text-center">
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4"
          >
            Sole Mate Savings!
          </motion.h2>
          <motion.p 
            variants={textVariant(0.3)}
            className="text-lg mb-6"
          >
            Get 15% off on all new season sneakers. Use code <span className="font-semibold">SOLE15</span>.
          </motion.p>
          <motion.div variants={textVariant(0.4)}>
            <Button size="lg" variant="outline" asChild className="border-accent-foreground text-foreground hover:bg-accent-foreground hover:text-accent">
              <Link href="/sneakers?promo=sole15">Shop Sneaker Deals</Link>
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      {/* New Arrival Shoes with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
        className="py-12 md:py-16"
      >
        <Container>
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10"
          >
            Fresh on the Scene
          </motion.h2>
          {newArrivalShoes.length > 0 ? (
            <motion.div 
              variants={container}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
            >
              {newArrivalShoes.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  variants={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p 
              variants={textVariant(0.3)}
              className="text-center text-muted-foreground"
            >
              No new shoe arrivals at the moment.
            </motion.p>
          )}
        </Container>
      </motion.section>

      {/* Trust Badges with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-12 md:py-16 bg-muted/20"
      >
        <Container>
          <TrustBadgesSection />
        </Container>
      </motion.section>

      {/* Newsletter Signup with animations */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-12 md:py-16 bg-primary text-primary-foreground"
      >
        <Container className="max-w-xl mx-auto text-center">
          <motion.h2 
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4"
          >
            Step Into Our Circle!
          </motion.h2>
          <motion.p 
            variants={textVariant(0.3)}
            className="mb-6"
          >
            Subscribe for exclusive shoe drops, offers, and style tips.
          </motion.p>
          <motion.div variants={textVariant(0.4)}>
            <NewsletterSignup />
          </motion.div>
        </Container>
      </motion.section>
    </div>
  );
}