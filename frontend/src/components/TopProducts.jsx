import React, { useEffect, useState } from 'react';
import Card from './Card';
function TopProducts() {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/topproduct')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("fetching products failed",err));
  }, []);

  if (products.length === 0) {
    return <p>Loading products...</p>;  

  }
  return (
    <div className="flex flew-row overflow-x-scroll overflow-hidden">
      {products.map(item => (
        <div className="mx-4 "  key={item.id}>
          <Card item={item} />
        </div>
      ))} 
    </div>
  );
}

export default TopProducts;
