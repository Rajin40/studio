
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon, BadgeCheck } from 'lucide-react'; // Changed BookOpen to BadgeCheck, removed others
import Container from '@/components/Container';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function SiteHeader() {
  const navLinks = [
    { href: '/search', label: 'Catalogue' },
    { href: '/search?category=fashion', label: 'Fashion' }, // Assuming 'fashion' category exists or will be handled
    { href: '/favourites', label: 'Favourites' }, // This will be a new page, ensure it's created or handled
    { href: '/blog', label: 'Lifestyle' }, // Using blog page for Lifestyle content
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl text-primary">Fashion</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Button className="hidden md:flex bg-foreground text-background hover:bg-foreground/90">
            Get Started
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col">
              {/* Mobile Menu: Logo */}
              <div className="p-4 border-b">
                <Link href="/" className="flex items-center space-x-2 py-2">
                  <BadgeCheck className="h-7 w-7 text-primary" />
                  <span className="font-bold font-headline text-2xl text-primary">Fashion</span>
                </Link>
              </div>
              
              {/* Mobile Menu: Navigation Links */}
              <nav className="grid gap-1 text-lg font-medium mt-4 px-4 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-3 transition-colors hover:text-primary text-base font-medium rounded-md hover:bg-muted px-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu: Get Started Button */}
              <div className="mt-auto border-t p-4">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
