
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

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 4);
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
                <span className="transform -rotate-90 whitespace-nowrap tracking-widest text-xs opacity-75 uppercase">Nike</span>
                <div className="flex flex-col items-center space-y-3 text-xs opacity-75">
                  <span>1 / 5</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/75 hover:bg-white/10 hover:text-white"><ChevronLeft className="h-4 w-4"/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/75 hover:bg-white/10 hover:text-white"><ChevronRight className="h-4 w-4"/></Button>
                  <div className="flex flex-col space-y-1 pt-2">
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span className="h-1.5 w-1.5 bg-white/50 rounded-full"></span>
                    <span className="h-1.5 w-1.5 bg-white/50 rounded-full"></span>
                    <span className="h-1.5 w-1.5 bg-white/50 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Main Content Area - Title and Images */}
              <div className="col-span-12 md:col-span-11 relative flex flex-col justify-center items-center text-center md:items-start md:text-left h-full">
                {/* Image Composition */}
                <div className="absolute inset-0 flex justify-center items-center opacity-30 md:opacity-100">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                    {[
                      { offset: '5%', image: 'https://placehold.co/300x500.png', hint: 'shoe detail texture', z: '10', w: '30%' },
                      { offset: '30%', image: 'https://placehold.co/300x500.png', hint: 'denim fashion style', z: '20', w: '30%' },
                      { offset: '55%', image: 'https://placehold.co/300x500.png', hint: 'fashion clothing fabric', z: '10', w: '30%' },
                    ].map((strip, index) => (
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
                    <div className="absolute right-[-10%] sm:right-[-5%] md:right-[-20%] lg:right-[-25%] top-1/2 transform -translate-y-1/2 z-30 w-[50%] sm:w-[45%] md:w-[250px] lg:w-[300px] xl:w-[380px]">
                      <Image
                        src="https://placehold.co/600x400.png"
                        alt="Featured Shoe"
                        width={600}
                        height={400}
                        className="object-contain"
                        data-ai-hint="yellow sneaker"
                        priority
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
                <p className="text-xs sm:text-sm opacity-75 mb-2 md:mb-0">Product name and Model</p>
                <Link href="/search" className="flex items-center text-xs sm:text-sm hover:underline hover:opacity-100 opacity-75">
                  View Products <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.id} href={`/search?category=${category.id}`} className="group block">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
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
      <section className="py-16 bg-muted/20">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Promotional Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <Container className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Limited Time Offer!</h2>
          <p className="text-lg mb-6">Get 20% off on selected items. Use code <span className="font-semibold">SAVE20</span> at checkout.</p>
          <Button size="lg" variant="outline" asChild className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
            <Link href="/search?promo=save20">Shop Deals</Link>
          </Button>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-center mb-10">New Arrivals</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>


      {/* Trust Badges */}
      <section className="py-16 bg-muted/20">
        <Container>
          <TrustBadgesSection />
        </Container>
      </section>

      {/* Blog Highlights */}
      <section className="py-16">
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
      <section className="py-16 bg-primary text-primary-foreground">
        <Container className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline mb-4">Stay Updated!</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest products, offers, and updates.</p>
          <NewsletterSignup />
        </Container>
      </section>
    </div>
  );
}
