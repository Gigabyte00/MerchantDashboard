
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Link2, QrCode as QrCodeIcon } from "lucide-react";

export default function SmartLinksQrPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="h-7 w-7 text-primary" />
        <QrCodeIcon className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Smart Payment Links & QR Codes</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate Payment Links & QR Codes</CardTitle>
          <CardDescription>Easily create shareable payment links and scannable QR codes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Generate unique links or QR codes for specific products, services, or payment amounts.
            Share them via email, social media, or print them for in-person payments.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Smart Links and QR Code Generation"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="payment link generation"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Track link usage, customize landing pages, and simplify one-time payments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
