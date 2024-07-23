import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } 
from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const handleDel = async (id) => {
    const result = await Swal.fire({
      title: 'Delete?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    });

    if (result.isConfirmed) {
      try {
      const response = await axios.delete('https://localhost:7124/api/Department?id='+ id);
      Swal.fire(
        'Deleted!',
        'Your data has been deleted.',
        'success'
      );
      window.location.reload();

    } catch (error) {
      Swal.fire(
        'Error!',
        'Data cannot be deleted. Please try again later.',
        'error'
      );
    }
  };}
  
  const handleEdit = async (id) => {
    window.location = "http://localhost:3000/department/edit?id=" + id;
   
  };
  const handleAdd = async () => {
    window.location = "http://localhost:3000/department/add";
   
  };

  



const DepartmentTable = ({departments}) => {


  const [message, setMessage] = useState('');
  

    return (
        <>
        <h1 className='text-center text-lg opacity-80 mt-8 '>A list of your Department.</h1>
        <Table className='text-base'>
         
            <TableCaption className='text-lg'></TableCaption>
            <TableHeader className='font-bold'>
                <TableRow>
                    <TableHead className="w-[100px] font-bold">ID</TableHead>
                    <TableHead className='font-bold'>Name</TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-right font-bold"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {departments.map((item) => (
                <TableRow key={item.deptId}>
                <TableCell className="font-medium">{item.deptId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className='text-right w-3'><Button className='bg-orange-400 ' onClick={() => handleEdit(item.deptId)}>Edit</Button></TableCell>
                <TableCell className='text-right w-3'><Button className='bg-red-700' onClick={() => handleDel(item.deptId)}>Delete</Button></TableCell>
            </TableRow>                           
                        ))}            
            </TableBody>
        </Table><div>
        <Button className='bg-green-500 float-right mt-8 mr-3' onClick={() => handleAdd()}>Create</Button>          
            </div></>)
      
}
export default DepartmentTable