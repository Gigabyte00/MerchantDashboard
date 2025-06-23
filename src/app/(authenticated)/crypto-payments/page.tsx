
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bitcoin as BitcoinIcon, CircleDollarSign, Receipt, Loader2, Copy } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const EthereumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 mr-2"
  >
    <path d="M12 2.69l-6 3.39v6.5l6 3.39 6-3.39v-6.5L12 2.69z" />
    <path d="M12 22.09V12.19" />
    <path d="M12 12.19L6 8.8" />
    <path d="M18 8.8l-6 3.39" />
    <path d="M6 12.19v-3.39" />
    <path d="M18 12.19v-3.39" />
  </svg>
);

const cryptoOptions = {
  BTC: { name: 'Bitcoin', icon: <BitcoinIcon className="h-5 w-5 mr-2" />, exchangeRate: 60000 },
  ETH: { name: 'Ethereum', icon: <EthereumIcon />, exchangeRate: 3000 },
  USDC: { name: 'USDC', icon: <CircleDollarSign className="h-5 w-5 mr-2" />, exchangeRate: 1 },
};

type CryptoType = keyof typeof cryptoOptions;

interface PaymentRequest {
  qrCodeUrl: string;
  cryptoAmount: number;
  cryptoType: CryptoType;
  walletAddress: string;
  usdAmount: string;
}

const mockTransactions = [
    { id: "CRYP001", date: "2023-10-06", type: "BTC", amountCrypto: "0.00125", amountUSD: "$75.00", status: "Completed" },
    { id: "CRYP002", date: "2023-10-05", type: "ETH", amountCrypto: "0.0835", amountUSD: "$250.50", status: "Pending" },
    { id: "CRYP003", date: "2023-10-04", type: "USDC", amountCrypto: "120.00", amountUSD: "$120.00", status: "Completed" },
    { id: "CRYP004", date: "2023-10-02", type: "BTC", amountCrypto: "0.0341", amountUSD: "$2046.00", status: "Failed" },
];

export default function CryptoPaymentsPage() {
  const [amountUSD, setAmountUSD] = useState('');
  const [cryptoType, setCryptoType] = useState<CryptoType>('BTC');
  const [memo, setMemo] = useState('');
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setPaymentRequest(null);

    const usd = parseFloat(amountUSD);
    if (isNaN(usd) || usd <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount in USD.", variant: "destructive" });
      setIsGenerating(false);
      return;
    }

    const { exchangeRate } = cryptoOptions[cryptoType];
    const cryptoAmount = usd / exchangeRate;
    const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"; // Example address
    
    // Simulate network delay
    setTimeout(() => {
        setPaymentRequest({
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${walletAddress}?amount=${cryptoAmount}&label=${encodeURIComponent(memo)}`,
            cryptoAmount,
            cryptoType,
            walletAddress,
            usdAmount: amountUSD,
        });
        setIsGenerating(false);
        toast({ title: "Payment Request Generated", description: `QR code created for ${cryptoAmount.toFixed(6)} ${cryptoType}.` });
    }, 1500);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Address copied to clipboard." });
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
            <BitcoinIcon className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Crypto Payments</h2>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card>
            <form onSubmit={handleGenerateRequest}>
                <CardHeader>
                    <CardTitle>Create Payment Request</CardTitle>
                    <CardDescription>Generate a unique QR code for a customer payment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount-usd">Amount (USD)</Label>
                        <Input id="amount-usd" type="number" placeholder="e.g., 100.00" value={amountUSD} onChange={(e) => setAmountUSD(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="crypto-type">Cryptocurrency</Label>
                        <Select onValueChange={(value: CryptoType) => setCryptoType(value)} defaultValue={cryptoType}>
                            <SelectTrigger id="crypto-type">
                                <SelectValue placeholder="Select a cryptocurrency" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(cryptoOptions).map(([key, { name, icon }]) => (
                                    <SelectItem key={key} value={key}>
                                        <div className="flex items-center">{icon} {name}</div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="memo">Memo (Optional)</Label>
                        <Input id="memo" placeholder="e.g., Invoice #12345" value={memo} onChange={(e) => setMemo(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isGenerating}>
                        {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : "Generate Payment Request"}
                    </Button>
                </CardFooter>
            </form>
        </Card>

        <div className="space-y-6">
            {isGenerating && (
                <Card className="flex flex-col items-center justify-center p-8 min-h-[300px]">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Generating secure payment details...</p>
                </Card>
            )}

            {paymentRequest && (
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center">Payment Request Ready</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-white rounded-lg border">
                           <Image
                                src={paymentRequest.qrCodeUrl}
                                alt="Payment QR Code"
                                width={200}
                                height={200}
                                data-ai-hint="qr code"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="text-2xl font-bold">{paymentRequest.cryptoAmount.toFixed(6)} {paymentRequest.cryptoType}</p>
                            <p className="text-muted-foreground">(${paymentRequest.usdAmount} USD)</p>
                        </div>
                         <div className="text-center w-full">
                            <p className="text-sm text-muted-foreground">Send to Address</p>
                            <div className="flex items-center justify-center gap-2 mt-1 font-mono text-sm p-2 bg-muted rounded-md w-full break-all">
                                <span>{paymentRequest.walletAddress}</span>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(paymentRequest.walletAddress)}>
                                    <Copy className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5"/> Recent Crypto Transactions</CardTitle>
          <CardDescription>A log of your most recent cryptocurrency payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount (Crypto)</TableHead>
                <TableHead>Amount (USD)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {cryptoOptions[tx.type as CryptoType].icon} {tx.type}
                    </div>
                  </TableCell>
                  <TableCell>{tx.amountCrypto}</TableCell>
                  <TableCell>{tx.amountUSD}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tx.status === "Completed" ? "default" : tx.status === "Pending" ? "secondary" : "destructive"}
                      className={
                        tx.status === "Completed" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" :
                        tx.status === "Pending" ? "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30" :
                        "bg-red-500/20 text-red-700 hover:bg-red-500/30"
                      }
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
  );
}
