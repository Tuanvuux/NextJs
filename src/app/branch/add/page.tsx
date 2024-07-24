
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarComponent from '@/app/home/page';

export default function Home() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7124/api/Branch', {
        
        address,
        city,
        name,
        state,
        zipCode,


      });
      setMessage('Đăng ký thành công!');
      window.location = "/branch"
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div className='m-5'>
      <h1 className='font-bold text-xl mb-5'>Add Branch</h1>
      <form onSubmit={handleSubmit}>
        <div>
          
        <label htmlFor="name">Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required></Input>
            
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
        
        </div>
       <Button className='bg-green-600' type="submit">Submit</Button>
    
      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}