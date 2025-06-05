import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Facebook, Twitter, Instagram } from 'lucide-react';
import Container from '@/components/Container';
import NewsletterSignup from './NewsletterSignup';

export default function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-xl text-primary">Shopstream</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your one-stop shop for amazing products.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-headline tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-sm hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/help" className="text-sm hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/help#contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-headline tracking-wider uppercase mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold font-headline tracking-wider uppercase mb-4">Newsletter</h3>
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shopstream. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/help#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/help#terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
