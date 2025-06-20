
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  LifeBuoy,
  Bell,
  Settings,
  LogOut,
  CreditCard,
  FileCheck,
  QrCode,
  Wallet,
  Building,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/onboarding", icon: FileCheck, label: "Onboarding" },
  { href: "/customers", icon: Users, label: "Customers" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/support", icon: LifeBuoy, label: "Support Center" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

// Sub-menu for Payments & Billing
const paymentsBillingItems = [
  { label: "Recurring Billing", icon: CreditCard, disabled: true },
  { label: "Invoices", icon: Receipt, disabled: true },
  { label: "Smart Links (QR)", icon: QrCode, disabled: true },
  { label: "Virtual Terminal", icon: Wallet, disabled: true },
  { label: "Crypto Payments", icon: Bitcoin, disabled: true },
];

function Receipt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h6" />
      <path d="M12 14v2" />
    </svg>
  );
}


function Bitcoin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.767 19.089c4.917-2.504 4.917-10.69.001-13.194m-4.513 1.524a6.628 6.628 0 0 0-1.016.487" />
      <path d="M8.303 4.243a6.628 6.628 0 0 0-1.016.487" />
      <path d="M4.236 8.343a6.61 6.61 0 0 0-.487 1.025" />
      <path d="M19.765 15.657a6.61 6.61 0 0 0 .487-1.025" />
      <path d="M6.211 6.726c.306-.293.64-.562.992-.805" />
      <path d="M14.272 20.713a6.631 6.631 0 0 0 1.02-.49" />
      <path d="M18.821 16.253c.306-.292.64-.562.992-.805" />
      <path d="M11.588 2.732a6.631 6.631 0 0 0-1.02.49" />
      <path d="M9 7.125C9 5 9.5 4 12 4s3 1 3 3.125S14.5 10 12 10s-3-.875-3-2.875" />
      <path d="M12 10v4" />
      <path d="M15 12H9" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

interface AppShellInternalProps {
  children: React.ReactNode;
  pageTitle: string;
}

function AppShellInternal({ children, pageTitle }: AppShellInternalProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
      <div className="flex min-h-screen">
        <Sidebar collapsible={isMobile ? "offcanvas" : "icon"}>
          <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Building className="h-8 w-8 text-primary group-data-[state=expanded]:text-sidebar-primary" />
              <span className="font-semibold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">Merchant HQ</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
              <Separator className="my-2" />
              <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                <div className="px-4 py-2 text-xs font-medium text-sidebar-foreground/70">Payments &amp; Billing</div>
              </SidebarMenuItem>
              {paymentsBillingItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                   <SidebarMenuButton
                      disabled={item.disabled}
                      tooltip={item.label}
                      className="cursor-not-allowed opacity-60"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 flex flex-col gap-2">
            <Separator />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 text-left group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                    <p className="text-xs text-sidebar-foreground/70">admin@merchant.co</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/40x40.png" alt="@shadcn" data-ai-hint="user avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
  );
}

interface AppShellProps {
  children: React.ReactNode;
  pageTitle: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <AppShellInternal pageTitle={pageTitle}>
        {children}
      </AppShellInternal>
    </SidebarProvider>
  );
}
