import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-8 text-center">
      <Building className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-5xl font-bold text-primary mb-6 font-headline">
        Welcome to Merchant Dashboard
      </h1>
      <p className="text-xl text-foreground/80 mb-10 max-w-2xl">
        Your unified platform for managing payments, customers, and business insights. Streamline your operations and grow your business with ease.
      </p>
      <Link href="/dashboard" passHref>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105">
          Go to Dashboard
        </Button>
      </Link>
      <footer className="absolute bottom-8 text-foreground/60 text-sm">
        © {new Date().getFullYear()} Merchant Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
