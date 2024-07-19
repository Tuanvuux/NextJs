
'use client';


import React, { useEffect, useState } from 'react';
import CustomerTable from "./customerTable";


const getCustomer = async () => {
  const response = await fetch(`https://localhost:7124/api/Customer`,{
    method: "GET"
});
  const data = await response.json();

  return data;
};


const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomer().then(data => setCustomers(data));
  }, []);

  return (
    
      <CustomerTable  customers={customers}/>

  );
};

export default CustomerPage;

