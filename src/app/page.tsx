
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
    mainImageUrl: "https://placehold.co/800x600.png",
    mainImageAiHint: "modern shoe design",
    bgStrip1Url: "https://placehold.co/300x700.png?text=bg1",
    bgStrip1AiHint: "abstract pattern",
    bgStrip2Url: "https://placehold.co/300x700.png?text=bg2",
    bgStrip2AiHint: "geometric design",
    titlePrimary: "DESIGN",
    titleSecondary: "& HIGH QUALITY",
    buttonText: "View All Products",
    buttonLink: "/search",
    bulletPoints: ["Innovative Style", "Premium Materials", "Unmatched Comfort"],
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Shoe+2",
    mainImageAiHint: "stylish sneaker",
    bgStrip1Url: "https://placehold.co/300x700.png?text=bg3",
    bgStrip1AiHint: "urban texture",
    bgStrip2Url: "https://placehold.co/300x700.png?text=bg4",
    bgStrip2AiHint: "vibrant colors",
    titlePrimary: "FRESH",
    titleSecondary: "& ICONIC STYLES",
    buttonText: "Shop New Arrivals",
    buttonLink: "/search?sort=newest",
    bulletPoints: ["Latest Trends", "Exclusive Collections", "Bold Statements"],
  },
  {
    mainImageUrl: "https://placehold.co/800x600.png?text=Shoe+3",
    mainImageAiHint: "elegant footwear",
    bgStrip1Url: "https://placehold.co/300x700.png?text=bg5",
    bgStrip1AiHint: "minimalist background",
    bgStrip2Url: "https://placehold.co/300x700.png?text=bg6",
    bgStrip2AiHint: "soft tones",
    titlePrimary: "CRAFTED",
    titleSecondary: "FOR PERFECTION",
    buttonText: "Explore Bestsellers",
    buttonLink: "/search?sort=popular",
    bulletPoints: ["Expert Craftsmanship", "Durable & Lasting", "Timeless Elegance"],
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
      {/* Hero Banner - Restored Dynamic Carousel */}
      <section className="bg-emerald-800 text-white relative overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center">
        {/* Animated Background Strips */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {slides.map((slide, index) => (
            <div key={`bg-strips-${index}`} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src={slide.bgStrip1Url}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                className="absolute top-0 left-0 w-1/3 h-full transform -skew-x-12 -translate-x-1/4 opacity-20"
                data-ai-hint={slide.bgStrip1AiHint}
                priority={index === 0}
              />
              <Image
                src={slide.bgStrip2Url}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                className="absolute top-0 right-0 w-1/3 h-full transform -skew-x-12 translate-x-1/4 opacity-20"
                data-ai-hint={slide.bgStrip2AiHint}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <Container className="relative z-10 h-full py-12 md:py-16 w-full">
          <div className="flex h-full justify-between min-h-[75vh] md:min-h-[80vh]">
            {/* Side Navigation Dots */}
            <div className="hidden md:flex flex-col justify-center items-center space-y-3 pr-4 lg:pr-8 self-stretch">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none
                              ${currentSlide === index ? 'bg-white scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-emerald-800' : 'bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Main Content Area - Image & Text */}
            <div className="relative flex-grow flex flex-col md:flex-row justify-center items-center text-center md:text-left overflow-hidden">
              {/* Text Content (Left) */}
              <div className="md:w-1/2 lg:w-2/5 p-4 md:p-0 relative z-20 order-2 md:order-1 animate-fadeIn">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-none drop-shadow-md">
                  {activeSlide.titlePrimary}
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mt-[-0.1em] sm:mt-[-0.15em] drop-shadow-md">
                  {activeSlide.titleSecondary}
                </p>
                <ul className="mt-6 sm:mt-8 space-y-1.5 text-base sm:text-lg opacity-90 hidden md:block">
                  {activeSlide.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2.5"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image (Right) & Prev/Next Buttons */}
              <div className="md:w-1/2 lg:w-3/5 flex-shrink-0 relative h-64 sm:h-80 md:h-auto md:self-stretch order-1 md:order-2 mb-6 md:mb-0 animate-slideInRight">
                <Image
                  key={activeSlide.mainImageUrl} // Key change for transition
                  src={activeSlide.mainImageUrl}
                  alt={activeSlide.titlePrimary + " " + activeSlide.titleSecondary}
                  fill
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-2xl transition-opacity duration-700 ease-in-out"
                  data-ai-hint={activeSlide.mainImageAiHint}
                  priority
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
                {/* Prev/Next for image area - subtle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
              </div>
            </div>

             {/* Right side buffer for symmetry, can be empty or hold other controls if needed */}
            <div className="hidden md:flex flex-col justify-center items-center space-y-3 pl-4 lg:pl-8 self-stretch w-[56px] lg:w-[72px]">
              {/* This space mirrors the left dots for balance, could be used for other elements */}
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/10 backdrop-blur-sm py-3">
          <Container className="flex justify-center items-center">
            <Link href={activeSlide.buttonLink} className="flex items-center text-xs sm:text-sm font-medium text-white hover:underline hover:opacity-100 opacity-75 transition-opacity">
              {activeSlide.buttonText} <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </Container>
        </div>
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
