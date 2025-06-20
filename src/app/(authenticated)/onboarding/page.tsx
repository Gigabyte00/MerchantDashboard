
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Landmark, Briefcase, ShieldCheck, ListChecks, UploadCloud, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  { id: "business-info", name: "Business Info", icon: Building2, completed: true },
  { id: "bank-kyc", name: "Bank &amp; KYC", icon: Landmark, completed: true },
  { id: "providers", name: "Provider Selection", icon: Briefcase, completed: false },
  { id: "review", name: "Review &amp; Submit", icon: ShieldCheck, completed: false },
];

export default function OnboardingPage() {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id);
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
  const progressValue = ((steps.filter(s => s.completed).length) / steps.length) * 100;

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepId(steps[currentStepIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(steps[currentStepIndex - 1].id);
    }
  };


  return (
    <div className="space-y-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            Business Onboarding Wizard
          </CardTitle>
          <CardDescription>Complete the steps below to activate your merchant account.</CardDescription>
          <div className="pt-2">
            <Progress value={progressValue} aria-label={`Onboarding progress ${Math.round(progressValue)}%`} className="w-full" />
            <p className="text-sm text-muted-foreground mt-1">{steps[currentStepIndex].name} - Step {currentStepIndex + 1} of {steps.length}</p>
          </div>
        </CardHeader>
        
        <Tabs value={currentStepId} onValueChange={setCurrentStepId} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 px-6">
            {steps.map(step => (
              <TabsTrigger key={step.id} value={step.id} className="flex-col h-auto py-2 data-[state=active]:shadow-md data-[state=active]:bg-primary/10">
                <step.icon className={`h-5 w-5 mb-1 ${step.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                <span className="text-xs">{step.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <CardContent>
            <TabsContent value="business-info" className="space-y-4">
              <h3 className="text-lg font-medium">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Legal Business Name</Label>
                  <Input id="businessName" placeholder="Your Company LLC" />
                </div>
                <div>
                  <Label htmlFor="dbaName">Doing Business As (DBA, Optional)</Label>
                  <Input id="dbaName" placeholder="Your Brand Name" />
                </div>
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select>
                  <SelectTrigger id="businessType"><SelectValue placeholder="Select business type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="taxId">Tax ID (EIN/SSN)</Label>
                <Input id="taxId" placeholder="XX-XXXXXXX" />
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" placeholder="123 Main St, City, State, ZIP" />
              </div>
            </TabsContent>

            <TabsContent value="bank-kyc" className="space-y-4">
              <h3 className="text-lg font-medium">Bank Account &amp; KYC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" placeholder="Global Bank Inc." />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="************1234" />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input id="routingNumber" placeholder="000000000" />
                </div>
              </div>
              <Separator />
              <h4 className="text-md font-medium">KYC Documents</h4>
              <p className="text-sm text-muted-foreground">Upload required identification documents.</p>
              <div className="space-y-3">
                <FileUploadItem label="Business License" />
                <FileUploadItem label="Owner's ID (Driver's License/Passport)" />
              </div>
            </TabsContent>

            <TabsContent value="providers" className="space-y-4">
              <h3 className="text-lg font-medium">Payment Provider Selection</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred merchant processors. You can select multiple.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['First Data', 'Fortis', 'Stripe', 'TSYS', 'PaySafe', 'Square', 'NMI Gateway', 'Crypto Payments'].map(provider => (
                  <Card key={provider} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                    <Label htmlFor={`provider-${provider.toLowerCase().replace(' ', '-')}`} className="font-medium flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" /> {provider}
                    </Label>
                    <Checkbox id={`provider-${provider.toLowerCase().replace(' ', '-')}`} />
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <h3 className="text-lg font-medium">Review &amp; Submit</h3>
              <p className="text-sm text-muted-foreground">Please review all your information before submitting.</p>
              <Card className="bg-muted/30">
                <CardHeader><CardTitle className="text-base">Summary (Placeholder)</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your business details, bank information, KYC documents, and selected providers will be listed here for final review.</p>
                   <img src="https://placehold.co/600x300.png" alt="Placeholder summary" data-ai-hint="document summary" className="w-full rounded-md mt-4 object-cover" />
                </CardContent>
              </Card>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the <Button variant="link" className="p-0 h-auto">terms and conditions</Button>.
                </Label>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={goToPrevStep} disabled={currentStepIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStepIndex < steps.length - 1 ? (
              <Button onClick={goToNextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <ShieldCheck className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            )}
          </CardFooter>
      </Card>
    </div>
  );
}


function FileUploadItem({ label }: { label: string }) {
  return (
    <div className="p-3 border rounded-md flex items-center justify-between bg-background hover:bg-muted/50 transition-colors">
      <Label htmlFor={`file-${label.toLowerCase().replace(/\W/g, '-')}`} className="text-sm font-medium">{label}</Label>
      <Button variant="outline" size="sm" asChild>
        <Label htmlFor={`file-${label.toLowerCase().replace(/\W/g, '-')}`} className="cursor-pointer">
          <UploadCloud className="mr-2 h-4 w-4" /> Upload
          <Input id={`file-${label.toLowerCase().replace(/\W/g, '-')}`} type="file" className="sr-only" />
        </Label>
      </Button>
    </div>
  );
}

// Helper component
function Separator() {
    return <hr className="my-4 border-border" />;
}
