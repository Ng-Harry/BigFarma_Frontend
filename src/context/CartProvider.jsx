import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem("BIGFARMA_CART");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("BIGFARMA_CART", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, cartQuantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};