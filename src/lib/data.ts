
export interface Product {
  id: string;
  name: string;
  category: string;
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
}

export interface Category {
  id: string;
  name: string;
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

export const mockCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', imageUrl: 'https://placehold.co/400x300.png', aiHint: 'tech gadgets' },
  { id: 'fashion', name: 'Fashion', imageUrl: 'https://placehold.co/400x300.png', aiHint: 'stylish clothing' },
  { id: 'home-decor', name: 'Home Decor', imageUrl: 'https://placehold.co/400x300.png', aiHint: 'modern interior' },
  { id: 'books', name: 'Books', imageUrl: 'https://placehold.co/400x300.png', aiHint: 'library books' },
  { id: 'tech-courses', name: 'Technical Courses', imageUrl: 'https://placehold.co/400x300.png', aiHint: 'online learning' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    description: 'Experience immersive sound with these comfortable, long-lasting wireless headphones. Features active noise cancellation and a sleek design.',
    rating: 4.5,
    reviewsCount: 120,
    stock: 15,
    details: { Material: 'Premium plastic and faux leather', Battery: 'Up to 30 hours', Connectivity: 'Bluetooth 5.0' },
    aiHint: 'headphones audio'
  },
  {
    id: '2',
    name: 'Modern Linen Armchair',
    category: 'Home Decor',
    price: 349.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    description: 'Add a touch of elegance to your living space with this stylish and comfortable linen armchair. Perfect for reading or relaxing.',
    rating: 4.8,
    reviewsCount: 75,
    stock: 5,
    details: { Material: 'Linen fabric, Oak wood frame', Dimensions: '30" W x 32" D x 34" H' },
    aiHint: 'armchair furniture'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    category: 'Fashion',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    description: 'A classic, comfortable t-shirt made from 100% organic cotton. Available in various colors.',
    rating: 4.2,
    reviewsCount: 250,
    details: { Material: '100% Organic Cotton', Care: 'Machine washable' },
    aiHint: 'tshirt clothing'
  },
  {
    id: '4',
    name: 'The Art of Innovation (Book)',
    category: 'Books',
    price: 19.95,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Explore the principles of innovation and creativity in this insightful book by a leading industry expert.',
    rating: 4.9,
    reviewsCount: 90,
    stock: 50,
    details: { Author: 'Jane Doe', Pages: '280', Format: 'Hardcover' },
    aiHint: 'book reading'
  },
   {
    id: '5',
    name: 'Smart Fitness Tracker',
    category: 'Electronics',
    price: 79.50,
    originalPrice: 99.99,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Track your daily activity, heart rate, and sleep patterns with this sleek smart fitness tracker. Water-resistant and long battery life.',
    rating: 4.3,
    reviewsCount: 180,
    stock: 22,
    aiHint: 'smartwatch fitness'
  },
  {
    id: '6',
    name: 'Vintage Leather Satchel',
    category: 'Fashion',
    price: 120.00,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'A timeless leather satchel, perfect for work or casual outings. Handcrafted with high-quality materials.',
    rating: 4.7,
    reviewsCount: 65,
    aiHint: 'leather bag'
  },
  {
    id: '7',
    name: 'Smart Home Hub Controller',
    category: 'Electronics',
    price: 129.99,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    description: 'Control all your smart home devices from one central hub. Supports voice commands and various protocols.',
    rating: 4.6,
    reviewsCount: 95,
    stock: 30,
    details: { Compatibility: 'Alexa, Google Assistant, Zigbee, Z-Wave', Power: 'AC Adapter' },
    aiHint: 'smart home'
  },
  {
    id: '8',
    name: 'Stylish Winter Coat',
    category: 'Fashion',
    price: 189.75,
    originalPrice: 250.00,
    imageUrl: 'https://placehold.co/600x600.png',
    description: 'Stay warm and fashionable with this elegant winter coat. Features a faux fur collar and insulated lining.',
    rating: 4.4,
    reviewsCount: 55,
    stock: 12,
    details: { Material: 'Wool blend, Faux fur', Sizes: 'S, M, L, XL' },
    aiHint: 'winter coat'
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

