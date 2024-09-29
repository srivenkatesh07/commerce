import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.productId === product._id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, productId: product._id }]);
    }

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p._id === product._id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const removeFromCart = (productId) => {
    const productToRemove = cart.find(item => item.productId === productId);
    setCart(cart.filter(item => item.productId !== productId));

    if (productToRemove) {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p._id === productToRemove.productId ? { ...p, quantity: p.quantity + productToRemove.quantity } : p
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, products, setProducts, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
