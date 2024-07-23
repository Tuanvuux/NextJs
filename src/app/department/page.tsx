
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentTable from './departmentTable';
import Sidebar from '../home/page';
import SidebarComponent from '../home/page';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Home() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
 
  useEffect(() => {
    axios.get('https://localhost:7124/api/Department') 
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  
  const fetchDepartments = async (name = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7124/api/Department', {
        params: { name }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDepartments(name);
  };

  if (loading) return <p>Loading...</p>;

  

  return (
    <><div className='m-5 float-right'>
      <form onSubmit={handleSearch}>
        <div>
          <Input className='w-1/5 mb-5' type="text"
          placeholder='Department Name'
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Input>

        </div>
        <Button className='bg-blue-600' type="submit">Search</Button>

      </form>
     
    </div><div style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className='flex-1 p-5 ml-64 mr-6'>
          <DepartmentTable departments={data} />
        </div>
      </div></>
  );
}	


export default Home;