


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
    fetchBranch();
  }, []);

  const fetchBranch = async (name = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7124/api/AccTransaction', {
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
    fetchBranch(name);
  };

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
        await axios.delete('https://localhost:7124/api/AccTransaction?id=' + id);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        );
        fetchBranch(name); // Fetch departments with the current search term
      } catch (error) {
        Swal.fire(
          'Error!',
          'Data cannot be deleted. Please try again later.',
          'error'
        );
      }
    }
  };

  const handleEdit = async (id: any) => {
    window.location = "http://localhost:3000/transaction/edit?id=" + id;
  };

  const handleAdd = async () => {
    window.location = "http://localhost:3000/transaction/add";
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
        {/* <Input
          className='w-4/7 mb-5 float-left mr-2'
          type="text"
          placeholder='Customer ID'
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className='bg-blue-600 float-left' type="submit">Search</Button> */}
        <Button className='bg-green-500 float-left ml-2' onClick={handleAdd}>Create</Button>
      </form>
      <br />
      <h1 className='text-center text-lg opacity-80 mt-8'>A list of your Transaction.</h1>
      <Table className='text-base'>
        <TableCaption className='text-lg'></TableCaption>
        <TableHeader className='font-bold'>
          <TableRow>
            <TableHead className="w-[100px] font-bold">ID</TableHead>
            <TableHead className='font-bold'>Amount</TableHead>
            <TableHead>Fund_Avail_Date</TableHead>
            <TableHead>TxnDate</TableHead>
            <TableHead>txnTypeCd</TableHead>
            <TableHead>Account Id</TableHead>
            <TableHead>TellerEmpId</TableHead>
            <TableHead className="text-right font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedData.length > 0 ? (
            selectedData.map((item) => (
              <TableRow key={item.txn_Id}>
                <TableCell className="font-medium">{item.txn_Id}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.fund_Avail_Date}</TableCell>
                <TableCell>{item.txnDate}</TableCell>
                <TableCell>{item.accountId}</TableCell>
                <TableCell>{item.excutionBranchId}</TableCell>
                <TableCell>{item.tellerEmpId}</TableCell>
                <TableCell className='text-right w-3'>
                  <Button className='bg-orange-400' onClick={() => handleEdit(item.txn_Id)}>Edit</Button>
                </TableCell>
                <TableCell className='text-right w-3'>
                  <Button className='bg-red-700' onClick={() => handleDel(item.txn_Id)}>Delete</Button>
                </TableCell>
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
        <span className='ml-96 mr-96'>Page {currentPage} of {totalPages}</span>
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
