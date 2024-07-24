
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarComponent from '@/app/home/page';

export default function Home() {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [custTypeCd, setCustTypeCd] = useState('');
  const [fedId, setfedId] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [state, setState] = useState('');
  const [incorpDate, setIncorpDate] = useState('');
  const [name, setName] = useState('');
  const [stateId, setStateId] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7124/api/Customer', {
        address,
        city,
        custTypeCd,
        fedId,
        postalCode,
        state,
        incorpDate,
        name,
        stateId,
        birthDay,
        firstName,
        lastName,



      });
      setMessage('Đăng ký thành công!');
      window.location = "/customer"
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div className='m-5'>
      <h1 className='font-bold text-xl mb-5'>Add Customer</h1>
      <form onSubmit={handleSubmit}>


      <div>
          <label htmlFor="custTypeCd">Customer type Cd:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="custTypeCd"
            value={custTypeCd}
            onChange={(e) => setCustTypeCd(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required></Input>
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="name">Business Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required></Input>
        </div>

        <div>
          <label htmlFor="fedId">FedId:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="city"
            value={fedId}
            onChange={(e) => setfedId(e.target.value)}
            required></Input>
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
            required></Input>
        </div>

        
  
        <div>
          <label htmlFor="state">StateId:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="state"
            value={state}
            onChange={(e) => setStateId(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="stateId">State:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="stateId"
            value={stateId}
            onChange={(e) => setState(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="incorpDate">Incorp Day:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="incorpDate"
            value={incorpDate}
            onChange={(e) => setIncorpDate(e.target.value)}
            required></Input>
        </div>

        <div>
          <label htmlFor="birthDay">Birth Day:</label>
          <Input className='w-1/5 mb-5' type="day"
            id="birthDay"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
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