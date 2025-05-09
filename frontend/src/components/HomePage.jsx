import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items") 
      .then(response => response.json())
      .then(data => setItems(data.items)); 
  }, []);

  return (
    <div>
      <h3>NEWEST ARRIVALS</h3>
      <div className="d-flex flex-row mb-3">
        {items.map((item) => (
          <div className="card" key={item.id} style={{ width: '200px' }}>
            <img 
              src={`/uploads/${item.image.split('/').pop()}`} 
              alt={item.name} 
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <Link to={`/product/${item.id}`} className="btn btn-primary">
                {item.price}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
