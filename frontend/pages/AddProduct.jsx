import React, { useState } from 'react';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    releasedate: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    availability: ''
  });

  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    files.forEach((file) => {
      formDataObj.append('images', file);
    });
    console.log(formDataObj);

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Product created with ID: ${result.productId}`);
        setFormData({
          name: '',
          brand: '',
          releasedate: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          availability: ''
        });
        setFiles([]);
      } else {
        const error = await response.json();
        alert(`Error: ${error.err || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Text Inputs */}
        {[
          { label: 'Product Name', name: 'name' },
          { label: 'Brand', name: 'brand' },
          { label: 'Release Date', name: 'releasedate' },
          { label: 'Description', name: 'description' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Stock', name: 'stock', type: 'number' },
          { label: 'Category', name: 'category' },
          { label: 'Availability', name: 'availability' }
        ].map(({ label, name, type = 'text' }) => (
          <div className="mb-3 row" key={name}>
            <label htmlFor={name} className="col-sm-2 col-form-label">
              {label}
            </label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        ))}

        {/* File Upload */}
        <div className="mb-3 row">
          <label htmlFor="images" className="col-sm-2 col-form-label">
            Images
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              name="images"
              onChange={handleFileChange}
              multiple
              required
            />
            <div className="mt-2">
              {files.map((file, index) => (
                <span key={index} className="badge bg-info text-dark me-2">
                  {file.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mb-4">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
