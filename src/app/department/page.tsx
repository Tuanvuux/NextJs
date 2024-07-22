
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentTable from './departmentTable';
import Sidebar from '../home/page';
import SidebarComponent from '../home/page';

function Home() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
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

  if (loading) return <p>Loading...</p>;

  

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
        <DepartmentTable departments={data} />
      </div>
    </div>
  );
}	


export default Home;