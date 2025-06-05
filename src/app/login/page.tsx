
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Container from '@/components/Container';
import { BookOpen, LogIn } from 'lucide-react';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

async function loginUserAction(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format.";
  if (!password) errors.password = "Password is required.";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please correct the errors below.", errors };
  }

  console.log('Attempting to login user:', { email });
  // In a real app, you would call Firebase Authentication (signInWithEmailAndPassword)
  // and handle success/failure from Firebase.

  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Simulate login check
  if (email === "test@example.com" && password === "password") {
    return { success: true, message: 'Login successful! Redirecting...' };
  } else if (Object.keys(errors).length === 0) { // Only show if no field errors
     return { success: false, message: 'Invalid email or password.', errors: { form: 'Invalid email or password.'} };
  }

  return { success: false, message: 'An unexpected error occurred.', errors };
}


export default function LoginPage() {
  const { toast } = useToast();
  const initialState: ActionResponse | null = null;
  const [state, formAction] = useActionState(loginUserAction, initialState);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        // Optionally, redirect: router.push('/account');
      } else {
        // Prefer field-specific errors, use general toast for form-level errors or fallback
        if (state.errors?.form) {
             toast({
                title: "Login Failed",
                description: state.errors.form,
                variant: "destructive",
            });
        } else if (!state.errors || Object.keys(state.errors).length === 0) {
            toast({
                title: "Login Failed",
                description: state.message || "An error occurred.",
                variant: "destructive",
            });
        }
      }
    }
  }, [state, toast]);

  return (
    <Container className="py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue to Shopstream.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
              {state?.errors?.password && <p className="text-sm text-destructive">{state.errors.password}</p>}
            </div>
            {state?.errors?.form && !state.errors?.email && !state.errors?.password && <p className="text-sm text-destructive text-center">{state.errors.form}</p>}
            <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <div className="w-full border-t pt-4 mt-2">
            <p className="text-center text-xs text-muted-foreground mb-3">Or sign in with</p>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>
                Google
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
}

