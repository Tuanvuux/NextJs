
'use client';


import React, { useEffect, useState } from 'react';



const getProduct = async () => {
  const response = await fetch(`https://localhost:7124/api/Product`,{
    method: "GET"
});
  const data = await response.json();

  return data;
};


const ProductPage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct().then(data => setProduct(data));
  }, []);

  return <div></div>;
};

export default ProductPage;

