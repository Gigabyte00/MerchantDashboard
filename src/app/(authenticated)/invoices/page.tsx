
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Receipt } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Receipt className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Invoices</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Invoices</CardTitle>
          <CardDescription>Create, send, and track customer invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section will provide tools to generate professional invoices, send them to customers via email,
            and monitor their payment status.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Invoice Management Interface"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="invoice list interface"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            You'll be able to customize invoice templates, set up payment reminders, and integrate with accounting software.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
