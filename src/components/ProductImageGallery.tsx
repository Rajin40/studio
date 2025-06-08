
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[]; // Array of image URLs
  productName: string;
  aiHint?: string;
  className?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  aiHint,
  className,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Reset to the first image if the images array changes or on initial load
    // and ensure images array is not empty
    if (images && images.length > 0) {
      setSelectedImageIndex(0);
    } else {
      // Handle case where images might become empty or is initially empty
      setSelectedImageIndex(-1); // Or some other indicator for no image
    }
  }, [images]);

  if (selectedImageIndex === -1 || !images || images.length === 0) {
    return (
      <div className={cn("flex items-center justify-center aspect-square bg-muted rounded-lg", className)}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {/* Main Preview Image */}
      <div className="group relative aspect-square w-full rounded-lg overflow-hidden shadow-lg bg-muted/20">
        {currentImage && (
          <Image
            key={currentImage + selectedImageIndex} // Adding key helps with transitions if images swap
            src={currentImage}
            alt={`${productName} - view ${selectedImageIndex + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            className="transition-all duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={aiHint || 'product image'}
            priority={selectedImageIndex === 0} // Prioritize the first image
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
          />
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="relative">
          <div className="flex space-x-2 overflow-x-auto pb-1.5 -mb-1.5 pr-1">
            {images.map((imgUrl, index) => (
              <button
                key={imgUrl + index + '-thumb'}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                  selectedImageIndex === index
                    ? 'border-primary opacity-100 ring-1 ring-primary ring-offset-background'
                    : 'border-muted hover:border-muted-foreground/60'
                )}
                aria-label={`View image ${index + 1}`}
                role="tab"
                aria-selected={selectedImageIndex === index}
              >
                <Image
                  src={imgUrl}
                  alt={`${productName} - thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
