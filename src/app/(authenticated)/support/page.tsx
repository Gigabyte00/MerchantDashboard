import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, AlertOctagon, MessageSquare, Upload, Search, FilePlus2 } from "lucide-react";

const disputes = [
  { id: "DSP001", transactionId: "TXN72845", reason: "Product not received", status: "Pending Merchant Response", dateOpened: "2023-10-05", amount: "$75.00" },
  { id: "DSP002", transactionId: "TXN10386", reason: "Fraudulent transaction", status: "Under Review", dateOpened: "2023-10-02", amount: "$250.50" },
  { id: "DSP003", transactionId: "TXN09383", reason: "Duplicate charge", status: "Resolved - Refunded", dateOpened: "2023-09-28", amount: "$120.00" },
];

const tickets = [
    { id: "TKT001", subject: "Issue with API integration", status: "Open", lastUpdate: "2023-10-05", priority: "High" },
    { id: "TKT002", subject: "Question about fee structure", status: "Answered", lastUpdate: "2023-10-04", priority: "Medium" },
    { id: "TKT003", subject: "Payout delay", status: "In Progress", lastUpdate: "2023-10-05", priority: "High" },
];


export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Support Center</h2>
        <p className="text-muted-foreground">Manage refunds, disputes, and support tickets.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><RotateCcw className="h-5 w-5"/> Process Refunds & Voids</CardTitle>
          <CardDescription>Quickly issue refunds or void transactions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transactionIdRefund">Transaction ID</Label>
              <Input id="transactionIdRefund" placeholder="Enter Transaction ID (e.g., TXN12345)" />
            </div>
            <div>
              <Label htmlFor="refundAmount">Refund Amount (Optional)</Label>
              <Input id="refundAmount" type="number" placeholder="Full amount if blank" />
            </div>
          </div>
          <div>
            <Label htmlFor="refundReason">Reason for Refund/Void</Label>
            <Textarea id="refundReason" placeholder="Briefly explain the reason..." />
          </div>
          <div className="flex gap-2">
            <Button>Issue Refund</Button>
            <Button variant="outline">Void Transaction</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertOctagon className="h-5 w-5"/> Manage Disputes</CardTitle>
          <CardDescription>Track and respond to customer disputes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
             <Input placeholder="Search disputes by ID or Transaction ID..." className="max-w-sm" />
             <Button variant="outline"><Search className="mr-2 h-4 w-4" />Search</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute ID</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Opened</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-medium">{dispute.id}</TableCell>
                  <TableCell>{dispute.transactionId}</TableCell>
                  <TableCell>{dispute.reason}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={dispute.status.startsWith("Resolved") ? "default" : dispute.status === "Under Review" ? "secondary" : "outline"}
                        className={
                            dispute.status.startsWith("Resolved") ? "bg-green-500/20 text-green-700" : 
                            dispute.status === "Under Review" ? "bg-yellow-500/20 text-yellow-700" : 
                            "border-orange-500/50 text-orange-700"}
                    >
                        {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.dateOpened}</TableCell>
                  <TableCell>{dispute.amount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                    {dispute.status === "Pending Merchant Response" && (
                      <Button size="sm"><Upload className="mr-2 h-4 w-4" />Submit Evidence</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Support Tickets</CardTitle>
          <CardDescription>Create and track your support requests with our team.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Input placeholder="Search tickets..." className="max-w-xs" />
                    <Button variant="outline"><Search className="mr-2 h-4 w-4" />Search</Button>
                </div>
                <Button><FilePlus2 className="mr-2 h-4 w-4" /> Create New Ticket</Button>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={ticket.status === "Answered" ? "default" : ticket.status === "Open" ? "outline" : "secondary"}
                        className={
                            ticket.status === "Answered" ? "bg-green-500/20 text-green-700" :
                            ticket.status === "Open" ? "border-blue-500/50 text-blue-700" :
                            "bg-yellow-500/20 text-yellow-700"
                        }
                    >{ticket.status}</Badge>
                  </TableCell>
                  <TableCell>{ticket.lastUpdate}</TableCell>
                  <TableCell>
                  <Badge 
                        variant={ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "outline"}
                        className={
                            ticket.priority === "High" ? "bg-red-500/20 text-red-700" :
                            ticket.priority === "Medium" ? "bg-yellow-500/20 text-yellow-700" :
                            ""
                        }
                    >{ticket.priority}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Ticket</Button>
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
