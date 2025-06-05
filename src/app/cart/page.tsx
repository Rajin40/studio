
import Container from '@/components/Container';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
  // Mock cart items - replace with actual cart data logic
  const cartItems: any[] = []; // Start with an empty cart for now
  // const cartItems = [
  //   { id: '1', name: 'Wireless Noise-Cancelling Headphones', price: 199.99, quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'headphones audio' },
  //   { id: '3', name: 'Organic Cotton T-Shirt', price: 29.99, quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'tshirt clothing' },
  // ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const taxEstimate = subtotal * 0.08; // Example 8% tax
  const total = subtotal + shippingEstimate + taxEstimate;

  return (
    <Container className="py-8 md:py-12">
      <div className="text-center mb-10">
        <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-6">Your cart is currently empty.</p>
          <Button asChild size="lg">
            <Link href="/search">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
                <img src={item.imageUrl} alt={item.name} data-ai-hint={item.aiHint} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">Remove</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-card rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-headline font-semibold mb-6 border-b pb-3">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping estimate</span>
                  <span>${shippingEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax estimate</span>
                  <span>${taxEstimate.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                  <span>Order total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full mt-8">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
