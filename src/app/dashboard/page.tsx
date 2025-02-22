import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";

export default async function Dashboard() {
  const results = await db.select().from(Invoices);
  console.log(results);
  return (
    <main className="flex flex-col h-full justify-center text-center max-w-5l gap-6 mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
          <Button className="inline-flex gap-2" variant="ghost" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium text-left p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold p-4 block"
                >
                  {new Date(invoice.createTs).toLocaleDateString()}
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold p-4 block"
                >
                  John Doe
                </Link>
              </TableCell>
              <TableCell className="text-left p-0">
                <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                  john@gmail.com
                </Link>
              </TableCell>
              <TableCell className="text-center p-0">
                <Link className="p-4 block" href={`/invoices/${invoice.id}`}>
                  <Badge
                    className={cn(
                      "rounded-full capitalize",
                      invoice.status == "open" && "bg-blue-500",
                      invoice.status == "paid" && "bg-green-600",
                      invoice.status == "void" && "bg-zinc-700",
                      invoice.status == "uncollectible" && "bg-red-600"
                    )}
                  >
                    {invoice.status}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="text-right p-0">
                <Link
                  href={`/invoices/${invoice.id}`}
                  className="font-semibold p-4 block"
                >
                  ${(invoice.value / 100).toFixed(2)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
