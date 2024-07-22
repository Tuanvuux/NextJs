'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div>
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên:</label>
          <Input type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required></Input>
        
        </div>
       <Button type="submit">Đăng Ký</Button>
    
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}