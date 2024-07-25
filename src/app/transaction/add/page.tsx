
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarComponent from '@/app/home/page';
import Swal from 'sweetalert2';

export default function Home() {
  const [amount, setamount] = useState('');
  const [fund_Avail_Date, setfund_Avail_Date] = useState('');
  const [txnDate, settxnDate] = useState('');
  const [txnTypeCd, settxnTypeCd] = useState('');
  const [accountId, setaccountId] = useState('');
  const [excutionBranchId, setexcutionBranchId] = useState('');
  const [tellerEmpId, settellerEmpId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7124/api/AccTransaction', {
        
        amount,
        fund_Avail_Date,
        txnDate,
        txnTypeCd,
        accountId,
        excutionBranchId,
        tellerEmpId


      });
      const result = await Swal.fire(
        'Add successfully!',
        'Your data has been Added.',
        'success'
      );
      window.location = "/transaction"
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div className='m-5'>
      <h1 className='font-bold text-xl mb-5'>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          
        <label htmlFor="name">Amount:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="name"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            required
            maxLength={19}></Input>
            
          <label htmlFor="fund_Avail_Date">Fund_Avail_Date:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="fund_Avail_Date"
            value={fund_Avail_Date}
            onChange={(e) => setfund_Avail_Date(e.target.value)}
            required></Input>
          <label htmlFor="txnDate">TxnDate:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="txnDate"
            value={txnDate}
            onChange={(e) => settxnDate(e.target.value)}
            required></Input>
           
          
          <label htmlFor="state">TxnTypeCd:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="state"
            value={txnTypeCd}
            onChange={(e) => settxnTypeCd(e.target.value)}
            maxLength={10}></Input>
          
          <label htmlFor="zipCode">AccountId:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="accountId"
            value={accountId}
            onChange={(e) => setaccountId(e.target.value)}
            ></Input>

<label htmlFor="zipCode">Branch ID:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="excutionBranchId"
            value={excutionBranchId}
            onChange={(e) => setexcutionBranchId(e.target.value)}
            ></Input>

<label htmlFor="zipCode">TellerEmpId:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="tellerEmpId"
            value={tellerEmpId}
            onChange={(e) => settellerEmpId(e.target.value)}
            ></Input>
        
        </div>
       <Button className='bg-green-600' type="submit">Submit</Button>
    
      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}