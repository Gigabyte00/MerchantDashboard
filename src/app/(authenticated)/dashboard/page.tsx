
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, CreditCard, AlertTriangle, TrendingUp, ArrowRight, ListChecks, Receipt as ReceiptIcon, Link2 as Link2Icon } from "lucide-react";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Link from "next/link";

const initialChartData = [
  { month: "January", revenue: 0 },
  { month: "February", revenue: 0 },
  { month: "March", revenue: 0 },
  { month: "April", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "June", revenue: 0 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const transactions = [
  { id: "TXN72845", type: "Card", amount: "$75.00", status: "Success", date: "2023-10-01", provider: "Stripe" },
  { id: "TXN10386", type: "Crypto (USDC)", amount: "$250.50", status: "Pending", date: "2023-10-01", provider: "CryptoPay" },
  { id: "TXN09383", type: "Card", amount: "$120.00", status: "Success", date: "2023-09-30", provider: "First Data" },
  { id: "TXN58392", type: "Card", amount: "$45.99", status: "Failed", date: "2023-09-30", provider: "Square" },
  { id: "TXN29348", type: "Crypto (ETH)", amount: "$1023.10", status: "Success", date: "2023-09-29", provider: "CryptoPay" },
];

export default function DashboardPage() {
  const [chartData, setChartData] = useState(initialChartData);
  const [hasAlerts, setHasAlerts] = useState(true); 
  const [onboardingProgress, setOnboardingProgress] = useState(75); 

  useEffect(() => {
    setChartData([
      { month: "January", revenue: Math.floor(Math.random() * 5000) + 1000 },
      { month: "February", revenue: Math.floor(Math.random() * 5000) + 1000 },
      { month: "March", revenue: Math.floor(Math.random() * 5000) + 1000 },
      { month: "April", revenue: Math.floor(Math.random() * 5000) + 1000 },
      { month: "May", revenue: Math.floor(Math.random() * 5000) + 1000 },
      { month: "June", revenue: Math.floor(Math.random() * 5000) + 1000 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Easily access common payment tasks.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/virtual-terminal">
              <CreditCard className="mr-2 h-5 w-5" /> Process Payment
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/invoices">
              <ReceiptIcon className="mr-2 h-5 w-5" /> Send Invoice
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/smart-links-qr">
              <Link2Icon className="mr-2 h-5 w-5" /> Create Payment Link
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,753</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" /> Revenue Insights
            </CardTitle>
            <CardDescription>Monthly revenue overview for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-6 w-6" /> Onboarding Status
            </CardTitle>
            <CardDescription>Track your business onboarding progress.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div>
              <div className="mb-1 flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium text-primary">{onboardingProgress}%</span>
              </div>
              <Progress value={onboardingProgress} aria-label={`Onboarding progress ${onboardingProgress}%`} />
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Business Information</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Bank & KYC Details</li>
              <li className="flex items-center gap-2"><span className="text-yellow-500">●</span> Provider Selection (2/3 selected)</li>
              <li className="flex items-center gap-2"><span className="text-gray-500">○</span> Final Review & Submit</li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/onboarding">
                Continue Onboarding <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" /> Alerts & Pending Actions
          </CardTitle>
          <CardDescription>Important notifications and tasks requiring your attention.</CardDescription>
        </CardHeader>
        <CardContent>
          {hasAlerts ? ( 
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-destructive/50 p-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium">Dispute Received (DS00451)</p>
                  <p className="text-sm text-muted-foreground">A new dispute for transaction TXN09383 needs your review. Please submit evidence by 2023-10-15.</p>
                  <Button variant="destructive" size="sm" className="mt-2">View Dispute</Button>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-yellow-500/50 p-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">KYC Document Expiring</p>
                  <p className="text-sm text-muted-foreground">Your business license is expiring on 2023-11-01. Please upload a new one.</p>
                   <Button variant="outline" size="sm" className="mt-2">Upload Document</Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No urgent alerts or pending actions. Great job!</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Transaction Log</CardTitle>
          <CardDescription>Overview of recent transactions across all providers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Success" ? "default" :
                        transaction.status === "Pending" ? "secondary" : "destructive"
                      }
                      className={
                        transaction.status === "Success" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" :
                        transaction.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30" :
                        "bg-red-500/20 text-red-700 hover:bg-red-500/30"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.provider}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
