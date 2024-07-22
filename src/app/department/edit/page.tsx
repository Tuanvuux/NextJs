'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

export default function Home() {
  //const router = useRouter();

  const [name, setName] = useState('');
  const [deptId, setDeptId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    let { id } = queryString.parse(location.search);

    axios.get('https://localhost:7124/api/Department/'+ id) // Thay đổi URL này thành API của bạn
      .then(response => {
        setDeptId(response.data.deptId);
        setName(response.data.name);
      })
      
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put('https://localhost:7124/api/Department', {
        deptId,
        name,

        
       
      });
      setMessage('Đăng ký thành công!');
      window.location = "/department";
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSubmit}>

      <div>
          <label htmlFor="name">deptId:</label>
          <Input  type="text"
            id="deptId"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
            disabled={true}></Input>
         
        </div>
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