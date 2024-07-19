
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } 
from "@/components/ui/table"




const CustomerTable = ({customers}) => {
    return (
        <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {customers.map(customer => (
                   
          <TableRow key={customer.custId}>
            <TableCell className="font-medium">{customer.custId}</TableCell>
            <TableCell>{customer.city}</TableCell>
            <TableCell>{customer.state}</TableCell>
            <TableCell className="text-right">{customer.State}</TableCell>
            
          </TableRow>
            ))}
        </TableBody>
      </Table>)
      
}
export default CustomerTable