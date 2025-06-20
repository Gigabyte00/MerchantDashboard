
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Terminal } from "lucide-react";

export default function VirtualTerminalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Virtual Terminal</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Process Payments Manually</CardTitle>
          <CardDescription>Securely enter card details to process payments over the phone or by mail.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The virtual terminal allows you to key in customer payment information directly into a secure web interface,
            acting like a digital credit card terminal.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x400.png"
              alt="Virtual Payment Terminal Interface"
              width={800}
              height={400}
              className="object-cover w-full"
              data-ai-hint="payment terminal interface"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Ideal for mail order/telephone order (MOTO) transactions. Supports various card types and provides real-time authorization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
