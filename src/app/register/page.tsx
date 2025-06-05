
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Container from '@/components/Container';
import { BookOpen, UserPlus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from 'react';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    if (!accountType) {
      alert("Please select an account type."); // Replace with better validation/toast
      return;
    }
    console.log('Register form submitted with account type:', accountType);
  };

  return (
    <Container className="py-12 md:py-16 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-headline">Create Your Account</CardTitle>
          <CardDescription>Join Shopstream to discover amazing products or start selling.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" required />
            </div>
            
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup 
                defaultValue={accountType} 
                onValueChange={setAccountType}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-md flex-1 hover:border-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/10">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer" className="font-normal cursor-pointer flex-1">I want to buy products</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-md flex-1 hover:border-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/10">
                  <RadioGroupItem value="seller" id="seller" />
                  <Label htmlFor="seller" className="font-normal cursor-pointer flex-1">I want to sell products</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                I agree to the{' '}
                <Link href="/help#terms" className="underline hover:text-primary">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                 <Link href="/help#privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>.
              </Label>
            </div>

            <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <UserPlus className="mr-2 h-5 w-5" /> Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Container>
  );
}
