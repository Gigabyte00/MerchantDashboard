"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  QrCode as QrCodeIcon, // Aliased to avoid conflict if QrCode is used as component name
  Wallet,
  Building,
  Receipt as ReceiptIcon, // Added Receipt icon from lucide
  Bitcoin as BitcoinIcon, // Added Bitcoin icon from lucide
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
import React from "react";
import { SheetTitle } from "@/components/ui/sheet"; 
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/onboarding", icon: FileCheck, label: "Onboarding" },
  { href: "/customers", icon: Users, label: "Customers" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/support", icon: LifeBuoy, label: "Support Center" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

// Custom SVG components for Receipt and Bitcoin, if Lucide versions are not preferred or different
// For this iteration, we are using Lucide icons: ReceiptIcon and BitcoinIcon

const paymentsBillingItems = [
  { href: "/recurring-billing", label: "Recurring Billing", icon: CreditCard },
  { href: "/invoices", label: "Invoices", icon: ReceiptIcon },
  { href: "/smart-links-qr", label: "Smart Links (QR)", icon: QrCodeIcon },
  { href: "/virtual-terminal", label: "Virtual Terminal", icon: Wallet },
 { href: "/crypto", label: "Crypto Payments", icon: BitcoinIcon },
];

interface AppShellInternalProps {
  children: React.ReactNode;
  pageTitle: string;
}

function AppShellInternal({ children, pageTitle }: AppShellInternalProps) {
  const pathname = usePathname();
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
      <div className="flex min-h-screen">
        <Sidebar 
          collapsible={isMobile ? "offcanvas" : "icon"}
          open={openMobile}
          onOpenChange={setOpenMobile}
        >
          {isMobile && <SheetTitle className="sr-only">Navigation Menu</SheetTitle>}
          <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <Building className="h-8 w-8 text-sidebar-primary" />
              <span className="font-semibold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">Merchant HQ</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={
                        pathname === item.href ||
                        (item.href !== "/dashboard" && typeof pathname === "string" && pathname.startsWith(item.href))
                      }
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
              <Separator className="my-2 bg-sidebar-border" />
              <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                <div className="px-4 py-2 text-xs font-medium text-sidebar-foreground/70">Payments & Billing</div>
              </SidebarMenuItem>
              {paymentsBillingItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                   <Link href={item.href}>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 flex flex-col gap-2">
            <Separator className="bg-sidebar-border"/>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || `https://placehold.co/40x40.png`} alt={user?.displayName || "User Avatar"} data-ai-hint="user avatar"/>
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 text-left group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium">{user?.displayName || "Admin User"}</p>
                    <p className="text-xs text-sidebar-foreground/70">{user?.email || "admin@merchant.co"}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
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
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </Link>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || `https://placehold.co/40x40.png`} alt={user?.displayName || "@shadcn"} data-ai-hint="user avatar" />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.displayName || "My Account"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/support">Support</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
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
