import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { productId } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product details.');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    if (
      product.originalPrice < 0 ||
      product.discountPrice < 0 ||
      product.sellingPrice < 0 ||
      product.quantity < 0
    ) {
      setError('Price and quantity must be non-negative.');
      setUpdating(false);
      return;
    }

    try {
      const response = await axios.put(`/api/products/all/${productId}`, product);
      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
      navigate('/products');
      window.location.reload();
    } catch (error) {
      setError('Error updating product. Please try again.');
      console.error('Error updating product:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Original Price:</label>
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Discount Price:</label>
          <input
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="number"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>UOM (Unit of Measurement):</label>
          <input
            type="text"
            name="uom"
            value={product.uom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>HSN Code:</label>
          <input
            type="text"
            name="hsnCode"
            value={product.hsnCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={updating}>
          {updating ? 'Updating...' : 'Update Product'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProduct;
