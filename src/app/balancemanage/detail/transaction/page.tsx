'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SidebarComponent from '@/app/home/page';

export default function TransactionDetail() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const customerId = params.get('customerId');
  const accountId = params.get('accountId');

  useEffect(() => {
    if (customerId && accountId) {
      fetchTransactions(customerId, accountId);
    }
  }, [customerId, accountId]);

  const fetchTransactions = async (customerId, accountId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7124/api/Customer/transaction/${customerId}`);
      const customerData = response.data.find(cust => cust.customerId === Number(customerId));
      if (customerData) {
        const account = customerData.accounts.find(acc => acc.account.account_Id === Number(accountId));
        if (account) {
          setTransactions(account.accountTransaction);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch transactions:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex'>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
        <h1 className='text-center text-lg opacity-80 mt-8'>Transaction Details</h1>
        <Table className='text-base'>
          <TableCaption className='text-lg'></TableCaption>
          <TableHeader className='font-bold'>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Employee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.accTransaction.txn_Id}>
                  <TableCell>{transaction.accTransaction.txn_Id}</TableCell>
                  <TableCell>{transaction.accTransaction.amount}</TableCell>
                  <TableCell>{new Date(transaction.accTransaction.txnDate).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.branchName}</TableCell>
                  <TableCell>{transaction.employeeName}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">No transactions available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
