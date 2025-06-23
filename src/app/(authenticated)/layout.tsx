"use client";
import { AppShell } from "@/components/layout/app-shell";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AuthGuard } from "@/hooks/use-auth";

// Helper function to generate a title from the pathname
const generateTitleFromPath = (pathname: string): string => {
  if (pathname === "/dashboard") return "Dashboard";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Merchant Dashboard";
  const title = segments[segments.length -1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return title;
};

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = generateTitleFromPath(pathname || '/dashboard');
  return (
    <AuthGuard>
      <AppShell pageTitle={pageTitle}>{children}</AppShell>
    </AuthGuard>
  );
}
