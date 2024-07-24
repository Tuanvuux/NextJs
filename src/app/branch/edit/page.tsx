'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import SidebarComponent from '@/app/home/page';


export default function Home() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [branchId, setBranchId] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    let { id } = queryString.parse(location.search);

    axios.get('https://localhost:7124/api/Branch/'+ id) 
      .then(response => {
        setBranchId(response.data.branchId);
        setAddress(response.data.address)
        setName(response.data.name);
        setState(response.data.state)
        setZipcode(response.data.zipCode)
      })
      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put('https://localhost:7124/api/Branch', {
        branchId,
        address,
        name,
        state,
        zipCode,
       
      });
      setMessage('Đăng ký thành công!');
      window.location = "/branch";
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div  className='m-5'>
      <h1 className='font-bold text-xl'>Update Branch</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">BranchId:</label>
          <Input className='w-1/5 mb-5'  type="text"
            id="branchId"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            disabled={true}></Input>
        </div>

      <label htmlFor="address">Address:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required></Input>
          <label htmlFor="city">City:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required></Input>
            <label htmlFor="name">Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required></Input>
          
          <label htmlFor="state">State:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="state"
            value={name}
            onChange={(e) => setState(e.target.value)}
            required></Input>
          
          <label htmlFor="zipCode">Zip Code:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            required></Input>

       <Button className='bg-orange-400' type="submit">Update</Button>

      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}