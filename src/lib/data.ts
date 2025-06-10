
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // Corresponds to Category Name for mock simplicity
  subcategory?: string; // Added for more specific product types
  brand?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  stock?: number;
  details?: Record<string, string>;
  aiHint?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string;
  imageUrl: string;
  aiHint?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  content: string;
  tags?: string[];
  aiHint?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Review {
  reviewId: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment?: string;
  createdAt: string;
  isApproved?: boolean;
}

export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets, devices, and more.',
    imageUrl: '/images/Shop_by_Category/electronics.jpg',
    aiHint: 'tech gadgets'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Latest trends in apparel and accessories.',
    imageUrl: '/images/Shop_by_Category/hude.jpg',
    aiHint: 'stylish clothing'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Furnishings and decor for your home.',
    imageUrl: '/images/Shop_by_Category/shoe.jpg',
    aiHint: 'modern interior',
    parentCategoryId: 'home-garden'
  },
  {
    id: 'watch',
    name: 'Watch',
    slug: 'books',
    description: 'A wide range of books for all ages.',
    imageUrl: '/images/Shop_by_Category/watch.jpg',
    aiHint: 'library books'
  },
  {
    id: 'tech-courses',
    name: 'Technical Courses',
    slug: 'technical-courses',
    description: 'Learn new tech skills.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'online learning',
    parentCategoryId: 'education'
  },
  { 
    id: 'home-garden',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'home garden tools'
  },
  { 
    id: 'education',
    name: 'Education',
    slug: 'education',
    description: 'Educational materials and courses.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'learning education'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    description: 'All kinds of shoes for every occasion.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'shoes footwear variety'
  },
  {
    id: 'sneakers',
    name: 'Sneakers',
    slug: 'sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    parentCategoryId: 'footwear',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'sneakers athletic casual'
  },
  {
    id: 'formal-shoes',
    name: 'Formal Shoes',
    slug: 'formal-shoes',
    description: 'Elegant formal shoes for special events.',
    parentCategoryId: 'footwear',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'formal dress shoes'
  },
  {
    id: 'running-shoes',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'High-performance running shoes for athletes.',
    parentCategoryId: 'footwear',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'running sport shoes'
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Equipment and gear for sports and outdoor activities.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'sports equipment outdoor gear'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Cosmetics, skincare, and beauty products.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'makeup skincare beauty'
  },
  {
    id: 'toys-games',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun for all ages with our toy and game selection.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'toys board games'
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    description: 'Everything for your furry friends.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'pet dog cat supplies'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car accessories and maintenance products.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'car accessories auto parts'
  },
  {
    id: 'office',
    name: 'Office Supplies',
    slug: 'office-supplies',
    description: 'Products for your home or business office.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'office stationery supplies'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Beautiful jewelry pieces for every occasion.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'jewelry accessories'
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Products for your health and wellbeing.',
    imageUrl: 'https://placehold.co/400x300.png',
    aiHint: 'health wellness supplements'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-noise-cancelling-headphones',
    category: 'Electronics',
    brand: 'SoundWave',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png?view=side', 'https://placehold.co/600x600.png?view=top', 'https://placehold.co/600x600.png?view=case'],
    description: 'Experience immersive sound with these comfortable, long-lasting wireless headphones. Features active noise cancellation and a sleek design.',
    rating: 4.5,
    reviewsCount: 120,
    stock: 15,
    details: { Material: 'Premium plastic and faux leather', Battery: 'Up to 30 hours', Connectivity: 'Bluetooth 5.0' },
    aiHint: 'headphones audio',
    isActive: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Modern Linen Armchair',
    slug: 'modern-linen-armchair',
    category: 'Home Decor',
    brand: 'CozyHome',
    price: 349.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png?angle=side', 'https://placehold.co/600x600.png?angle=detail'],
    description: 'Add a touch of elegance to your living space with this stylish and comfortable linen armchair. Perfect for reading or relaxing.',
    rating: 4.8,
    reviewsCount: 75,
    stock: 5,
    details: { Material: 'Linen fabric, Oak wood frame', Dimensions: '30" W x 32" D x 34" H' },
    aiHint: 'armchair furniture',
    isActive: true,
    isFeatured: false,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    category: 'Fashion',
    subcategory: 'T-Shirts',
    brand: 'EcoThreads',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png?color=blue', 'https://placehold.co/600x600.png?color=grey'],
    description: 'A classic, comfortable t-shirt made from 100% organic cotton. Available in various colors.',
    rating: 4.2,
    reviewsCount: 250,
    stock: 100,
    details: { Material: '100% Organic Cotton', Care: 'Machine washable' },
    aiHint: 'tshirt clothing',
    isActive: true,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'The Art of Innovation (Book)',
    slug: 'the-art-of-innovation-book',
    category: 'Books',
    brand: 'PageTurners Publishing',
    price: 19.95,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Explore the principles of innovation and creativity in this insightful book by a leading industry expert.',
    rating: 4.9,
    reviewsCount: 90,
    stock: 50,
    details: { Author: 'Jane Doe', Pages: '280', Format: 'Hardcover' },
    aiHint: 'book reading',
    isActive: true,
    isFeatured: false,
  },
   {
    id: '5',
    name: 'Smart Fitness Tracker',
    slug: 'smart-fitness-tracker',
    category: 'Electronics',
    brand: 'FitLife',
    price: 79.50,
    originalPrice: 99.99,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Track your daily activity, heart rate, and sleep patterns with this sleek smart fitness tracker. Water-resistant and long battery life.',
    rating: 4.3,
    reviewsCount: 180,
    stock: 22,
    aiHint: 'smartwatch fitness',
    isActive: true,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Vintage Leather Satchel',
    slug: 'vintage-leather-satchel',
    category: 'Fashion',
    subcategory: 'Bags',
    brand: 'Heritage Bags',
    price: 120.00,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'A timeless leather satchel, perfect for work or casual outings. Handcrafted with high-quality materials.',
    rating: 4.7,
    reviewsCount: 65,
    stock: 8,
    aiHint: 'leather bag',
    isActive: true,
    isFeatured: false,
  },
  {
    id: '7',
    name: 'Smart Home Hub Controller',
    slug: 'smart-home-hub-controller',
    category: 'Electronics',
    brand: 'ConnectHome',
    price: 129.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png?view=app', 'https://placehold.co/600x600.png?view=setup'],
    description: 'Control all your smart home devices from one central hub. Supports voice commands and various protocols.',
    rating: 4.6,
    reviewsCount: 95,
    stock: 30,
    details: { Compatibility: 'Alexa, Google Assistant, Zigbee, Z-Wave', Power: 'AC Adapter' },
    aiHint: 'smart home',
    isActive: true,
    isFeatured: false,
  },
  {
    id: '8',
    name: 'Stylish Winter Coat',
    slug: 'stylish-winter-coat',
    category: 'Fashion',
    subcategory: 'Coats',
    brand: 'ArcticWarmth',
    price: 189.75,
    originalPrice: 250.00,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Stay warm and fashionable with this elegant winter coat. Features a faux fur collar and insulated lining.',
    rating: 4.4,
    reviewsCount: 55,
    stock: 12,
    details: { Material: 'Wool blend, Faux fur', Sizes: 'S, M, L, XL' },
    aiHint: 'winter coat',
    isActive: false,
    isFeatured: false,
  },
  {
    id: 'shoe-1',
    name: 'Men\'s Classic Leather Sneakers',
    slug: 'mens-classic-leather-sneakers',
    category: 'Sneakers', // Belongs to 'Sneakers' which is child of 'Footwear'
    brand: 'UrbanStride',
    price: 89.99,
    originalPrice: 110.00,
    imageUrl: 'https://placehold.co/600x600.png?color=white',
    images: [
      'https://placehold.co/600x600.png?color=black',
      'https://placehold.co/600x600.png?color=navy',
      'https://placehold.co/600x600.png?color=white&angle=side'
    ],
    description: 'Timeless leather sneakers for a sharp, casual look. Cushioned insole for all-day comfort.',
    rating: 4.6,
    reviewsCount: 150,
    stock: 40,
    details: { Material: 'Genuine Leather Upper, Rubber Sole', Color: 'White, Black, Navy' },
    aiHint: 'mens leather sneakers',
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'shoe-2',
    name: 'Women\'s High-Performance Running Shoes',
    slug: 'womens-high-performance-running-shoes',
    category: 'Running Shoes',
    brand: 'SwiftRun',
    price: 129.50,
    imageUrl: 'https://placehold.co/600x600.png?color=pink',
    images: [
      'https://placehold.co/600x600.png?color=teal',
      'https://placehold.co/600x600.png?color=grey',
      'https://placehold.co/600x600.png?color=pink&angle=sole'
    ],
    description: 'Engineered for speed and comfort, these running shoes feature responsive cushioning and a breathable mesh upper.',
    rating: 4.8,
    reviewsCount: 210,
    stock: 25,
    details: { Type: 'Neutral Cushioned', Drop: '8mm', Weight: '220g' },
    aiHint: 'womens running shoes',
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'shoe-3',
    name: 'Men\'s Oxford Formal Shoes',
    slug: 'mens-oxford-formal-shoes',
    category: 'Formal Shoes',
    brand: 'GentlemenStyle',
    price: 149.00,
    imageUrl: 'https://placehold.co/600x600.png?color=brown',
    images: [
      'https://placehold.co/600x600.png?color=black',
      'https://placehold.co/600x600.png?color=brown&angle=detail'
    ],
    description: 'Elegant and sophisticated Oxford shoes, perfect for business meetings or formal events. Crafted from polished leather.',
    rating: 4.7,
    reviewsCount: 85,
    stock: 18,
    details: { Material: 'Polished Calfskin Leather', Sole: 'Leather with rubber heel', Construction: 'Goodyear Welt' },
    aiHint: 'mens formal oxfords',
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'shoe-4',
    name: 'Women\'s Ankle Boots - Suede',
    slug: 'womens-ankle-boots-suede',
    category: 'Footwear', // Could also be a "Boots" category if added
    brand: 'AutumnVogue',
    price: 99.99,
    originalPrice: 130.00,
    imageUrl: 'https://placehold.co/600x600.png?color=tan',
    images: [
        'https://placehold.co/600x600.png?color=black',
        'https://placehold.co/600x600.png?color=grey'
    ],
    description: 'Chic suede ankle boots with a comfortable block heel. Versatile for day to night wear.',
    rating: 4.5,
    reviewsCount: 110,
    stock: 30,
    details: { Material: 'Suede Upper, Synthetic Lining', HeelHeight: '2.5 inches' },
    aiHint: 'womens suede boots',
    isActive: true,
    isFeatured: false,
  }
];

