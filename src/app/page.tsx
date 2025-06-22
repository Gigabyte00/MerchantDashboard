
'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building, LogIn, UserPlus, Mail, Lock } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Account Created",
          description: "Welcome! You have been successfully signed up.",
        });
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      }
      // The useEffect will handle the redirect on auth state change
    } catch (err: any) {
      console.error("Authentication failed", err);
      let message = "An unexpected error occurred.";
      switch (err.code) {
        case 'auth/email-already-in-use':
          message = "This email is already in use. Please sign in or use a different email.";
          break;
        case 'auth/invalid-email':
          message = "Please enter a valid email address.";
          break;
        case 'auth/weak-password':
          message = "The password is too weak. It must be at least 6 characters long.";
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
             message = "Invalid email or password. Please try again.";
             break;
        default:
          message = err.message || message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // While loading auth state, or if the user is logged in, show a loader.
  if (loading || user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-8 text-center">
            <Building className="w-24 h-24 text-primary mb-8 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary mb-6 font-headline">
                {loading ? "Authenticating..." : "Redirecting to dashboard..."}
            </h1>
        </div>
    );
  }

  // If not loading and no user, show the login/signup page.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="flex items-center mb-6">
        <Building className="w-16 h-16 text-primary mr-4" />
        <div>
           <h1 className="text-4xl font-bold text-primary font-headline">
            Merchant Dashboard
           </h1>
           <p className="text-foreground/80">
             Your unified platform for payments and insights.
           </p>
        </div>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an Account" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Enter your details to get started." : "Enter your credentials to access your dashboard."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : isSignUp ? (
                <><UserPlus className="mr-2 h-4 w-4" />Sign Up</>
              ) : (
                <><LogIn className="mr-2 h-4 w-4" />Sign In</>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
      
      <footer className="absolute bottom-8 text-foreground/60 text-sm">
        © {new Date().getFullYear()} Merchant Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
