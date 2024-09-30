import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const { products, setProducts, addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('api/products');
        setProducts(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [products, setProducts]);

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      addToCart(product);
    } else {
      alert('This product is out of stock.');
    }
  };

  const handleUpdateProduct = (product) => {
    navigate(`/updateProduct/${product._id}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.productName} className="product-image" />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p className="price">Original Price: <span>${product.originalPrice}</span></p>
            <p className="price">Discount Price: <span>${product.discountPrice}</span></p>
            <p className="price">Selling Price: <span>${product.sellingPrice}</span></p>
            <p>Quantity: {product.quantity} {product.uom}</p>
            <p>HSN Code: {product.hsnCode}</p>
            {user && user.role === 'admin' ? (
              <button onClick={() => handleUpdateProduct(product)} className="update-button">Update Product</button>
            ) : (
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