export const mockReviews: Review[] = [
  {
    reviewId: 'rev1',
    productId: '1',
    userId: 'user123',
    userName: 'Sophie R.',
    rating: 5,
    title: 'Amazing Sound Quality!',
    comment: 'These headphones are incredible. The noise cancellation is top-notch and they are so comfortable to wear for hours.',
    createdAt: '2024-07-20T10:30:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev2',
    productId: '1',
    userId: 'user456',
    userName: 'John B.',
    rating: 4,
    title: 'Very good, but a bit pricey',
    comment: 'Solid headphones, great features. Just wish they were a little cheaper. But overall, satisfied with the purchase.',
    createdAt: '2024-07-22T14:00:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev3',
    productId: '3',
    userId: 'user789',
    userName: 'Maria L.',
    rating: 5,
    title: 'So soft and comfy!',
    comment: 'Love this t-shirt! The organic cotton feels great on the skin. Will buy more in different colors.',
    createdAt: '2024-07-18T09:15:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev4',
    productId: '2',
    userId: 'user101',
    userName: 'David K.',
    rating: 4,
    title: 'Stylish and well-made',
    comment: 'The armchair looks fantastic in my living room. Assembly was straightforward. It is a bit firm, but hopefully, it softens up.',
    createdAt: '2024-07-25T11:00:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev5',
    productId: '1',
    userId: 'user112',
    userName: 'Emily P.',
    rating: 3,
    title: 'Decent for the price.',
    comment: 'Noise cancellation works okay, but I expected more for this price range. Battery life is good though.',
    createdAt: '2024-08-01T16:45:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev-shoe-1',
    productId: 'shoe-1',
    userId: 'userShoeLover',
    userName: 'Alex M.',
    rating: 5,
    title: 'Best classic sneakers!',
    comment: 'These leather sneakers are super comfortable and look great with everything. Highly recommend!',
    createdAt: '2024-08-02T10:00:00Z',
    isApproved: true,
  },
  {
    reviewId: 'rev-shoe-2',
    productId: 'shoe-2',
    userId: 'userRunner',
    userName: 'Jessica B.',
    rating: 4,
    title: 'Great for my daily runs',
    comment: 'Very supportive and lightweight. My feet feel great even after a long run. The color is vibrant too!',
    createdAt: '2024-08-03T11:30:00Z',
    isApproved: true,
  }
];


