import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './ProductCreate.css'; // Import CSS for styling

const ProductCreate = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: '',
    description: '',
    image: '',
    originalPrice: '',
    discountPrice: '',
    sellingPrice: '',
    quantity: '',
    uom: '',
    hsnCode: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', product);
      console.log('Product created:', response.data);
      setSuccess('Product added successfully!');
      setError('');
      setTimeout(() => {
        navigate('/productList');
      }, 1500);
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="product-create-container">
      <h2>Add Product</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Original Price:</label>
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Discount Price:</label>
          <input
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>UOM (Unit of Measurement):</label>
          <input
            type="text"
            name="uom"
            value={product.uom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>HSN Code:</label>
          <input
            type="text"
            name="hsnCode"
            value={product.hsnCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
