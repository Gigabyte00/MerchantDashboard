
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Bitcoin as BitcoinIcon } from "lucide-react";

export default function CryptoPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BitcoinIcon className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Crypto Payments</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Accept Cryptocurrency Payments</CardTitle>
          <CardDescription>Integrate and manage payments made with various cryptocurrencies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Enable your business to accept popular cryptocurrencies like Bitcoin, Ethereum, and others.
            This section will help you configure wallets, view crypto transactions, and manage conversions.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Cryptocurrency Payment Dashboard"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="cryptocurrency dashboard"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Track real-time exchange rates, manage payouts in fiat or crypto, and ensure secure transactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