export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'top-5-home-decor-trends-2024',
    title: 'Top 5 Home Decor Trends for 2024',
    excerpt: 'Discover the latest trends in home decoration to refresh your living space this year...',
    imageUrl: 'https://placehold.co/800x400.png',
    category: 'Home Decor',
    author: 'Alice Wonderland',
    date: '2024-07-15',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><h2>Trend 1: Sustainable Materials</h2><p>...</p><h2>Trend 2: Biophilic Design</h2><p>...</p>',
    tags: ['trends', 'interior design', 'sustainability'],
    aiHint: 'home decor'
  },
  {
    id: '2',
    slug: 'ultimate-guide-to-choosing-headphones',
    title: 'The Ultimate Guide to Choosing Headphones',
    excerpt: 'Finding the perfect pair of headphones can be tricky. This guide breaks down everything you need to know...',
    imageUrl: 'https://placehold.co/800x400.png',
    category: 'Electronics',
    author: 'Bob The Builder',
    date: '2024-07-10',
    content: '<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h3>Types of Headphones</h3><p>...</p><h3>Key Features to Consider</h3><p>...</p>',
    tags: ['audio', 'gadgets', 'buying guide'],
    aiHint: 'headphones tech'
  },
  {
    id: '3',
    slug: 'sustainable-fashion-tips',
    title: 'Easy Tips for a More Sustainable Wardrobe',
    excerpt: 'Learn how to make your fashion choices more eco-friendly with these simple tips...',
    imageUrl: 'https://placehold.co/800x400.png',
    category: 'Fashion',
    author: 'Carol Danvers',
    date: '2024-07-05',
    content: '<p>...</p>',
    tags: ['eco-fashion', 'sustainability', 'style'],
    aiHint: 'fashion clothes'
  },
];

