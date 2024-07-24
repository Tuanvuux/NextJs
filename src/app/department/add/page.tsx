
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SidebarComponent from '@/app/home/page';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://localhost:7124/api/Department', {
        name,

      });
      setMessage('Đăng ký thành công!');
      window.location = "/department"
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div className='m-5'>
      <h1 className='font-bold text-xl mb-5'>Add Department</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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