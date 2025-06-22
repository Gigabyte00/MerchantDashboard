'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building, LogIn } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      // The useEffect will handle the redirect on state change
    } catch (error) {
      console.error("Login failed", error);
      let message = "Could not sign you in with Google. Please try again.";
      if (error instanceof Error && 'code' in error) {
        if((error as any).code === 'auth/popup-closed-by-user') {
            message = "Sign-in process was cancelled.";
        }
      }
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    }
  };
  
  // While loading, or if the user is logged in, show a loading/redirecting screen.
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

  // If not loading and no user, show the login page.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-8 text-center">
      <Building className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-5xl font-bold text-primary mb-6 font-headline">
        Welcome to Merchant Dashboard
      </h1>
      <p className="text-xl text-foreground/80 mb-10 max-w-2xl">
        Your unified platform for managing payments, customers, and business insights. Streamline your operations and grow your business with ease.
      </p>
      
      <Button onClick={handleLogin} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105">
        <LogIn className="mr-2 h-5 w-5" /> Sign In with Google
      </Button>

      <footer className="absolute bottom-8 text-foreground/60 text-sm">
        © {new Date().getFullYear()} Merchant Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