export const mockFaqs: FaqItem[] = [
  {
    question: 'What are your shipping options?',
    answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Shipping costs vary based on location and order size.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive an email with a tracking number and a link to the carrier\'s website.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase for most items in new, unused condition with original packaging. Some exclusions apply. Please see our full return policy for details.'
  },
  {
    question: 'How do I change or cancel my order?',
    answer: 'Please contact our customer support team as soon as possible if you need to change or cancel your order. We can make changes if the order has not yet been processed for shipping.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.'
  }
];

export const shippingPolicy = `
<h2 class="text-2xl font-headline mb-4">Shipping Information</h2>
<p class="mb-2">We are committed to delivering your order accurately, in good condition, and always on time.</p>
<h3 class="text-xl font-headline mt-4 mb-2">Shipping Options & Costs:</h3>
<ul class="list-disc list-inside mb-2">
  <li><strong>Standard Shipping:</strong> Typically 5-7 business days. Cost is calculated at checkout based on weight and destination.</li>
  <li><strong>Express Shipping:</strong> Typically 2-3 business days. Cost is calculated at checkout.</li>
  <li><strong>International Shipping:</strong> Available to select countries. Shipping times and costs vary. Customs and import duties may apply and are the responsibility of the customer.</li>
</ul>
<h3 class="text-xl font-headline mt-4 mb-2">Order Tracking:</h3>
<p class="mb-2">Once your order has been shipped, you will receive an email confirmation with a tracking number. You can use this number to track your package on the carrier's website.</p>
<h3 class="text-xl font-headline mt-4 mb-2">Shipping Restrictions:</h3>
<p>We do not ship to P.O. Boxes. Some items may have shipping restrictions due to size, weight, or content.</p>
`;

export const returnPolicy = `
<h2 class="text-2xl font-headline mb-4">Return & Refund Policy</h2>
<p class="mb-2">We want you to be completely satisfied with your purchase. If you are not happy with your order, you may return most new, unopened items within 30 days of delivery for a full refund.</p>
<h3 class="text-xl font-headline mt-4 mb-2">Conditions for Return:</h3>
<ul class="list-disc list-inside mb-2">
  <li>Items must be in new, unused condition.</li>
  <li>Items must be returned with all original packaging and accessories.</li>
  <li>Proof of purchase is required.</li>
</ul>
<h3 class="text-xl font-headline mt-4 mb-2">Non-Returnable Items:</h3>
<ul class="list-disc list-inside mb-2">
  <li>Gift cards</li>
  <li>Downloadable software products</li>
  <li>Some health and personal care items</li>
  <li>Sale or clearance items may be final sale.</li>
</ul>
<h3 class="text-xl font-headline mt-4 mb-2">How to Initiate a Return:</h3>
<p class="mb-2">Please contact our Customer Support team with your order number and details about the product you would like to return. We will respond quickly with instructions on how to return items from your order.</p>
<h3 class="text-xl font-headline mt-4 mb-2">Refunds:</h3>
<p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within a certain number of days.</p>
`;
