
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarComponent from '@/app/home/page';
import Swal from 'sweetalert2';

export default function Home() {

  const [message, setMessage] = useState('');

  const [availBalance, setavailBalance] = useState('');
  const [closeDate, setcloseDate] = useState('');
  const [lastActivityDay, setlastActivityDay] = useState('');

  const [openDate, setopenDate] = useState('');
  const [pendingBalance, setpendingBalance] = useState('');
  const [status, setstatus] = useState('');
  const [custId, setcustId] = useState('');
  const [openEmpId, setopenEmpId] = useState('');
  const [openBranchId, setopenBranchId] = useState('');
  const [productCd, setproductCd] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7124/api/Account', {

   availBalance,
   closeDate,
   lastActivityDay,
   openDate,
   pendingBalance,
   status,
   custId,
   openEmpId,
   openBranchId,
   productCd


      });
      const result = await Swal.fire(
        'Add successfully!',
        'Your data has been Added.',
        'success'
      );
      window.location = "/account"
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div className='m-5'>
      <h1 className='font-bold text-xl mb-5'>Add Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          
        <label htmlFor="availBalance">Balance:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="availBalance"
            value={availBalance}
            onChange={(e) => setavailBalance(e.target.value)}
            
            maxLength={19}></Input>
            
          <label htmlFor="closeDate">Close Date:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="closeDate"
            value={closeDate}
            onChange={(e) => setcloseDate(e.target.value)}
            ></Input>

          <label htmlFor="lastActivityDay">Last Activity Day:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="lastActivityDay"
            value={lastActivityDay}
            onChange={(e) => setlastActivityDay(e.target.value)}
            ></Input>

<label htmlFor="openDate">Open Day:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="openDate"
            value={openDate}
            onChange={(e) => setopenDate(e.target.value)}
            required></Input>
           
          
          <label htmlFor="pendingBalance">Pending Balance:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="pendingBalance"
            value={pendingBalance}
            onChange={(e) => setpendingBalance(e.target.value)}
            maxLength={10}></Input>
          
          <label htmlFor="status">Status:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            maxLength={10}></Input>

<label htmlFor="custId">CustId:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="custId"
            value={custId}
            onChange={(e) => setcustId(e.target.value)}
            ></Input>

<label htmlFor="openEmpId">Open Emp Id:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="openEmpId"
            value={openEmpId}
            onChange={(e) => setopenEmpId(e.target.value)}
            ></Input>

            <label htmlFor="openBranchId">	Open Branch Id:</label>
          <Input className='w-1/5 mb-5' type="number"
            id="openBranchId"
            value={openBranchId}
            onChange={(e) => setopenBranchId(e.target.value)}
            ></Input>

            <label htmlFor="productCd">Product Cd:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="productCd"
            value={productCd}
            onChange={(e) => setproductCd(e.target.value)}
            maxLength={10}></Input>
        
        </div>
       <Button className='bg-green-600' type="submit">Submit</Button>
    
      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}