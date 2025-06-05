"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { mockCategories } from "@/lib/data";
import { useState } from "react";

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories = mockCategories.map(c => c.name);
  const ratings = [5, 4, 3, 2, 1];
  const sortOptions = [
    { id: 'popularity', name: 'Popularity' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'rating', name: 'Average Rating' },
    { id: 'newest', name: 'Newest Arrivals' },
  ];

  return (
    <div className="w-full lg:w-72 space-y-6 sticky top-20 self-start">
      <h3 className="text-xl font-headline font-semibold">Filters</h3>
      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${category.toLowerCase()}`} />
                  <Label htmlFor={`cat-${category.toLowerCase()}`} className="font-normal">{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="p-2">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="font-semibold">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="font-normal">{rating} Stars & Up</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h3 className="text-xl font-headline font-semibold pt-4 border-t">Sort By</h3>
      <RadioGroup defaultValue="popularity" className="space-y-1">
        {sortOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={`sort-${option.id}`} />
            <Label htmlFor={`sort-${option.id}`} className="font-normal">{option.name}</Label>
          </div>
        ))}
      </RadioGroup>

      <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filters</Button>
      <Button variant="outline" className="w-full mt-2">Clear Filters</Button>
    </div>
  );
}
