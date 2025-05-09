import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation
import './HomePage.css'; // Custom styles for the component

function HomePage() {
  const [items, setItems] = useState([]);
  
  // Fetch the data when the component is mounted
  useEffect(() => {
    fetch("http://localhost:5000/api/items") // Your API endpoint
      .then(response => response.json())
      .then(data => setItems(data.items)); // Assuming your API returns { items: [...] }
  }, []);

  return (
    <div className="container">
      {/* Carousel Section */}
      <div className="row">
        <div className="col-md-8">
          <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/static/2.png" alt="asdfsd" className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src="/static/1.jpeg" alt="asdfsd" className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src="/static/Screenshot 2025-02-05 at 23.44.15.png" alt="asdfas" className="d-block w-100" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <br />

      {/* Newest Arrivals */}
      <div className="row">
        <div className="container mt-4">
          <h3>NEWEST ARRIVALS</h3>
          <div className="d-flex flex-row mb-3" id="check">
            {items.map((item) => (
              <div className="card" key={item.id} style={{ width: "200px" }}>
                <img 
                  id="image-recent"
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
      </div>

      {/* Top Products */}
      <div className="row">
        <div className="container mt-4">
          <h3>Top Products</h3>
          <div className="d-flex flex-row mb-3" id="check">
            {items.map((item) => (
              <div className="card" key={item.id} style={{ width: "200px" }}>
                <img 
                  id="image-recent"
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
      </div>

      {/* Top Deals */}
      <div className="row">
        <div className="container mt-4">
          <h3>Top Deals</h3>
          <div className="d-flex flex-row mb-3" id="check">
            {items.map((item) => (
              <div className="card" key={item.id} style={{ width: "200px" }}>
                <img 
                  id="image-recent"
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
      </div>
    </div>
  );
}

export default HomePage;
