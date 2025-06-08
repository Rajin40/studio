
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, type Category } from '@/lib/data';
// ArrowUpRight removed as it's no longer used in the static hero

const heroData = {
  preTitle: "NEW PRODUCT",
  title: "Cool Air Shoes",
  buttonText: "Checkout",
  buttonLink: "/cart", 
  imageUrl: "https://placehold.co/800x600.png",
  imageAlt: "Cool Air Shoes",
  imageAiHint: "yellow sneaker black",
};

export default function ShoeStorePage() {
  // Select specific categories for the "3 big images" section
  const featuredStyleSlugs = ['sneakers', 'formal-shoes', 'running-shoes'];
  const threeBigStyleCategories = mockCategories.filter(
    cat => featuredStyleSlugs.includes(cat.slug) && cat.parentCategoryId === 'footwear'
  );

  const shoeProducts = mockProducts.filter(
    product => mockCategories.find(cat => cat.name === product.category && (cat.id === 'footwear' || cat.parentCategoryId === 'footwear'))
  );
  
  const featuredShoeProducts = shoeProducts.filter(p => p.isFeatured).slice(0, 8);
  const newArrivalShoes = [...shoeProducts].sort((a,b) => (b.id > a.id ? 1 : -1) ).slice(0, 8);


  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="bg-stone-50 text-neutral-800 relative overflow-hidden">
        <Container className="py-16 md:py-24 lg:py-32 min-h-[calc(80vh)] md:min-h-[calc(90vh)] flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
              <p className="text-sm sm:text-base uppercase tracking-wider text-neutral-600 mb-2 md:mb-3">
                {heroData.preTitle}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-neutral-900 mb-6 md:mb-8">
                {heroData.title}
              </h1>
              <div className="flex justify-center md:justify-start">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-base sm:text-lg" asChild>
                  <Link href={heroData.buttonLink}>{heroData.buttonText}</Link>
                </Button>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex justify-center items-center order-1 md:order-2 p-4 md:p-0">
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
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Shoe Categories - Redesigned for 3 Big Images */}
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Shop Shoe Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {threeBigStyleCategories.map((category) => (
              <Link key={category.id} href={`/${category.slug}`} className="group block aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[4/3]">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform group-hover:scale-105">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    data-ai-hint={category.aiHint || 'shoe style image'}
                    className="transition-transform duration-300 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-headline mb-1 drop-shadow-md">{category.name}</h3>
                    {category.description && <p className="text-xs sm:text-sm text-white/90 mb-3 line-clamp-2 drop-shadow-sm">{category.description}</p>}
                    <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm mt-auto group-hover:bg-white/30 group-hover:border-white/60 transition-colors">
                      Explore {category.name}
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Shoe Products */}
      <section className="py-12 md:py-16 bg-muted/20">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Featured Footwear</h2>
          {featuredShoeProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {featuredShoeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No featured shoes available at the moment.</p>
          )}
        </Container>
      </section>

      {/* Promotional Section */}
      <section className="py-12 md:py-16 bg-accent text-accent-foreground">
        <Container className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Sole Mate Savings!</h2>
          <p className="text-lg mb-6">Get 15% off on all new season sneakers. Use code <span className="font-semibold">SOLE15</span>.</p>
          <Button size="lg" variant="outline" asChild className="border-accent-foreground text-foreground hover:bg-accent-foreground hover:text-accent">
            {/* Updated link to point to the new sneakers page */}
            <Link href="/sneakers?promo=sole15">Shop Sneaker Deals</Link>
          </Button>
        </Container>
      </section>

      {/* New Arrival Shoes */}
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Fresh on the Scene</h2>
          {newArrivalShoes.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {newArrivalShoes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No new shoe arrivals at the moment.</p>
          )}
        </Container>
      </section>


      {/* Trust Badges */}
      <section className="py-12 md:py-16 bg-muted/20">
        <Container>
          <TrustBadgesSection />
        </Container>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <Container className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Step Into Our Circle!</h2>
          <p className="mb-6">Subscribe for exclusive shoe drops, offers, and style tips.</p>
          <NewsletterSignup />
        </Container>
      </section>
    </div>
  );
}

