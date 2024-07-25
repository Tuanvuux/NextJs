'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import SidebarComponent from '@/app/home/page';
import Swal from 'sweetalert2';


export default function Home() {
  const [account_Id, setaccount_Id] = useState('');
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
  
  useEffect(() => {
    let { id } = queryString.parse(location.search);

    axios.get('https://localhost:7124/api/Account/'+ id) 
      .then(response => {
        setaccount_Id(response.data.account_Id)
        setavailBalance(response.data.availBalance)
        setcloseDate(response.data.closeDate)
        setlastActivityDay(response.data.lastActivityDay)
        setopenDate(response.data.openDate)
        setpendingBalance(response.data.pendingBalance)
        setstatus(response.data.status)
        setcustId(response.data.custId)
        setopenEmpId(response.data.openEmpId)
        setopenBranchId(response.data.openBranchId)
        setproductCd(response.data.productCd)
      })
      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put('https://localhost:7124/api/Account', {
        account_Id,
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
        'Update successful!',
        'Your data has been Updated.',
        'success'
      );
      window.location = "/account";
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div  className='m-5'>
      <h1 className='font-bold text-xl'>Update Account</h1>
      <form onSubmit={handleSubmit}>
      <div>
      <div>
          <label htmlFor="account_Id">Account_Id:</label>
          <Input className='w-1/5 mb-5'  type="text"
            id="account_Id"
            value={account_Id}
            onChange={(e) => setaccount_Id(e.target.value)}
            disabled={true}></Input>
         
        </div>
          
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

       <Button className='bg-orange-400' type="submit">Update</Button>

      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}