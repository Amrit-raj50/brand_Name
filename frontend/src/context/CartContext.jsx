import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1, size = '', color = '') => {
    setCartItems((prevItems) => {
      // Create a unique key for the item based on ID, size, and color
      const uniqueId = `${product._id}-${size}-${color}`;
      const itemExists = prevItems.find((item) => item.uniqueId === uniqueId);

      if (itemExists) {
        return prevItems.map((item) =>
          item.uniqueId === uniqueId ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            uniqueId,
            product: product._id, // Keep the original ID reference
            qty,
            size,
            color,
            image: product.images?.[0] || '/placeholder.jpg'
          },
        ];
      }
    });
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartSubtotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
