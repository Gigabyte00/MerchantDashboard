"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Receipt, PlusCircle, MoreHorizontal, AlertCircle, CheckCircle, FileClock } from "lucide-react";

const mockInvoices = [
  { id: "INV001", customer: "Alice Wonderland", date: "2023-10-01", dueDate: "2023-10-15", amount: "$150.00", status: "Paid" },
  { id: "INV002", customer: "Bob The Builder", date: "2023-09-20", dueDate: "2023-10-05", amount: "$300.50", status: "Overdue" },
  { id: "INV003", customer: "Charlie Brown", date: "2023-10-05", dueDate: "2023-11-04", amount: "$750.00", status: "Sent" },
  { id: "INV004", customer: "Diana Prince", date: "2023-10-06", dueDate: "2023-10-10", amount: "$50.00", status: "Draft" },
  { id: "INV005", customer: "Edward Scissorhands", date: "2023-08-15", dueDate: "2023-08-30", amount: "$220.00", status: "Paid" },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Receipt className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Invoices</h2>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <FileClock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,050.50</div>
            <p className="text-xs text-muted-foreground">Across 2 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$300.50</div>
            <p className="text-xs text-muted-foreground">1 overdue invoice</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid (Last 30 days)</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$370.00</div>
            <p className="text-xs text-muted-foreground">From 2 invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>A list of all your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                        invoice.status === "Paid" ? "default" :
                        invoice.status === "Overdue" ? "destructive" :
                        invoice.status === "Sent" ? "secondary" : "outline"
                    }
                    className={
                        invoice.status === "Paid" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" :
                        invoice.status === "Overdue" ? "bg-red-500/20 text-red-700 hover:bg-red-500/30" :
                        invoice.status === "Sent" ? "bg-blue-500/20 text-blue-700 hover:bg-blue-500/30" : ""
                    }
                    >
                        {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Invoice PDF</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
