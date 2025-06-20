
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { AiInsightsForm } from "@/components/customers/ai-insights-form";

const customers = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", region: "North America", totalSpend: "$2,345.67", lastContact: "2023-09-15", tags: ["VIP", "Loyal"] },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", region: "Europe", totalSpend: "$1,050.00", lastContact: "2023-08-20", tags: ["New"] },
  { id: "CUST003", name: "Charlie Brown", email: "charlie@example.com", region: "Asia", totalSpend: "$5,800.20", lastContact: "2023-09-01", tags: ["High Value"] },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", region: "North America", totalSpend: "$750.50", lastContact: "2023-07-10", tags: [] },
  { id: "CUST005", name: "Edward Scissorhands", email: "edward@example.com", region: "Europe", totalSpend: "$300.00", lastContact: "2023-06-25", tags: ["Inactive"] },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Customer Directory</h2>
          <p className="text-muted-foreground">Manage and view your customer profiles.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>A list of all customers in your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://placehold.co/40x40/E6E6FF/800080?text=${customer.name.charAt(0)}`} alt={customer.name} data-ai-hint="avatar alphabet" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.region}</TableCell>
                  <TableCell>{customer.totalSpend}</TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                      {customer.tags.length === 0 && <span className="text-xs text-muted-foreground">-</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AiInsightsForm />

    </div>
  );
}
