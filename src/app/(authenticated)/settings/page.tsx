
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UserCog, FileSpreadsheet, Bell, Lock, Briefcase, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account, preferences, and integrations.</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-6">
          <TabsTrigger value="account"><UserCog className="mr-2 h-4 w-4" />Account</TabsTrigger>
          <TabsTrigger value="billing"><FileSpreadsheet className="mr-2 h-4 w-4" />Billing & Fees</TabsTrigger>
          <TabsTrigger value="notifications_settings"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="integrations"><Briefcase className="mr-2 h-4 w-4" />Integrations</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your personal and business profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Admin User" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@merchant.co" />
                </div>
              </div>
              <div>
                <Label htmlFor="businessNameSettings">Business Name</Label>
                <Input id="businessNameSettings" defaultValue="Merchant HQ Inc." />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Fee Transparency</CardTitle>
              <CardDescription>View your subscription, payment methods, and fee breakdowns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Current Plan</h4>
                <p className="text-muted-foreground">Pro Plan - $99/month</p>
                <Button variant="outline" className="mt-2">Change Plan</Button>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Fee Breakdown</h4>
                <p className="text-muted-foreground">Detailed breakdown of gateway, processor, and platform fees.</p>
                <Button className="mt-2"><FileSpreadsheet className="mr-2 h-4 w-4" />Download Fee Report (PDF)</Button>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Revenue Forecasting</h4>
                <p className="text-muted-foreground">AI-powered revenue analytics and forecasting tools.</p>
                <Button variant="secondary" className="mt-2">Access Analytics Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications_settings">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>This is managed on the <Button variant="link" asChild className="p-0 h-auto"><a href="/notifications">Notifications Page</a></Button>.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Configure your email, SMS, and push notification preferences for various events like transactions, disputes, and payouts.</p>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="security">
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password, two-factor authentication, and API keys.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                    </div>
                    <Button>Change Password</Button>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Two-Factor Authentication (2FA)</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                        </div>
                        <Switch id="2fa-switch" />
                    </div>
                     <Separator />
                    <div>
                        <h4 className="font-medium mb-2">API Keys</h4>
                        <p className="text-sm text-muted-foreground mb-2">Manage API keys for integrations.</p>
                        <Button variant="outline">Manage API Keys</Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="integrations">
             <Card>
                <CardHeader>
                    <CardTitle>Integrations & Providers</CardTitle>
                    <CardDescription>Manage connections to payment processors and other services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">View and manage your connected merchant processors (First Data, Fortis, Stripe, TSYS, PaySafe, Square, etc.) and other third-party integrations like NMI gateway or crypto payment providers.</p>
                    <p className="text-muted-foreground">Webhook configuration for automation will also be available here.</p>
                    <Button variant="default">Manage Integrations</Button>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
             <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Dark Mode</h4>
                            <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                        </div>
                        <Switch id="dark-mode-switch" />
                    </div>
                     <p className="text-xs text-muted-foreground">Theme color settings are managed globally for this app version.</p>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
       <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><UserCog className="h-5 w-5"/> Admin Tools (Conceptual)</CardTitle>
          <CardDescription>These tools are typically for platform administrators.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section would provide administrators with capabilities such as:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>Approve/reject merchant onboarding applications.</li>
            <li>Override statuses for transactions, disputes, or accounts.</li>
            <li>Edit merchant details directly.</li>
            <li>Full data access and export capabilities for all merchants.</li>
            <li>Manage platform-wide settings and features.</li>
          </ul>
          <Button variant="destructive" disabled>Access Admin Panel (Disabled)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
