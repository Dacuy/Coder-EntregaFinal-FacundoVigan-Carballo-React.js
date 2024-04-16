import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const addItem = (item, quantity) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { item, quantity }]);
    }
  };

  const removeItem = (itemId, quantity) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === itemId);

    if (existingItem.quantity > quantity) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - quantity }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.item.id !== itemId));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const isInCart = (id) => {
    return cart.some((itemCart) => itemCart.item.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
