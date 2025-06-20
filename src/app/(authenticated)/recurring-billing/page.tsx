
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Repeat } from "lucide-react";

export default function RecurringBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Repeat className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Recurring Billing</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Subscriptions</CardTitle>
          <CardDescription>Set up and manage recurring payment plans for your customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section will allow you to create, view, and manage all your recurring billing schedules,
            customer subscriptions, and automated payment collections.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Recurring Billing Interface"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="subscription management interface"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Features like dunning management, subscription analytics, and plan customization will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
