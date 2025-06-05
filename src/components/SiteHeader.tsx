import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu as MenuIcon, BookOpen, HelpCircle } from 'lucide-react';
import Container from '@/components/Container';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function SiteHeader() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/help', label: 'Help Center' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl text-primary">Shopstream</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex w-full max-w-xs items-center space-x-2">
            <Input type="search" placeholder="Search products..." className="h-9" />
            <Button type="submit" variant="outline" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" aria-label="User Account">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Shopping Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-xl text-primary">Shopstream</span>
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                ))}
                 <div className="mt-4 flex w-full max-w-xs items-center space-x-2">
                    <Input type="search" placeholder="Search products..." />
                    <Button type="submit" variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
