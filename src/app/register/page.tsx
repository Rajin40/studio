
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
import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

async function registerUserAction(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  // 'use server'; // This directive would typically be in a separate file for the action,
                  // but for self-contained components, Next.js handles it if the function is async and passed to `action`.
                  // However, best practice for complex actions is a separate file.
                  // For this example, we'll keep it inline for simplicity of a single file change.

  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const accountType = formData.get('accountType') as string;
  const terms = formData.get('terms');

  const errors: Record<string, string> = {};

  if (!fullName) errors.fullName = "Full name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
  if (!accountType) errors.accountType = "Please select an account type.";
  if (!terms) errors.terms = "You must agree to the terms and conditions.";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  // Simulate user creation
  console.log('Attempting to register user:', { fullName, email, accountType });
  // In a real app, you would:
  // 1. Hash the password
  // 2. Save the user to your database (e.g., Firebase Auth, Firestore)
  // 3. Handle potential database errors

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For this example, we'll assume success if validation passes
  return { success: true, message: 'Account created successfully! You can now log in.' };
}


export default function RegisterPage() {
  const { toast } = useToast();
  const initialState: ActionResponse | null = null;
  const [state, formAction] = useActionState(registerUserAction, initialState);
  
  // Keep local state for controlled RadioGroup if needed, though `name` attribute is primary for form submission
  const [selectedAccountType, setSelectedAccountType] = useState<string | undefined>(undefined);


  useEffect(() => {
    if (state) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default", // Or a success variant if you have one
        });
        // Optionally, redirect or clear form here
        // e.g., router.push('/login');
      } else {
        // Only show general toast if there are no specific field errors displayed inline
        if (!state.errors || Object.keys(state.errors).length === 0) {
            toast({
              title: "Registration Failed",
              description: state.message || "An error occurred.",
              variant: "destructive",
            });
        }
        // Log specific field errors for debugging or more granular UI updates
        if (state.errors) {
          console.error("Validation errors:", state.errors);
          // You could update UI to show errors next to fields, e.g., by storing state.errors in a local state
        }
      }
    }
  }, [state, toast]);

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
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required />
              {state?.errors?.fullName && <p className="text-sm text-destructive">{state.errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
              {state?.errors?.password && <p className="text-sm text-destructive">{state.errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
              {state?.errors?.confirmPassword && <p className="text-sm text-destructive">{state.errors.confirmPassword}</p>}
            </div>
            
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup 
                name="accountType"
                value={selectedAccountType} 
                onValueChange={setSelectedAccountType}
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
              {state?.errors?.accountType && <p className="text-sm text-destructive">{state.errors.accountType}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" name="terms" required />
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
             {state?.errors?.terms && <p className="text-sm text-destructive">{state.errors.terms}</p>}
             {state?.message && state.errors && Object.keys(state.errors).length > 0 && !state.errors.fullName && !state.errors.email && !state.errors.password && !state.errors.confirmPassword && !state.errors.accountType && !state.errors.terms && (
                <p className="text-sm text-destructive text-center">{state.message}</p>
             )}


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

