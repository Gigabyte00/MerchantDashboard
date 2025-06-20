
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const authorizationReports = [
  { id: "AUTH001", date: "2023-10-01", amount: "$150.00", cardType: "Visa **** 1234", status: "Approved", processor: "Stripe" },
  { id: "AUTH002", date: "2023-10-01", amount: "$75.50", cardType: "Mastercard **** 5678", status: "Declined", processor: "First Data" },
  { id: "AUTH003", date: "2023-09-30", amount: "$200.00", cardType: "Amex **** 9012", status: "Approved", processor: "TSYS" },
  { id: "AUTH004", date: "2023-09-30", amount: "$30.25", cardType: "Visa **** 3456", status: "Approved", processor: "Square" },
];

const settlementReports = [
  { batchId: "SETT001", date: "2023-10-02", totalAmount: "$5,230.50", transactions: 52, status: "Processed", processor: "Stripe" },
  { batchId: "SETT002", date: "2023-10-02", totalAmount: "$2,100.75", transactions: 25, status: "Pending", processor: "First Data" },
  { batchId: "SETT003", date: "2023-10-01", totalAmount: "$8,050.00", transactions: 80, status: "Processed", processor: "TSYS" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Transaction Reports</h2>
          <p className="text-muted-foreground">View and download authorization and settlement reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter Reports
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download All (PDF)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="authorizations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
          <TabsTrigger value="authorizations">Authorizations</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
        </TabsList>
        <TabsContent value="authorizations">
          <Card>
            <CardHeader>
              <CardTitle>Authorization Reports</CardTitle>
              <CardDescription>Detailed log of all card authorization attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auth ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Card Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authorizationReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.amount}</TableCell>
                      <TableCell>{report.cardType}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Approved" ? "default" : "destructive"}
                         className={report.status === "Approved" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : "bg-red-500/20 text-red-700 hover:bg-red-500/30"}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.processor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settlements">
          <Card>
            <CardHeader>
              <CardTitle>Settlement Reports</CardTitle>
              <CardDescription>Overview of settled transaction batches.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settlementReports.map((report) => (
                    <TableRow key={report.batchId}>
                      <TableCell className="font-medium">{report.batchId}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.totalAmount}</TableCell>
                      <TableCell>{report.transactions}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Processed" ? "default" : "secondary"}
                         className={report.status === "Processed" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30"}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.processor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
