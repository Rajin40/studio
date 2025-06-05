
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, mockArticles } from '@/lib/data';
import { ChevronRight, Star, Brush, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 4);
  const blogHighlights = mockArticles.slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-slate-900 to-purple-900 text-white py-12 md:py-16 my-4 md:my-8 mx-auto max-w-screen-xl rounded-xl overflow-hidden">
        <Image
          src="https://placehold.co/1200x800.png"
          alt="Fashion model"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-25"
          priority
          data-ai-hint="fashion model editorial"
        />
        <Container className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12 min-h-[60vh] md:min-h-[70vh]">
          <div className="lg:w-1/2 xl:w-3/5 space-y-6 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              LIVE FOR FASHION
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline !leading-tight text-white">
              Fashion Up<br />Your Look
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">
              Influential, innovative and progressive, Versace is reinventing a wholly modern approach to fashion to help you look unique.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="bg-white text-slate-900 hover:bg-slate-200 shadow-md">
                <Link href="/search">Shop now</Link>
              </Button>
              <Link href="/search?filter=trending" className="inline-flex items-center text-white hover:underline gap-2">
                <Sparkles className="h-5 w-5" /> What's Trending?
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-2/5 space-y-4 w-full max-w-md lg:max-w-none">
            <div
              className="bg-white/90 backdrop-blur-sm text-slate-800 p-4 shadow-xl flex items-center space-x-3 hover:shadow-2xl transition-shadow"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            >
              <Star className="h-7 w-7 text-yellow-500 fill-yellow-400" />
              <span className="font-semibold text-lg">Favourites</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm text-slate-800 p-4 rounded-lg shadow-xl flex items-center space-x-3 hover:shadow-2xl transition-shadow">
              <Brush className="h-7 w-7 text-pink-500" />
              <span className="font-semibold text-lg">Lifestyle</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm text-slate-800 p-5 rounded-lg shadow-xl space-y-3 hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-3">
                <Brush className="h-8 w-8 text-pink-500" />
                <h3 className="text-xl font-semibold">Lifestyle</h3>
              </div>
              <p className="text-sm text-slate-600">
                Design is a part of the journey. Explore inspiring ideas and tips.
              </p>
              <Button asChild className="bg-slate-900 text-white hover:bg-slate-700 w-full sm:w-auto">
                <Link href="/blog">Read now</Link>
              </Button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
