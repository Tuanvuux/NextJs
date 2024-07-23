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


const handleDel = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đúng, xóa nó!'
    });

    if (result.isConfirmed) {
      try {
      const response = await axios.delete('https://localhost:7124/api/ProductType?id='+ id);
      Swal.fire(
        'Đã xóa!',
        'Dữ liệu của bạn đã được xóa.',
        'success'
      );
      window.location.reload();

    } catch (error) {
      Swal.fire(
        'Lỗi!',
        'Không thể xóa dữ liệu. Vui lòng thử lại sau.',
        'error'
      );
    }
  };}
  
  const handleEdit = async (id) => {
    window.location = "http://localhost:3000/department/edit?id=" + id;
   
  };

  



const ProductTypeTable = ({productTypes}) => {
    return (
        <><Table>
            <TableCaption>A list of your Department.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {productTypes.map((item) => (
                <TableRow key={item.deptId}>
                <TableCell className="font-medium">{item.deptId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell><Button onClick={() => handleEdit(item.deptId)}>Sửa</Button></TableCell>
                <TableCell className="text-right"><Button onClick={() => handleDel(item.deptId)}>Xoá</Button></TableCell>
            </TableRow>
                           
                        ))}
                
            </TableBody>
        </Table><div>
                <div><Button><Link href="/productType/add">Thêm</Link></Button> </div>
            </div></>)
      
}
export default ProductTypeTable