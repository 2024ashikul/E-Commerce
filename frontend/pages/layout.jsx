import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';


function Layout() {
  useEffect(() => {
    // Remove alert after 5 seconds
    const timeout = setTimeout(() => {
      const alerts = document.querySelectorAll('#alert-container .alert');
      alerts.forEach((alert) => {
        alert.classList.remove('show');
        alert.classList.add('fade');
        setTimeout(() => {
          alert.remove();
        }, 500);
      });
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div id="navigationbar" style={{ backgroundColor: 'black' }}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="/docs/5.3/assets/brand/bootstrap-logo.svg"
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              Tech Bangladesh
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="https://www.google.com/">
                    DEMO
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products/laptop">
                    Laptops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products/tablet">
                    Tablets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products/phone">
                    Phones
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    PC
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>

              <form method="post" className="d-flex" action="/search">
                <input className="form-control me-2" list="datalist" type="text" placeholder="Search" aria-label="Search" name="keyword" />
                <datalist id="datalist">
                  <option value="San Francisco" />
                  <option value="New York" />
                  <option value="Seattle" />
                  <option value="Los Angeles" />
                  <option value="Chicago" />
                </datalist>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* Flash Message */}
      <div id="alert-container" className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
        {/* This would be dynamic; I'll explain the API below */}
        <div className="alert alert-info alert-dismissible fade show shadow" role="alert">
          Your flash message here!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>

      {/* Dynamic Page Content */}
      <div id="body-content">
        <Outlet /> {/* Renders the nested route component */}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-auto pt-4 pb-3">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-4 mb-4">
              <h5>Tech Bangladesh</h5>
              <p>Your trusted source for top-quality electronics and unbeatable tech deals.</p>
            </div>

            {/* Newsletter Form */}
            <div className="col-md-4 mb-4">
              <h5>Subscribe</h5>
              <form className="d-flex flex-column">
                <input type="email" className="form-control mb-2" placeholder="Enter your email" required />
                <button type="submit" className="btn btn-primary btn-sm">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-white text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-white text-decoration-none">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white text-decoration-none">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">© 2025 Tech Bangladesh. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
