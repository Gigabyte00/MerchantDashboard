"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, Target, ShieldCheck, AlertTriangle as AlertTriangleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface AnalysisResult {
  customerSegments: string;
  recommendations: string;
}

export function AiInsightsForm() {
  const [customerData, setCustomerData] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!customerData.trim()) {
      setError("Customer data cannot be empty.");
      toast({
        title: "Input Error",
        description: "Customer data field is required.",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis based on input data
      const lines = customerData.split('\n').filter(line => line.trim());
      const customerCount = lines.length - 1; // Subtract header
      
      const mockResult: AnalysisResult = {
        customerSegments: `Based on analysis of ${customerCount} customers:

1. **High-Value Customers** (Spend > $1000): 30% of customers
   - Primarily from North America and Europe
   - Frequent contact patterns (monthly interactions)

2. **Mid-Value Customers** (Spend $500-$1000): 45% of customers
   - Diverse regional distribution
   - Moderate contact frequency (quarterly interactions)

3. **Emerging Markets** (Spend < $500): 25% of customers
   - Strong presence in Asia and emerging regions
   - Growing engagement patterns`,
        
        recommendations: `Strategic Recommendations:

1. **Personalized Marketing**: Segment campaigns by spend level and region
2. **Customer Retention**: Focus on high-value customers with premium support
3. **Growth Strategy**: Invest in emerging markets with targeted outreach
4. **Communication**: Adjust contact frequency based on customer segment
5. **Product Development**: Develop region-specific features and pricing tiers`
      };
      
      setResult(mockResult);
      toast({
        title: "Analysis Complete",
        description: "Customer insights generated successfully.",
      });
    } catch (e) {
      const error = e as { message?: string };
      console.error("Analysis Error:", error);
      setError(error.message || "An unexpected error occurred during analysis.");
      toast({
        title: "Analysis Failed",
        description: error.message || "Could not generate customer insights.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const sampleData = `Region,Spend,LastContactDate,CustomerID
North America,$1500,2023-05-15,CUST001
Europe,$800,2023-08-20,CUST002
Asia,$2200,2023-03-10,CUST003
North America,$500,2023-09-01,CUST004
Europe,$1800,2023-07-25,CUST005`;

  const handleUseSampleData = () => {
    setCustomerData(sampleData);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Customer Insights (Demo Mode)
        </CardTitle>
        <CardDescription>
          Enter customer data (e.g., CSV or JSON format including region, spend habits, contact dates) to get AI-powered segmentation and recommendations.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerData">Customer Data</Label>
            <Textarea
              id="customerData"
              value={customerData}
              onChange={(e) => setCustomerData(e.target.value)}
              placeholder="Paste customer data here (e.g., CSV format)..."
              rows={8}
              className="focus:ring-primary focus:border-primary"
              aria-describedby="customerDataHelp"
            />
            <p id="customerDataHelp" className="text-xs text-muted-foreground">
              Include fields like region, spend amount, and last contact date for best results.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" onClick={handleUseSampleData}>
              Use Sample Data
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate Insights"
            )}
          </Button>
        </CardFooter>
      </form>

      {error && (
         <div className="p-6 pt-0">
            <Alert variant="destructive">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
      )}

      {result && (
        <div className="p-6 pt-0 space-y-6">
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Target className="h-5 w-5 text-accent" />Customer Segments</h3>
            <div className="p-4 bg-secondary/50 rounded-md prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap break-words text-sm">{result.customerSegments}</pre>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-accent" />Recommendations</h3>
             <div className="p-4 bg-secondary/50 rounded-md prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap break-words text-sm">{result.recommendations}</pre>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
