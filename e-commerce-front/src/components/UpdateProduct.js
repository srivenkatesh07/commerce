import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProduct.css'; // Import CSS for styling

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

    // Validate non-negative values
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
      await axios.put(`/api/products/all/${productId}`, product);
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
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(product)
          .filter(([key]) => !['_id', '__v'].includes(key)) // Filter out _id and __v
          .map(([key, value]) => (
            <div className="form-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
              {key === 'description' ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={key.includes('Price') || key === 'quantity' ? 'number' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  min={key.includes('Price') || key === 'quantity' ? '0' : undefined}
                />
              )}
            </div>
          ))}

        <button type="submit" disabled={updating}>
          {updating ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
