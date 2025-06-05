
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu as MenuIcon, BookOpen, ChevronDown } from 'lucide-react';
import Container from '@/components/Container';
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
import { mockCategories, mockArticles } from '@/lib/data';

export default function SiteHeader() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/help', label: 'Help Center' },
  ];

  // Prepare some example sub-links for dropdowns
  const productSubLinks = [
    { href: '/search', label: 'All Products' },
    ...mockCategories.slice(0, 3).map(cat => ({ href: `/search?category=${cat.id}`, label: cat.name }))
  ];

  const blogSubLinks = [
    { href: '/blog', label: 'All Articles' },
    ...[...new Set(mockArticles.map(a => a.category))].slice(0, 2).map(cat => ({ href: `/blog?category=${encodeURIComponent(cat)}`, label: cat }))
  ];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl text-primary">Shopstream</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => {
            if (link.label === 'Products') {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 text-sm font-medium flex items-center space-x-1 hover:text-primary data-[state=open]:text-primary data-[state=open]:bg-accent/10">
                      <span>{link.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {productSubLinks.map(subLink => (
                      <DropdownMenuItem key={subLink.href} asChild>
                        <Link href={subLink.href}>{subLink.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            if (link.label === 'Blog') {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 text-sm font-medium flex items-center space-x-1 hover:text-primary data-[state=open]:text-primary data-[state=open]:bg-accent/10">
                      <span>{link.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {blogSubLinks.map(subLink => (
                       <DropdownMenuItem key={subLink.href} asChild>
                         <Link href={subLink.href}>{subLink.label}</Link>
                       </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link key={link.label} href={link.href} className="px-3 py-2 transition-colors hover:text-primary text-sm font-medium">
                {link.label}
              </Link>
            );
          })}
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
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <nav className="grid gap-2 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-6 py-2">
                  <BookOpen className="h-7 w-7 text-primary" />
                  <span className="font-bold font-headline text-2xl text-primary">Shopstream</span>
                </Link>
                {navLinks.map((link) => {
                  if (link.label === 'Products') {
                    return (
                      <Accordion type="single" collapsible className="w-full" key={link.label}>
                        <AccordionItem value="products-mobile" className="border-b-0">
                          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline hover:text-primary flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pl-7 pb-0 pt-1">
                            {productSubLinks.map(subLink => (
                              <Link key={subLink.href} href={subLink.href} className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                                {subLink.label}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === 'Blog') {
                    return (
                      <Accordion type="single" collapsible className="w-full" key={link.label}>
                        <AccordionItem value="blog-mobile" className="border-b-0">
                          <AccordionTrigger className="py-3 text-base font-medium hover:no-underline hover:text-primary flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pl-7 pb-0 pt-1">
                             {blogSubLinks.map(subLink => (
                              <Link key={subLink.href} href={subLink.href} className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                                {subLink.label}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  return (
                    <Link key={link.label} href={link.href} className="py-3 transition-colors hover:text-primary text-base font-medium">
                      {link.label}
                    </Link>
                  );
                })}
                 <div className="mt-6 flex w-full max-w-xs items-center space-x-2 border-t pt-6">
                    <Input type="search" placeholder="Search..." className="h-10"/>
                    <Button type="submit" variant="outline" size="icon" className="h-10 w-10">
                        <Search className="h-5 w-5" />
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
