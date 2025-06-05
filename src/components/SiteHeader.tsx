
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu as MenuIcon, Search, ShoppingCart, User, BookOpen, ChevronDown } from 'lucide-react';
import Container from '@/components/Container';
import { mockCategories, mockArticles } from '@/lib/data'; // Assuming these are available and have some data

export default function SiteHeader() {
  const mainNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/help', label: 'Help Center' },
  ];

  const productCategories = mockCategories.slice(0, 3).map(cat => ({
    href: `/search?category=${cat.id}`,
    label: cat.name,
  }));

  const blogHighlights = mockArticles.slice(0, 2).map(article => ({
    href: `/blog/${article.slug}`,
    label: article.title,
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center">
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2" aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col">
              {/* Mobile Menu: Logo */}
              <div className="p-4 border-b">
                <Link href="/" className="flex items-center space-x-2 py-2">
                  <BookOpen className="h-7 w-7 text-primary" />
                  <span className="font-bold font-headline text-2xl text-primary">Shopstream</span>
                </Link>
              </div>
              
              {/* Mobile Menu: Navigation Links */}
              <nav className="flex-grow px-4 py-2 overflow-y-auto">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-3 transition-colors hover:text-primary text-base font-medium rounded-md hover:bg-muted px-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="products-mobile">
                    <AccordionTrigger className="py-3 text-base font-medium hover:text-primary hover:no-underline hover:bg-muted px-2 rounded-md [&[data-state=open]>svg]:text-primary">
                      Products
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <Link href="/search" className="block py-2 text-sm hover:text-primary hover:bg-muted px-2 rounded-md">All Products</Link>
                      {productCategories.map(cat => (
                        <Link key={cat.label} href={cat.href} className="block py-2 text-sm hover:text-primary hover:bg-muted px-2 rounded-md">
                          {cat.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blog-mobile">
                    <AccordionTrigger className="py-3 text-base font-medium hover:text-primary hover:no-underline hover:bg-muted px-2 rounded-md [&[data-state=open]>svg]:text-primary">
                      Blog
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <Link href="/blog" className="block py-2 text-sm hover:text-primary hover:bg-muted px-2 rounded-md">All Articles</Link>
                      {blogHighlights.map(article => (
                        <Link key={article.label} href={article.href} className="block py-2 text-sm hover:text-primary hover:bg-muted px-2 rounded-md truncate">
                          {article.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>

              {/* Mobile Menu: Actions */}
              <div className="border-t p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="pl-10 h-9 w-full" />
                </div>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/cart"> {/* Assuming /cart page exists or will be created */}
                    <ShoppingCart className="mr-2 h-4 w-4" /> My Cart
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                   <Link href="/account"> {/* Assuming /account page exists or will be created */}
                    <User className="mr-2 h-4 w-4" /> My Account
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          {/* Desktop Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl text-primary">Shopstream</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-1 text-sm font-medium">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 transition-colors hover:text-primary rounded-md"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 text-sm font-medium hover:text-primary data-[state=open]:text-primary data-[state=open]:bg-muted">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/search">All Products</Link>
              </DropdownMenuItem>
              {productCategories.map(cat => (
                <DropdownMenuItem key={cat.label} asChild>
                  <Link href={cat.href}>{cat.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 text-sm font-medium hover:text-primary data-[state=open]:text-primary data-[state=open]:bg-muted">
                Blog <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/blog">All Articles</Link>
              </DropdownMenuItem>
              {blogHighlights.map(article => (
                <DropdownMenuItem key={article.label} asChild>
                  <Link href={article.href}>{article.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right: Search, Cart, Account */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-10 h-9 w-48 lg:w-64" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Shopping Cart" asChild>
            <Link href="/cart"> {/* Assuming /cart page exists or will be created */}
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="My Account" asChild>
            <Link href="/account"> {/* Assuming /account page exists or will be created */}
             <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
