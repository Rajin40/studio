
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
import { ChevronRight, ArrowUpRight } from 'lucide-react';
// Removed useState as carousel is no longer used

// Removed slides array and totalSlides constant

export default function HomePage() {
  // Removed currentSlide, handleNext, handlePrev, activeSlide as carousel is removed

  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 4);
  const blogHighlights = mockArticles.slice(0, 2);

  const heroShoeImages = [
    {
      href: "/sneakers",
      src: "https://placehold.co/400x300.png?text=Sneakers",
      alt: "Stylish Sneakers",
      aiHint: "sneakers lifestyle",
      label: "Shop Sneakers"
    },
    {
      href: "/formal-shoes",
      src: "https://placehold.co/400x300.png?text=Formal+Shoes",
      alt: "Elegant Formal Shoes",
      aiHint: "formal shoes leather",
      label: "Shop Formal Shoes"
    },
    {
      href: "/running-shoes",
      src: "https://placehold.co/400x300.png?text=Running+Shoes",
      alt: "Performance Running Shoes",
      aiHint: "running shoes sport",
      label: "Shop Running Shoes"
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Banner - Simplified */}
      <section className="bg-emerald-800 text-white relative overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center">
        <Container className="relative z-10 h-full py-12 md:py-16 w-full">
          <div className="flex flex-col h-full justify-center min-h-[75vh] md:min-h-[80vh] items-center text-center">
            
            {/* Main Content Area - Title and New Images */}
            <div className="relative flex flex-col justify-center items-center text-center h-full py-10">
              {/* Text Content */}
              <div className="relative z-20">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-none drop-shadow-md">
                  DESIGN
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mt-[-0.1em] sm:mt-[-0.15em] drop-shadow-md">
                  & HIGH QUALITY
                </p>
              </div>

              {/* Three New Images Below Text */}
              <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full px-4">
                {heroShoeImages.map((shoe, index) => (
                  <Link key={index} href={shoe.href} className="group block">
                    <div className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={shoe.src}
                        alt={shoe.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        data-ai-hint={shoe.aiHint}
                        className="group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 250px"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center p-2">
                        <span className="text-sm sm:text-base font-semibold text-white text-center">{shoe.label}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full flex justify-center items-center pt-8 md:pt-12 pb-4">
              <Link href="/search" className="flex items-center text-xs sm:text-sm hover:underline hover:opacity-100 opacity-75">
                View All Products <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
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
    </div>
  );
}

