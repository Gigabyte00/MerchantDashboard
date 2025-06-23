"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link2, QrCode, MoreHorizontal, Copy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockLinks = [
    { id: "LNK001", type: "Link", name: "Donation Link", amount: "Open", created: "2023-10-01" },
    { id: "LNK002", type: "QR Code", name: "Event Ticket", amount: "$25.00", created: "2023-09-28" },
    { id: "LNK003", type: "Link", name: "Consulting Fee", amount: "$500.00", created: "2023-09-25" },
];

export default function SmartLinksQrPage() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Link copied to clipboard." });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="h-7 w-7 text-primary" />
        <QrCode className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Smart Payment Links & QR Codes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Create New Link/QR</CardTitle>
                    <CardDescription>Generate a new link or QR code for payments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="link-name">Name / Reference</Label>
                        <Input id="link-name" placeholder="e.g., T-Shirt Sale" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link-amount">Amount (USD)</Label>
                        <Input id="link-amount" type="number" placeholder="Leave blank for open amount" />
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="w-full"><Link2 className="mr-2 h-4 w-4"/> Generate Link</Button>
                    <Button variant="outline" className="w-full"><QrCode className="mr-2 h-4 w-4"/> Generate QR</Button>
                </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Manage Links & QR Codes</CardTitle>
                <CardDescription>A list of your active payment links and QR codes.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {mockLinks.map((link) => (
                        <TableRow key={link.id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            {link.type === 'Link' ? <Link2 className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                            {link.type}
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{link.name}</TableCell>
                        <TableCell>{link.amount}</TableCell>
                        <TableCell>{link.created}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => copyToClipboard(`https://your-domain.com/pay/${link.id}`)}>
                                        <Copy className="mr-2 h-4 w-4" /> Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" /> View QR Code
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500 hover:!text-red-500">Deactivate</DropdownMenuItem>
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
      </div>
    </div>
  );
}
