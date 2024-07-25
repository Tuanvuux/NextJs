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
      const result = await Swal.fire(
        'Update successful!',
        'Your data has been Updated.',
        'success'
      );
      window.location = "/department";
    } catch (error) {
      setMessage('Đăng ký thất bại: ' + error.response?.data?.message || error.message);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
      <div  className='m-5'>
      <h1 className='font-bold text-xl'>Update Department</h1>
      <form onSubmit={handleSubmit}>

      <div>
          <label htmlFor="name">DeptId:</label>
          <Input className='w-1/5 mb-5'  type="text"
            id="deptId"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
            disabled={true}></Input>
         
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <Input className='w-1/5 mb-5' type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required></Input>
          
        </div>
       <Button className='bg-orange-400' type="submit">Update</Button>

      </form>
      {message && <p>{message}</p>}
    </div>
      </div>
    </div>
    
  );
}