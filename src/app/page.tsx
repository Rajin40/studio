
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
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [totalSlides]); // Re-run effect if totalSlides changes (though it's constant here)

  const activeSlide = slides[currentSlide];

  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 12);
  const blogHighlights = mockArticles.slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="bg-emerald-800 text-white relative overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center">
        <Container className="relative z-10 h-full py-12 md:py-16 w-full">
          <div className="flex flex-col h-full justify-between min-h-[75vh] md:min-h-[80vh]">
            
            <div className="grid grid-cols-12 gap-x-4 items-center flex-grow">
              {/* Left Vertical Elements */}
              <div className="col-span-1 hidden md:flex flex-col items-center justify-between self-stretch py-8">
                {/* Brand name removed here */}
                <div className="flex-grow"></div> {/* Add a spacer to push controls down if brand was the only top element */}
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
              </div>

              {/* Main Content Area - Title and Images */}
              <div className="col-span-12 md:col-span-11 relative flex flex-col justify-center items-center text-center md:items-start md:text-left h-full">
                {/* Image Composition */}
                <div className="absolute inset-0 flex justify-center items-center opacity-30 md:opacity-100">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                    {activeSlide.stripImages.map((strip, index) => (
                      <div
                        key={index}
                        className="absolute top-0 h-full transform -skew-x-[15deg] overflow-hidden"
                        style={{ left: strip.offset, zIndex: parseInt(strip.z), width: strip.w }}
                      >
                        <div
                          className="absolute inset-[-15px] transform skew-x-[15deg] bg-cover bg-center"
                          style={{ backgroundImage: `url(${strip.image})` }}
                          data-ai-hint={strip.hint}
                        ></div>
                      </div>
                    ))}
                    {/* Main Shoe Image */}
                    {/* Main Shoe Image - Right Aligned & Smaller */}
                    <div className="absolute right-[-80] top-1/2 transform -translate-y-1/2 z-30 w-[30%] min-w-[150px] max-w-[220px]">
                      <Image
                        key={activeSlide.mainImage} 
                        src={activeSlide.mainImage}
                        alt="Featured Shoe"
                        width={300}
                        height={200}
                        className="object-contain"
                        data-ai-hint={activeSlide.mainImageHint}
                        priority={currentSlide === 0} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="relative z-20 mt-8 md:mt-0">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-none drop-shadow-md">
                    DESIGN
                  </h1>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mt-[-0.1em] sm:mt-[-0.15em] drop-shadow-md">
                    & HIGH QUALITY
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="grid grid-cols-12 gap-x-4 items-center pt-8 md:pt-4 pb-4">
              <div className="col-span-1 hidden md:block"></div> {/* Spacer for left nav */}
              <div className="col-span-12 md:col-span-11 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Product name removed here */}
                <div className="flex-grow"></div> {/* Add a spacer if product name was the only left element */}
                <Link href="/search" className="flex items-center text-xs sm:text-sm hover:underline hover:opacity-100 opacity-75">
                  View Products <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
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
                    fill // Changed from layout="fill" objectFit="cover" to fill
                    style={{ objectFit: "cover" }} // Added for fill
                    data-ai-hint={category.aiHint}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 230px" // Example sizes
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
