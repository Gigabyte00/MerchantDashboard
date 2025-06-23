"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Repeat, DollarSign, Users, PlusCircle, MoreHorizontal, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockSubscriptions = [
  { id: "SUB001", customer: "Alice Wonderland", email: "alice@example.com", status: "Active", plan: "Pro Plan", amount: "$99.00/mo", nextBilling: "2023-11-01" },
  { id: "SUB002", customer: "Bob The Builder", email: "bob@example.com", status: "Active", plan: "Basic Plan", amount: "$29.00/mo", nextBilling: "2023-11-15" },
  { id: "SUB003", customer: "Charlie Brown", email: "charlie@example.com", status: "Canceled", plan: "Pro Plan", amount: "$99.00/mo", nextBilling: "N/A" },
  { id: "SUB004", customer: "Diana Prince", email: "diana@example.com", status: "Past Due", plan: "Basic Plan", amount: "$29.00/mo", nextBilling: "2023-10-20" },
  { id: "SUB005", customer: "Edward Scissorhands", email: "edward@example.com", status: "Active", plan: "Enterprise Plan", amount: "$499.00/yr", nextBilling: "2024-09-01" },
];

export default function RecurringBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Repeat className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Recurring Billing</h2>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.1%</div>
            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
            <TabsTrigger value="all">All Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>A list of all customers with active recurring payments.</CardDescription>
            </CardHeader>
            <CardContent>
                <SubscriptionTable subscriptions={mockSubscriptions.filter(s => s.status === 'Active' || s.status === 'Past Due')} />
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="canceled">
          <Card>
            <CardHeader>
              <CardTitle>Canceled Subscriptions</CardTitle>
              <CardDescription>A list of all customers with canceled subscriptions.</CardDescription>
            </CardHeader>
            <CardContent>
                <SubscriptionTable subscriptions={mockSubscriptions.filter(s => s.status === 'Canceled')} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Subscriptions</CardTitle>
              <CardDescription>A complete history of all subscriptions.</CardDescription>
            </CardHeader>
            <CardContent>
                <SubscriptionTable subscriptions={mockSubscriptions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubscriptionTable({ subscriptions }: { subscriptions: typeof mockSubscriptions }) {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Billing Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="font-medium">{sub.customer}</div>
                    <div className="text-xs text-muted-foreground">{sub.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                        sub.status === "Active" ? "default" :
                        sub.status === "Canceled" ? "secondary" : "destructive"
                    }
                    className={
                        sub.status === "Active" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" :
                        sub.status === "Past Due" ? "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30" :
                        ""
                    }
                    >
                        {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>{sub.amount}</TableCell>
                  <TableCell>{sub.nextBilling}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Customer</DropdownMenuItem>
                            <DropdownMenuItem>View Subscription</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 hover:!text-red-500">Cancel Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
    );
}