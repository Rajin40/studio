"use client";

import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { mockProducts, type Product } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bluetooth as BluetoothIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const getBluetoothDeviceProducts = (): Product[] => {
  return mockProducts.filter(product => product.category === 'Electronics');
};

const AnimatedElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default function BluetoothDevicesPage() {
  const bluetoothDeviceProducts = getBluetoothDeviceProducts();

  const heroContent = {
    title: "Wireless Freedom",
    subTitle: "Bluetooth Devices",
    description: "Connect seamlessly with our range of Bluetooth speakers, earbuds, and accessories. High-quality audio, untethered.",
    buttonText: "Explore Bluetooth Gear",
    imageUrl: "/images/tech-vault/headphones.jpeg", 
    imageAiHint: "bluetooth devices wireless", 
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroContent.imageUrl}
            alt="Abstract Bluetooth devices background"
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={heroContent.imageAiHint}
            priority
            className="opacity-30 md:opacity-40"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/30"></div>
        </div>

        <Container className="relative z-10 py-12 md:py-24 lg:py-32 min-h-[50vh] md:min-h-[70vh] flex items-center">
          <div className="text-center md:text-left max-w-2xl px-4 sm:px-6">
            <AnimatedElement delay={0.1}>
              <BluetoothIcon className="h-10 w-10 md:h-16 md:w-16 mb-4 text-white/80 mx-auto md:mx-0" />
            </AnimatedElement>
            
            <AnimatedElement delay={0.2}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-2 md:mb-3">
                {heroContent.subTitle}
              </h1>
            </AnimatedElement>
            
            <AnimatedElement delay={0.3}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-sky-200">
                {heroContent.title}
              </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={0.4}>
              <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 md:mb-8">
                {heroContent.description}
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={0.5}>
              <Link href="#bluetooth-devices-grid" passHref scroll={false}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-300 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold group"
                >
                  {heroContent.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </Container>
      </section>

      {/* Product Grid Section - Wrapped with div for id */}
      <Container className="py-8 md:py-16">
        <div id="bluetooth-devices-grid" className="scroll-mt-16">
          <AnimatedElement>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline text-center mb-8 md:mb-10">
              Our Bluetooth Device Selection
            </h2>
          </AnimatedElement>
          
          {bluetoothDeviceProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {bluetoothDeviceProducts.map((product, index) => (
                <AnimatedElement key={product.id} delay={0.1 + index * 0.05}>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <AnimatedElement>
              <p className="text-center text-muted-foreground text-lg py-8 md:py-10">
                No Bluetooth devices available at the moment.
              </p>
            </AnimatedElement>
          )}
          
          <AnimatedElement delay={0.3}>
            <div className="text-center mt-8 md:mt-10">
              <Button 
                variant="default" 
                asChild
                className="transition-all hover:scale-105"
              >
                <Link href="/search?category=electronics&subcategory=bluetooth-devices">
                  View All Bluetooth Devices
                </Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </Container>
    </div>
  );
}