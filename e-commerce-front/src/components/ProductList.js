import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useCart } from '../context/CartContext';
import './ProductList.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      />
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={`${product._id}-${index}`} className="product-card">
            <img src={product.image} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Original Price: ${product.originalPrice}</p>
            <p>Discount Price: ${product.discountPrice}</p>
            <p>Selling Price: ${product.sellingPrice}</p>
            <p>Quantity: {product.quantity} {product.uom}</p>
            <p>HSN Code: {product.hsnCode}</p>
            {user && user.role === 'admin' ? ( 
              <button onClick={() => handleUpdateProduct(product)}>Update Product</button>
            ) : (
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
