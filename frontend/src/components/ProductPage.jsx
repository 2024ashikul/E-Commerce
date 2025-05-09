import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data.product)); 
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <img src={`/uploads/${product.image.split('/').pop()}`} alt={product.name} />
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductPage;
