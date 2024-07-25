'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import SidebarComponent from '@/app/home/page';
import { set } from 'zod';
import Swal from 'sweetalert2';

export default function Home() {
  const [custId, setCustId] = useState('');
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
  
  useEffect(() => {
    let { id } = queryString.parse(location.search);

    axios.get('https://localhost:7124/api/Customer/'+ id) 
      .then(response => {
        setCustId(response.data.custId)
        setAddress(response.data.address)
        setCity(response.data.city)
        setCustTypeCd(response.data.custTypeCd)
        setfedId(response.data.fedId)
        setpostalCode(response.data.postalCode)
        setState(response.data.state)
        
      })
      axios.get('https://localhost:7124/api/Business/'+ id) 
      .then(response => {

        setIncorpDate(response.data.incorpDate)
        setName(response.data.name)
        setStateId(response.data.stateId)
        
      })
      axios.get('https://localhost:7124/api/Individual/'+ id) 
      .then(response => {
        setBirthDay(response.data.birthDay)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
      })
      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put('https://localhost:7124/api/Customer', {
        custId,
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
        lastName
      });
      
      const result = await Swal.fire(
        'Update successful!',
        'Your data has been Updated.',
        'success'
      );
      window.location = "/customer";
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div  className='m-5'>
      <h1 className='font-bold text-xl'>Update Customer</h1>
      <form onSubmit={handleSubmit}>
       

      <div className='flex'>
      <div className='w-1/3'>
      <h1 className='font-bold text-xl mb-5'>General</h1>

      <div>
          <label htmlFor="custId">Cust Id:</label>
          <Input className='w-1/5 mb-5'  type="text"
            id="custId"
            value={custId}
            onChange={(e) => setCustId(e.target.value)}
            disabled={true}></Input>
         
        </div>

      <div>
          <label htmlFor="custTypeCd">Customer type Cd:</label>
          <br />
          <select
                  className='w-1/4 mb-5'
                  id="custTypeCd"
                  value={custTypeCd}
                  onChange={(e) => setCustTypeCd(e.target.value)}
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="B" >Business</option>
                  <option value="I">Individual</option>
                </select>
        </div>
        
       
        <div>
          <label htmlFor="address">Address:</label>
          <Input className='w-3/5 mb-5' type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength={30}></Input>
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={10}></Input>
        </div>

        <div>
          <label htmlFor="fedId">FedId:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="city"
            value={fedId}
            onChange={(e) => setfedId(e.target.value)}
            maxLength={12}
            required></Input>
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
            maxLength={10}></Input>
        </div>
        <div>
          <label htmlFor="stateId">State:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            maxLength={20}></Input>
        </div>
      </div>

        
       <div className='w-1/3'>
       <h1 className='font-bold text-xl mb-5'>Business</h1>
       <div>
          <label htmlFor="name">Business Name:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={225}
            required></Input>
        </div>

        <div>
          <label htmlFor="stateId">StateId:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="stateId"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            maxLength={10}
            required></Input>
        </div>
    
        <div>
          <label htmlFor="incorpDate">Incorp Day:</label>
          <Input className='w-2/5 mb-5' type="day"
            id="incorpDate"
            value={incorpDate}
            onChange={(e) => setIncorpDate(e.target.value)}
            ></Input>
        </div>
       </div>

        <div className='w-1/3'>
        <h1 className='font-bold text-xl mb-5'>Individual</h1>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="firstName"
            value={firstName}
            maxLength={30}
            onChange={(e) => setFirstName(e.target.value)}
            required></Input>
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <Input className='w-2/5 mb-5' type="text"
            id="lastName"
            value={lastName}
            maxLength={30}
            onChange={(e) => setLastName(e.target.value)}
            required></Input>
        </div>
        <div>
          <label htmlFor="birthDay">Birth Day:</label>
          <Input className='w-2/5 mb-5' type="day"
            id="birthDay"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            ></Input>
        </div>
        </div>
      </div>
       <Button className='bg-orange-400' type="submit">Update</Button>

      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}