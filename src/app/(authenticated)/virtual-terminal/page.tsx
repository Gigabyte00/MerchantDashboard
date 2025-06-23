"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Terminal, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const recentTransactions = [
    { id: "VT001", amount: "$50.00", status: "Success", date: "2023-10-06 10:30 AM" },
    { id: "VT002", amount: "$125.00", status: "Success", date: "2023-10-06 09:15 AM" },
    { id: "VT003", amount: "$25.00", status: "Declined", date: "2023-10-05 04:00 PM" },
];

export default function VirtualTerminalPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Virtual Terminal</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Manual Card Entry</CardTitle>
                        <CardDescription>Securely enter card details to process a payment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (USD)</Label>
                            <Input id="amount" type="number" placeholder="0.00" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <div className="relative">
                                <Input id="card-number" placeholder="•••• •••• •••• ••••" className="pr-10" />
                                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <h3 className="text-base font-medium">Billing Information</h3>
                         <div className="space-y-2">
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="zip">ZIP/Postal Code</Label>
                                <Input id="zip" placeholder="12345" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="street">Street Address</Label>
                                <Input id="street" placeholder="123 Main St" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full">Process Payment</Button>
                    </CardFooter>
                </Card>
            </div>
            
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Keyed Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTransactions.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell>
                                            <div className="font-medium">{tx.amount}</div>
                                            <div className="text-xs text-muted-foreground">{tx.date}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={tx.status === "Success" ? "default" : "destructive"}
                                                className={tx.status === "Success" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : "bg-red-500/20 text-red-700 hover:bg-red-500/30"}
                                            >
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
