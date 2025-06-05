
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import { TrustBadgesSection } from '@/components/TrustBadge';
import NewsletterSignup from '@/components/NewsletterSignup';
import { mockProducts, mockCategories, mockArticles } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = [...mockProducts].reverse().slice(0, 8); 
  const featuredCategories = mockCategories.slice(0, 4);
  const blogHighlights = mockArticles.slice(0, 2);

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/30 to-accent/30 py-20 md:py-32 text-center text-foreground">
        <Image 
          src="https://placehold.co/1600x600.png" 
          alt="Promotional banner" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-30"
          priority
          data-ai-hint="store promotion"
        />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
            Discover Your Next Favorite
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore our curated collection of high-quality products for every aspect of your life.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/search">Shop Now <ChevronRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold font-headline text-center mb-10">Shop by Category</h2>
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
          <h2 className="text-3xl font-bold font-headline text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Promotional Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <Container className="text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">Limited Time Offer!</h2>
          <p className="text-lg mb-6">Get 20% off on selected items. Use code <span className="font-semibold">SAVE20</span> at checkout.</p>
          <Button size="lg" variant="outline" asChild className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
            <Link href="/search?promo=save20">Shop Deals</Link>
          </Button>
        </Container>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold font-headline text-center mb-10">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h2 className="text-3xl font-bold font-headline text-center mb-10">From Our Blog</h2>
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
          <h2 className="text-3xl font-bold font-headline mb-4">Stay Updated!</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest products, offers, and updates.</p>
          <NewsletterSignup />
        </Container>
      </section>
    </div>
  );
}
