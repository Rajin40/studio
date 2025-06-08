
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, mockArticles } from '@/lib/data';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const slides = [
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Product+Showcase+1",
    mainImageAiHint: "modern product design",
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Product+Showcase+2",
    mainImageAiHint: "elegant lifestyle item",
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Product+Showcase+3",
    mainImageAiHint: "innovative tech gadget",
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Product+Showcase+4",
    mainImageAiHint: "stylish fashion accessory",
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Product+Showcase+5",
    mainImageAiHint: "unique home decor",
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
    const timer = setInterval(() => {
      handleNext();
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  const activeSlide = slides[currentSlide];
  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 4);
  const blogHighlights = mockArticles.slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Banner - Styled like the provided image */}
      <section className="bg-emerald-800 text-white relative overflow-hidden min-h-screen flex items-center">
        <Container className="relative z-10 w-full h-full flex flex-col justify-between py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center flex-grow">
            {/* Left Column: Text and Navigation */}
            <div className="flex flex-col justify-center text-center md:text-left h-full">
              <div className="mb-auto md:mb-0"> {/* Pushes text to top, allows nav to be at bottom of this column part */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-headline tracking-tight leading-none drop-shadow-md">
                  DESIGN
                </h1>
                <p className="text-4xl sm:text-5xl md:text-6xl font-semibold font-headline mt-[-0.2em] sm:mt-[-0.15em] drop-shadow-md">
                  & HIGH QUALITY
                </p>
              </div>
              
              {/* Carousel Navigation Controls */}
              <div className="mt-10 md:mt-16 space-y-3 self-center md:self-start">
                <div className="text-sm opacity-80">
                  <span>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(totalSlides).padStart(2, '0')}
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handlePrev} 
                    aria-label="Previous slide" 
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-8 h-8"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleNext} 
                    aria-label="Next slide" 
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-full w-8 h-8"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex space-x-1.5">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none
                                  ${currentSlide === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              {activeSlide && (
                <Image
                  key={activeSlide.mainImageUrl} // Key change for transition
                  src={activeSlide.mainImageUrl}
                  alt="DESIGN & HIGH QUALITY Product Showcase"
                  fill
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl transition-opacity duration-700 ease-in-out"
                  data-ai-hint={activeSlide.mainImageAiHint}
                  priority={currentSlide === 0}
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              )}
            </div>
          </div>

          {/* Bottom Right Link */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
            <Link href="/search" className="text-xs sm:text-sm text-white/80 hover:text-white hover:underline flex items-center transition-colors">
              View Products <ArrowUpRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.id} href={`/search?category=${category.id}`} className="group block">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    data-ai-hint={category.aiHint}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                    <h3 className="text-xl font-semibold text-white font-headline">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Top Products / Featured Products */}
      <section className="py-12 md:py-16 bg-muted/20">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Promotional Section */}
      <section className="py-12 md:py-16 bg-accent text-accent-foreground">
        <Container className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Limited Time Offer!</h2>
          <p className="text-lg mb-6">Get 20% off on selected items. Use code <span className="font-semibold">SAVE20</span> at checkout.</p>
          <Button size="lg" variant="outline" asChild className="border-accent-foreground text-foreground hover:bg-accent-foreground hover:text-accent">
            <Link href="/search?promo=save20">Shop Deals</Link>
          </Button>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">New Arrivals</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>


      {/* Trust Badges */}
      <section className="py-12 md:py-16 bg-muted/20">
        <Container>
          <TrustBadgesSection />
        </Container>
      </section>

      {/* Blog Highlights */}
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">From Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogHighlights.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts <ChevronRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <Container className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Stay Updated!</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest products, offers, and updates.</p>
          <NewsletterSignup />
        </Container>
      </section>
      {/* Removed custom keyframe animations as they are not present in the target style */}
    </div>
  );
}

    