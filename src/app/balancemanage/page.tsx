


'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarComponent from '../home/page';



export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async (name = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7124/api/Customer', {
        params: { name }
      });
      setData(response.data);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers(name);
  };

  const handleDel = async (id) => {
    const result = await Swal.fire({
      title: 'Delete?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirm!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete('https://localhost:7124/api/Customer?id=' + id);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        );
        fetchCustomers(name); 
      } catch (error) {
        Swal.fire(
          'Error!',
          'Data cannot be deleted. Please try again later.',
          'error'
        );
      }
    }
  };

  // const handleEdit = async (id: any) => {
  //   window.location = "http://localhost:3000/customer/edit?id=" + id;
  // };

  // const handleAdd = async () => {
  //   window.location = "http://localhost:3000/customer/add";
  // };

  const handleDetail = async (id: any) => {
    window.location = "http://localhost:3000/balancemanage/detail?id="+ id;
  };
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page changes
    setCurrentPage(newPage);
  };

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (loading) return <div>Loading...</div>;

  return (
    <><div className='m-5 float-right'>
    </div><div className='flex'>
        <SidebarComponent />
        <div className='flex-1 p-5 ml-64 mr-6'>
        <>
      <form className='float-right w-2/7' onSubmit={handleSearch}>
        <Input
          className='w-4/7 mb-5 float-left mr-2'
          type="text"
          placeholder='Customer Name'
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className='bg-blue-600 float-left' type="submit">Search</Button>
        {/* <Button className='bg-green-500 float-left ml-2' onClick={handleAdd}>Create</Button> */}
      </form>
      <br />
      <h1 className='text-center text-lg opacity-80 mt-8'>A list of your Customer.</h1>
      <Table className='text-base'>
        <TableCaption className='text-lg'></TableCaption>
        <TableHeader className='font-bold'>
          <TableRow>
            <TableHead className="w-[100px] font-bold">ID</TableHead>
            <TableHead className='font-bold'>Full Name</TableHead>
            <TableHead className='font-bold'>Incorn Day</TableHead>
            <TableHead className='font-bold'>City</TableHead>
            <TableHead className='font-bold'>CustomerType</TableHead>
            <TableHead className='font-bold'>Total Balance</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-right font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.length > 0 ? (
            selectedData.map((item) => (
              <TableRow key={item.custId}>
                <TableCell className="font-medium">{item.custId}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.incorpDay}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.customerType}</TableCell>
                <TableCell>{item.totalBalance}</TableCell>
                <TableCell className='text-right w-3'>
                  <Button className='bg-blue-500' onClick={() => handleDetail(item.custId)}>Detail</Button>
                </TableCell>
                {/* <TableCell className='text-right w-3'>
                  <Button className='bg-orange-400' onClick={() => handleEdit(item.custId)}>Edit</Button>
                </TableCell>
                <TableCell className='text-right w-3'>
                  <Button className='bg-red-700' onClick={() => handleDel(item.custId)}>Delete</Button>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className='fixed bottom-10 flex items-center bg-white mb-10 ml-20'>
        <Button
          className='bg-blue-500 mr-44'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || data.length === 0}
        >
          Previous
        </Button>
        <span className='ml-60 mr-60'>Page {currentPage} of {totalPages}</span>
        <Button
          className='bg-blue-500 ml-44'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || data.length === 0}
        >
          Next
        </Button>
      </div>
    </>
        </div>
      </div></>
  );
}	
